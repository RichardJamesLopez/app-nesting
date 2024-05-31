import { eq, and } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { type RoleIdType } from "~/lib/validationSchemas";

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
  getIsAdmin: protectedProcedure.query(async ({ ctx }) => {
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
      if (!user) throw new Error("User not found");
      if (!user.memberships[0]) throw new Error("Membership not found");

      const { organizationId } = user.memberships.reduce(
        (last, x) => (x.lastSelectedAt > last.lastSelectedAt ? x : last),
        user.memberships[0],
      );

      const isUserAdmin = user.memberships
        .find((membership) => membership.organizationId === organizationId)
        ?.membershipRoles.map(({ roleId }) => roleId)
        .includes("admin" as RoleIdType);

      return isUserAdmin;
    } catch (error) {
      console.error(error);
    }
  }),
});
