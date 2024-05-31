import { eq, and, isNull } from "drizzle-orm";
import * as z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { memberships, invites } from "~/server/db/schema";

export const membershipRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const organizationMemberships = await ctx.db.query.memberships.findMany({
        where: and(
          eq(memberships.organizationId, input),
          isNull(memberships.deletedAt),
        ),
        with: {
          user: true,
          membershipRoles: { with: { role: true } },
        },
      });

      return organizationMemberships;
    } catch (error) {
      console.error(error);
    }
  }),
  createMember: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        const invite = await ctx.db.query.invites.findFirst({
          where: eq(invites.id, input),
          with: {
            organization: true,
          },
        });
        if (!invite) throw new Error("Invite not found");

        await ctx.db.insert(memberships).values({
          inviteId: input,
          organizationId: invite.organizationId,
          userId: ctx.session.user.id,
        });

        return invite.organization.name;
      } catch (error) {
        console.error(error);
      }
    }),
});
