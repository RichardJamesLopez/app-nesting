import {
  eq,
  and,
  isNull,
  sql,
  desc,
  aliasedTable,
  getTableColumns,
} from "drizzle-orm";
import * as z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { comments, commentReactions, users } from "~/server/db/schema";
import { commentFormSchema } from "~/lib/validationSchemas";

export const commentRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ parentId: z.number().optional(), dealId: z.string() }))
    .query(async ({ ctx, input }) => {
      const totalVote = sql`COALESCE(SUM(CASE WHEN ${commentReactions.type} THEN 1 ELSE -1 END), 0)`;
      const userReaction = sql`CASE WHEN ${commentReactions.userId} = ${ctx.session.user.id} THEN ${commentReactions.type} ELSE NULL END`;

      const commentTotalVotes = ctx.db
        .select({
          commentId: commentReactions.commentId,
          commentTotalVote: totalVote.as("commentTotalVote"),
        })
        .from(commentReactions)
        .groupBy(commentReactions.commentId)
        .as("commentTotalVotes");

      const replyTotalVotes = ctx.db
        .select({
          commentId: commentReactions.commentId,
          replyTotalVote: totalVote.as("replyTotalVote"),
        })
        .from(commentReactions)
        .groupBy(commentReactions.commentId)
        .as("replyTotalVotes");

      const commentUserReactions = ctx.db
        .select({
          commentId: commentReactions.commentId,
          commentUserReaction: userReaction.as("commentUserReaction"),
        })
        .from(commentReactions)
        .where(eq(commentReactions.userId, ctx.session.user.id))
        .as("commentUserReactions");

      const replyUserReactions = ctx.db
        .select({
          commentId: commentReactions.commentId,
          replyUserReaction: userReaction.as("replyUserReaction"),
        })
        .from(commentReactions)
        .where(eq(commentReactions.userId, ctx.session.user.id))
        .as("replyUserReactions");

      const replies = aliasedTable(comments, "replies");
      const replyUsers = aliasedTable(users, "replyUsers");

      const result = await ctx.db
        .select({
          id: comments.id,
          content: comments.content,
          parentId: comments.parentId,
          createdAt: comments.createdAt,
          dealId: comments.dealId,
          totalVote: commentTotalVotes.commentTotalVote,
          userReaction: commentUserReactions.commentUserReaction,
          user: {
            id: users.id,
            name: users.name,
            image: users.image,
          },
          replies: sql`COALESCE(
                      json_agg(
                          CASE WHEN ${replies.id} IS NOT NULL THEN
                              json_build_object(
                                  'id', ${replies.id},
                                  'content', ${replies.content},
                                  'parentId', ${replies.parentId},
                                  'createdAt', ${replies.createdAt},
                                  'dealId', ${replies.dealId},
                                  'totalVote', ${replyTotalVotes.replyTotalVote},
                                  'userReaction', ${replyUserReactions.replyUserReaction},
                                  'user', json_build_object(
                                      'id', ${replyUsers.id},
                                      'name', ${replyUsers.name},
                                      'image', ${replyUsers.image}
                                  )
                              )
                          END
                      ) FILTER (WHERE ${replies.id} IS NOT NULL),
                      '[]'::json
                  )`,
        })
        .from(comments)
        .where(
          and(
            eq(comments.dealId, input.dealId),
            input.parentId
              ? eq(comments.parentId, input.parentId)
              : isNull(comments.parentId),
          ),
        )
        .leftJoin(replies, eq(comments.id, replies.parentId))
        .leftJoin(
          commentTotalVotes,
          eq(comments.id, commentTotalVotes.commentId),
        )
        .leftJoin(
          commentUserReactions,
          eq(comments.id, commentUserReactions.commentId),
        )
        .leftJoin(replyTotalVotes, eq(replies.id, replyTotalVotes.commentId))
        .leftJoin(
          replyUserReactions,
          eq(replies.id, replyUserReactions.commentId),
        )
        .leftJoin(users, eq(comments.createdById, users.id))
        .leftJoin(replyUsers, eq(replies.createdById, replyUsers.id))
        .groupBy(
          comments.id,
          comments.content,
          comments.parentId,
          replies.id,
          replies.content,
          replies.parentId,
          users.id,
          replyUsers.id,
          commentTotalVotes.commentTotalVote,
          commentUserReactions.commentUserReaction,
          replyTotalVotes.replyTotalVote,
          replyUserReactions.replyUserReaction,
        );

      return result as {
        id: number;
        content: string;
        parentId: number | null;
        createdAt: Date;
        dealId: string;
        totalVote: number | null;
        userReaction: boolean | null;
        user: {
          id: string;
          name?: string;
          image?: string;
        };
        replies: {
          id: number;
          content: string;
          parentId: number | null;
          createdAt: Date;
          dealId: string;
          totalVote: number | null;
          userReaction: boolean | null;
          user: {
            id: string;
            name?: string;
            image?: string;
          };
        }[];
      }[];
    }),

  create: protectedProcedure
    .input(commentFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(comments).values({
          content: input.content,
          dealId: input.dealId,
          parentId: input.parentId,
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
        if (input.type === undefined) {
          await ctx.db
            .delete(commentReactions)
            .where(
              and(
                eq(commentReactions.commentId, input.commentId),
                eq(commentReactions.userId, input.userId),
              ),
            );
          return;
        }

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
});

export type CommentRouter = typeof commentRouter;
