import { eq, and } from "drizzle-orm";
import * as z from "zod";

import { generateId } from "~/lib/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { invites } from "~/server/db/schema";
import { inviteFormSchema } from "~/lib/validationSchemas";

export const inviteRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      return await ctx.db.query.invites.findMany({
        where: and(
          eq(invites.organizationId, input),
          eq(invites.createdById, ctx.session.user.id),
        ),
        with: {
          userRoles: true,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }),
  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const invite = await ctx.db.query.invites.findFirst({
        where: eq(invites.id, input),
        with: { organization: true, createdById: true },
      });
      if (!invite) throw new Error("Invite not found.");

      return {
        organizationId: invite.organizationId,
        organizationName: invite.organization.name,
        inviterName: invite.createdById.name,
      };
    } catch (error) {
      console.error(error);
    }
  }),
  create: protectedProcedure
    .input(inviteFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const [invite] = await ctx.db
          .insert(invites)
          .values({
            id: generateId(),
            userLimit:
              input.userLimit === "no" ? null : Number(input.userLimit),
            expires:
              input.expires === "no"
                ? null
                : new Date(
                    Number(new Date()) + 3600000 * Number(input.expires),
                  ),
            organizationId: input.organizationId,
            createdById: ctx.session.user.id,
          })
          .returning({ id: invites.id });

        return invite?.id;
      } catch (error) {
        console.error(error);

        return [];
      }
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), form: inviteFormSchema }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(invites)
          .set({
            userLimit:
              input.form.userLimit === "no"
                ? null
                : Number(input.form.userLimit),
            expires:
              input.form.expires === "no"
                ? null
                : new Date(
                    Number(new Date()) + 3600000 * Number(input.form.expires),
                  ),
          })
          .where(eq(invites.id, input.id));
      } catch (error) {
        console.error(error);

        return [];
      }
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(invites).where(eq(invites.id, input));
      try {
      } catch (error) {
        console.error(error);

        return [];
      }
    }),
});
