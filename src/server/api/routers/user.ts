import { eq, and } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.query.users.findFirst({
        where: and(eq(users.id, ctx.session.user.id)),
        with: { userRoles: true },
      });
    } catch (error) {
      console.error(error);
    }
  }),
});
