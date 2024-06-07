import {
  eq,
  and,
  isNull,
  sql,
  getTableColumns,
  inArray,
  ilike,
  isNotNull,
  not,
} from "drizzle-orm";
import { unionAll } from "drizzle-orm/pg-core";
import * as z from "zod";
import { inferProcedureOutput } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  comments,
  commentReactions,
  users,
  memberships,
  notifications,
  type NotificationSourceType,
} from "~/server/db/schema";
import { db } from "~/server/db";
import { commentFormSchema } from "~/lib/validationSchemas";

export const commentRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        parentId: z.number().optional(),
        dealId: z.string(),
        organizationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const totalVotes = subqueryGetters.totalVote();
        const userReactions = subqueryGetters.userReaction(ctx.session.user.id);
        const replyCounts = subqueryGetters.replyCount();

        const isLevelOne = and(
          eq(comments.dealId, input.dealId),
          eq(comments.organizationId, input.organizationId),
          isNull(comments.deletedAt),
          input.parentId
            ? eq(comments.parentId, input.parentId)
            : isNull(comments.parentId),
        );
        const isLevelTwo = and(
          inArray(
            comments.parentId,
            ctx.db.select({ id: comments.id }).from(comments).where(isLevelOne),
          ),
          isNull(comments.deletedAt),
        );

        const selectedColumns = {
          ...getTableColumns(comments),
          user: {
            id: users.id,
            name: users.name,
            image: users.image,
          },
          totalVote: totalVotes.totalVote,
          userReaction: userReactions.userReaction,
          replyCount: replyCounts.replyCount,
        };

        const levelOneComments = ctx.db
          .select(selectedColumns)
          .from(comments)
          .where(isLevelOne);

        const levelTwoComments = ctx.db
          .select(selectedColumns)
          .from(comments)
          .where(isLevelTwo);

        [levelOneComments, levelTwoComments].forEach((levelNComments) =>
          levelNComments
            .innerJoin(users, eq(comments.createdById, users.id))
            .leftJoin(totalVotes, eq(comments.id, totalVotes.commentId))
            .leftJoin(userReactions, eq(comments.id, userReactions.commentId))
            .leftJoin(replyCounts, eq(comments.id, replyCounts.commentId)),
        );

        if (input.parentId) {
          const result = await levelOneComments;

          return result.map((comment: (typeof result)[number]) => ({
            ...comment,
            replies: [],
          }));
        }

        const result = await unionAll(levelOneComments, levelTwoComments);

        return getCommentTree(result);
      } catch (error) {
        console.error(error);
      }
    }),

  getThread: protectedProcedure
    .input(
      z.object({
        dealId: z.string(),
        organizationId: z.string(),
        threadIds: z.array(z.number()),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const totalVotes = subqueryGetters.totalVote();
        const userReactions = subqueryGetters.userReaction(ctx.session.user.id);
        const replyCounts = subqueryGetters.replyCount();

        const selectedColumns = {
          ...getTableColumns(comments),
          user: {
            id: users.id,
            name: users.name,
            image: users.image,
          },
          totalVote: totalVotes.totalVote,
          userReaction: userReactions.userReaction,
          replyCount: replyCounts.replyCount,
        };

        const threadQueries = input.threadIds.map((commentId) =>
          ctx.db
            .select(selectedColumns)
            .from(comments)
            .where(and(eq(comments.id, commentId), isNull(comments.deletedAt)))
            .innerJoin(users, eq(comments.createdById, users.id))
            .leftJoin(totalVotes, eq(comments.id, totalVotes.commentId))
            .leftJoin(userReactions, eq(comments.id, userReactions.commentId))
            .leftJoin(replyCounts, eq(comments.id, replyCounts.commentId)),
        );

        if (!threadQueries[0]) return;

        if (!threadQueries[1]) return await threadQueries[0];

        let unionedQuery = threadQueries[0].unionAll(threadQueries[1]);
        threadQueries.slice(2).forEach((query) => {
          unionedQuery = unionedQuery.unionAll(query);
        });
        const result = await unionedQuery;

        return getCommentTree(result);
      } catch (error) {
        console.error(error);
      }
    }),

  create: protectedProcedure
    .input(commentFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const [comment] = await ctx.db
          .insert(comments)
          .values({
            content: input.content,
            dealId: input.dealId,
            parentId: input.parentId,
            organizationId: input.organizationId,
            createdById: ctx.session.user.id,
          })
          .returning({ commentId: comments.id });

        if (!comment || !input.mentionedUserIds) return;

        await Promise.allSettled(
          input.mentionedUserIds.map((userId) =>
            ctx.db.insert(notifications).values({
              userId,
              commentId: comment.commentId,
              sourceType: "mention" as NotificationSourceType,
            }),
          ),
        );
      } catch (error) {
        console.error(error);
      }
    }),

  vote: protectedProcedure
    .input(
      z.object({
        commentId: z.number(),
        userId: z.string(),
        type: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (input.type === undefined)
          await ctx.db
            .delete(commentReactions)
            .where(
              and(
                eq(commentReactions.commentId, input.commentId),
                eq(commentReactions.userId, input.userId),
              ),
            );
        else
          await ctx.db
            .insert(commentReactions)
            .values({
              commentId: input.commentId,
              userId: input.userId,
              type: input.type,
            })
            .onConflictDoUpdate({
              target: [commentReactions.commentId, commentReactions.userId],
              set: { type: input.type },
            });
      } catch (error) {
        console.error(error);
      }
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(comments)
          .set({ deletedAt: sql`CURRENT_TIMESTAMP` })
          .where(eq(comments.id, input));

        await ctx.db.delete(notifications).where(eq(notifications.id, input));
      } catch (error) {
        console.error(error);
      }
    }),

  queryMentions: protectedProcedure
    .input(
      z.object({
        userNameQuery: z.string().nullish(),
        organizationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return (await ctx.db
          .select({
            id: users.id,
            value: users.name,
          })
          .from(memberships)
          .innerJoin(users, eq(memberships.userId, users.id))
          .where(
            and(
              eq(memberships.organizationId, input.organizationId),
              isNull(memberships.deletedAt),
              not(eq(users.id, ctx.session.user.id)),
              isNotNull(users.name),
              input.userNameQuery
                ? ilike(users.name, `%${input.userNameQuery}%`)
                : undefined,
            ),
          )
          .limit(5)) as { id: string; value: string }[];
      } catch (error) {
        console.error(error);
      }
    }),
});

const subqueryGetters = {
  totalVote: () =>
    db
      .select({
        commentId: commentReactions.commentId,
        totalVote:
          sql`COALESCE(SUM(CASE WHEN ${commentReactions.type} THEN 1 ELSE -1 END), 0)`.as(
            "totalVote",
          ),
      })
      .from(commentReactions)
      .groupBy(commentReactions.commentId)
      .as("totalVotes"),
  userReaction: (userId: string) =>
    db
      .select({
        commentId: commentReactions.commentId,
        userReaction:
          sql`CASE WHEN ${commentReactions.userId} = ${userId} THEN ${commentReactions.type} ELSE NULL END`.as(
            "userReaction",
          ),
      })
      .from(commentReactions)
      .where(eq(commentReactions.userId, userId))
      .as("userReactions"),
  replyCount: () =>
    db
      .select({
        commentId: comments.parentId,
        replyCount: sql`COUNT(${comments.id})`.as("replyCount"),
      })
      .from(comments)
      .where(isNull(comments.deletedAt))
      .groupBy(comments.parentId)
      .as("replyCount"),
};

function getCommentTree<T extends { id: number; parentId: number | null }>(
  result: T[],
): (T & { replies?: T[] })[] {
  const idToCommentMap = new Map<number, T & { replies?: T[] }>();
  const commentTree: (T & { replies?: T[] })[] = [];

  result.forEach((comment) => {
    idToCommentMap.set(comment.id, { ...comment, replies: [] });
  });

  result.forEach((comment) => {
    if (comment.parentId === null) {
      commentTree.push(idToCommentMap.get(comment.id)!);
    } else {
      const parent = idToCommentMap.get(comment.parentId);
      parent?.replies?.push(idToCommentMap.get(comment.id)!);
    }
  });

  return commentTree;
}

export type CommentType = NonNullable<
  inferProcedureOutput<typeof commentRouter.getAll>
>[number];
