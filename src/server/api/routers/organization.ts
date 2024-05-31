import { eq, and, isNull } from "drizzle-orm";
import * as z from "zod";

import { generateId } from "~/lib/utils";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  organizations,
  memberships,
  membershipRoles,
} from "~/server/db/schema";
import {
  organizationFormSchema,
  type RoleIdType,
  visibilityFormSchema,
} from "~/lib/validationSchemas";

export const organizationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const myRoles = await ctx.db.query.memberships.findMany({
        where: and(
          eq(memberships.userId, ctx.session.user.id),
          isNull(memberships.deletedAt),
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
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const organization = await ctx.db.query.organizations.findFirst({
        where: eq(organizations.id, input),
      });

      return organization;
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
            ownerId: ctx.session.user.id,
          })
          .returning({ id: organizations.id });

        if (!organization) throw new Error("Failed to create an organization");

        await ctx.db.insert(memberships).values({
          userId: ctx.session.user.id,
          organizationId: organization.id,
        });

        await ctx.db.insert(membershipRoles).values({
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
  setVisibility: protectedProcedure
    .input(z.object({ id: z.string(), form: visibilityFormSchema }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(organizations)
          .set({ includeHiddenDeals: input.form.includeHiddenDeals })
          .where(eq(organizations.id, input.id));
      } catch (error) {
        console.error(error);

        return [];
      }
    }),
});
