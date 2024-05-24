import { eq, and, isNull, sql } from "drizzle-orm";
import * as z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { comments, commentReactions } from "~/server/db/schema";
import { commentFormSchema } from "~/lib/validationSchemas";

export const commentRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ parentId: z.number().optional(), dealId: z.string() }))
    .query(async ({ ctx, input }) => {
      const extras = {
        // totalVote:
        //   sql`COALESCE(SUM(CASE WHEN ${commentReactions.type} THEN 1 ELSE -1 END), 0)`.as(
        //     "totalVote",
        //   ),
        // userReaction:
        //   sql`CASE WHEN ${commentReactions.userId} = ${ctx.session.user.id} THEN ${commentReactions.type} ELSE NULL END`.as(
        //     "userReaction",
        //   ),
      };

      const comments = await ctx.db.query.comments.findMany({
        where: (comments) =>
          and(
            eq(comments.dealId, input.dealId),
            input.parentId
              ? eq(comments.parentId, input.parentId)
              : isNull(comments.parentId),
          ),
        extras,
        with: {
          user: true,
          reactions: true,
          replies: {
            extras,
            with: {
              user: true,
              reactions: true,
              replies: {
                extras,
                with: {
                  user: true,
                  reactions: true,
                  replies: true,
                },
              },
            },
          },
        },
      });

      return comments;
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
