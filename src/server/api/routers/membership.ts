import { eq, and, isNull, sql } from "drizzle-orm";
import * as z from "zod";
import { inferProcedureOutput } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { memberships, invites, membershipRoles } from "~/server/db/schema";
import { RoleIdType } from "~/lib/validationSchemas";

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

  create: protectedProcedure
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

  remove: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        organizationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .delete(membershipRoles)
          .where(
            and(
              eq(membershipRoles.userId, input.userId),
              eq(membershipRoles.organizationId, input.organizationId),
            ),
          );

        await ctx.db
          .delete(memberships)
          .where(
            and(
              eq(memberships.userId, input.userId),
              eq(memberships.organizationId, input.organizationId),
            ),
          );
      } catch (error) {
        console.error(error);
      }
    }),

  addRole: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        organizationId: z.string(),
        roleId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(membershipRoles).values({
          userId: input.userId,
          organizationId: input.organizationId,
          roleId: input.roleId as RoleIdType,
        });
      } catch (error) {
        console.error(error);
      }
    }),

  removeRole: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        organizationId: z.string(),
        roleId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .delete(membershipRoles)
          .where(
            and(
              eq(membershipRoles.userId, input.userId),
              eq(membershipRoles.organizationId, input.organizationId),
              eq(membershipRoles.roleId, input.roleId),
            ),
          );
      } catch (error) {
        console.error(error);
      }
    }),
});

export type MembershipType = NonNullable<
  inferProcedureOutput<typeof membershipRouter.getAll>
>[number];
