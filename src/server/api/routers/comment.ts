import {
  eq,
  and,
  isNull,
  sql,
  getTableColumns,
  inArray,
  like,
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
} from "~/server/db/schema";
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
      const totalVote = sql`COALESCE(SUM(CASE WHEN ${commentReactions.type} THEN 1 ELSE -1 END), 0)`;
      const userReaction = sql`CASE WHEN ${commentReactions.userId} = ${ctx.session.user.id} THEN ${commentReactions.type} ELSE NULL END`;

      const totalVotes = ctx.db
        .select({
          commentId: commentReactions.commentId,
          totalVote: totalVote.as("totalVote"),
        })
        .from(commentReactions)
        .groupBy(commentReactions.commentId)
        .as("totalVotes");

      const userReactions = ctx.db
        .select({
          commentId: commentReactions.commentId,
          userReaction: userReaction.as("userReaction"),
        })
        .from(commentReactions)
        .where(eq(commentReactions.userId, ctx.session.user.id))
        .as("userReactions");

      const replyCounts = ctx.db
        .select({
          commentId: comments.parentId,
          replyCount: sql`COUNT(${comments.id})`.as("replyCount"),
        })
        .from(comments)
        .groupBy(comments.parentId)
        .as("replyCount");

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
          .leftJoin(users, eq(comments.createdById, users.id))
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

      type Comment = (typeof result)[number] & {
        replies?: typeof result;
      };
      const idToCommentMap = new Map<number, Comment>();
      const commentTree: Comment[] = [];

      result.forEach((comment) => {
        idToCommentMap.set(comment.id, { ...comment, replies: [] });
      });

      result.forEach((comment) => {
        if (comment.parentId === null || comment.parentId === input.parentId) {
          commentTree.push(idToCommentMap.get(comment.id)!);
        } else {
          const parent = idToCommentMap.get(comment.parentId);
          parent?.replies?.push(idToCommentMap.get(comment.id)!);
        }
      });

      return commentTree;
    }),

  create: protectedProcedure
    .input(commentFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(comments).values({
          content: input.content,
          dealId: input.dealId,
          parentId: input.parentId,
          organizationId: input.organizationId,
          createdById: ctx.session.user.id,
        });
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
        const organizationMemberships = await ctx.db.query.memberships.findMany(
          {
            columns: {},
            where: and(
              eq(memberships.organizationId, input.organizationId),
              isNull(memberships.deletedAt),
              input.userNameQuery
                ? like(users.name, input.userNameQuery)
                : undefined,
            ),
            with: { user: { columns: { id: true, name: true } } },
            limit: 5,
          },
        );

        return organizationMemberships.map(({ user: { id, name } }) => ({
          id,
          value: name ?? "",
        }));
      } catch (error) {
        console.error(error);
      }
    }),
});

export type CommentType = inferProcedureOutput<
  typeof commentRouter.getAll
>[number];
