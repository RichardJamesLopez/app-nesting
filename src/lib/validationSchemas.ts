import * as z from "zod";

export const organizationFormSchema = z.object({
  name: z.string().min(1).max(255),
});
export type OrganizationFormType = z.infer<typeof organizationFormSchema>;

export type RoleIdTypeType = "admin" | "member";

export const inviteFormSchema = z.object({
  userLimit: z.string(),
  expires: z.string(),
  organizationId: z.string(),
});
export type InviteFormType = z.infer<typeof inviteFormSchema>;
