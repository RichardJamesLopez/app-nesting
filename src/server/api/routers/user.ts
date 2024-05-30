import { eq, and } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.query.users.findFirst({
        where: and(eq(users.id, ctx.session.user.id)),
        with: {
          memberships: {
            with: {
              membershipRoles: true,
            },
          },
        },
      });

      return user;
    } catch (error) {
      console.error(error);
    }
  }),
});
