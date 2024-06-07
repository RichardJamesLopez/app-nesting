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

  getRoles: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.query.users.findFirst({
        where: and(eq(users.id, ctx.session.user.id)),
        with: {
          memberships: {
            with: {
              membershipRoles: true,
              organization: true,
            },
          },
        },
      });
      if (!user) throw new Error("User not found");
      if (!user.memberships[0]) throw new Error("Membership not found");

      const { organizationId, organization } = user.memberships.reduce(
        (last, x) => (x.lastSelectedAt > last.lastSelectedAt ? x : last),
        user.memberships[0],
      );

      const roles = user.memberships
        .find((membership) => membership.organizationId === organizationId)
        ?.membershipRoles.map(({ roleId }) => roleId);

      return {
        isAdmin: Boolean(roles?.includes("admin" as RoleIdType)),
        isOwner: ctx.session.user.id === organization.ownerId,
      };
    } catch (error) {
      console.error(error);
      return {
        isAdmin: false,
        isOwner: false,
      };
    }
  }),
});
