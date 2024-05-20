import * as z from "zod";

export const organizationFormSchema = z.object({
  name: z.string().min(1).max(255),
});
export type OrganizationFormType = z.infer<typeof organizationFormSchema>;

export type RoleIdType = "admin" | "member";

export const inviteFormSchema = z.object({
  userLimit: z.string(),
  expires: z.string(),
  organizationId: z.string(),
});
export type InviteFormType = z.infer<typeof inviteFormSchema>;

export const visibilityFormSchema = z.object({
  includeHiddenDeals: z.boolean().nullish(),
});
export type VisibilityFormType = z.infer<typeof visibilityFormSchema>;
