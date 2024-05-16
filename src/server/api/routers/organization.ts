import { eq, and, isNull } from "drizzle-orm";

import { generateId } from "~/lib/utils";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { organizations, userRoles } from "~/server/db/schema";
import {
  organizationFormSchema,
  type RoleIdType,
} from "~/lib/validationSchemas";

export const organizationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const myRoles = await ctx.db.query.userRoles.findMany({
        where: and(
          eq(userRoles.userId, ctx.session.user.id),
          isNull(userRoles.deletedAt),
        ),
        with: {
          organization: true,
        },
      });

      const uniqueOrgIds = new Set();

      return myRoles
        .filter(({ organization }) => {
          if (!organization || uniqueOrgIds.has(organization.id)) {
            return false;
          } else {
            uniqueOrgIds.add(organization.id);
            return true;
          }
        })
        .map(({ organization: { id, name } }) => ({ id, name }));
    } catch (error) {
      console.error(error);
    }
  }),
  create: protectedProcedure
    .input(organizationFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const [organization] = await ctx.db
          .insert(organizations)
          .values({
            id: generateId(),
            name: input.name,
            createdById: ctx.session.user.id,
          })
          .returning({ id: organizations.id });

        if (!organization) throw new Error("Failed to create an organization");

        await ctx.db.insert(userRoles).values({
          userId: ctx.session.user.id,
          organizationId: organization.id,
          roleId: "admin" as RoleIdType,
        });

        return organization.id;
      } catch (error) {
        console.error(error);

        return [];
      }
    }),
});
