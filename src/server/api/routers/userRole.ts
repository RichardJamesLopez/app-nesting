import { eq, and, isNull } from "drizzle-orm";
import * as z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { userRoles, invites } from "~/server/db/schema";
import { RoleIdType } from "~/lib/validationSchemas";

export const userRoleRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      return await ctx.db.query.userRoles.findMany({
        where: and(
          eq(userRoles.organizationId, input),
          isNull(userRoles.deletedAt),
        ),
        with: {
          user: true,
          role: true,
        },
      });
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

        await ctx.db.insert(userRoles).values({
          inviteId: input,
          organizationId: invite.organizationId,
          userId: ctx.session.user.id,
          roleId: "member" as RoleIdType,
        });

        return invite.organization.name;
      } catch (error) {
        console.error(error);
      }
    }),
});
