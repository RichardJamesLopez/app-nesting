import { eq, and, desc } from "drizzle-orm";
import * as z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { comments, users, notifications } from "~/server/db/schema";

export const notificationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx, input }) => {
    try {
      return await ctx.db
        .select({
          id: notifications.id,
          commentId: notifications.commentId,
          dealId: comments.dealId,
          organizationId: comments.organizationId,
          isRead: notifications.isRead,
          createdAt: notifications.createdAt,
          mentionedBy: {
            name: users.name,
            avatar: users.image,
          },
        })
        .from(notifications)
        .innerJoin(comments, eq(comments.id, notifications.commentId))
        .innerJoin(users, eq(users.id, comments.createdById))
        .where(eq(notifications.userId, ctx.session.user.id))
        .orderBy(desc(notifications.createdAt))
        .limit(20);
    } catch (error) {
      console.error(error);
    }
  }),

  getHasUnread: protectedProcedure.query(async ({ ctx, input }) => {
    try {
      return !!(await ctx.db.query.notifications.findFirst({
        where: and(
          eq(notifications.userId, ctx.session.user.id),
          eq(notifications.isRead, false),
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  }),

  markAsRead: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedNotifications = await ctx.db
          .update(notifications)
          .set({ isRead: true })
          .where(eq(notifications.id, input))
          .returning({ commentId: notifications.commentId });

        return updatedNotifications[0]?.commentId;
      } catch (error) {
        console.error(error);
      }
    }),
});
