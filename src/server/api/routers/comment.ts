import { eq, and, isNull, sql, getTableColumns } from "drizzle-orm";
import * as z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { comments, commentReactions, users } from "~/server/db/schema";
import { commentFormSchema } from "~/lib/validationSchemas";

export const commentRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ parentId: z.number().optional(), dealId: z.string() }))
    .query(async ({ ctx, input }) => {
      const totalVotes = ctx.db
        .select({
          commentId: commentReactions.commentId,
          totalVote:
            sql`COALESCE(SUM(CASE WHEN ${commentReactions.type} THEN 1 ELSE -1 END), 0)`.as(
              "totalVote",
            ),
        })
        .from(commentReactions)
        .groupBy(commentReactions.commentId)
        .as("totalVotes");

      const userReactions = ctx.db
        .select({
          commentId: commentReactions.commentId,
          userReaction:
            sql`CASE WHEN ${commentReactions.userId} = ${ctx.session.user.id} THEN ${commentReactions.type} ELSE NULL END`.as(
              "userReaction",
            ),
        })
        .from(commentReactions)
        .where(eq(commentReactions.userId, ctx.session.user.id))
        .as("userReactions");

      const response = await ctx.db
        .select({
          ...getTableColumns(comments),
          totalVote: totalVotes.totalVote,
          userReaction: userReactions.userReaction,
          user: getTableColumns(users),
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
        .orderBy(comments.createdAt)
        .leftJoin(totalVotes, eq(comments.id, totalVotes.commentId))
        .leftJoin(userReactions, eq(comments.id, userReactions.commentId))
        .innerJoin(users, eq(comments.createdById, users.id));

      return response;
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
