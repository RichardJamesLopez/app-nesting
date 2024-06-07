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

export const commentFormSchema = z.object({
  content: z
    .string()
    .min(1)
    .max(10000)
    .refine((val) => val.substring(33, 35) !== "[]", "Field must not be empty"),
  dealId: z.string(),
  organizationId: z.string(),
  parentId: z.number().optional(),
  mentionedUserIds: z.array(z.string()).optional(),
});
export type CommentFormType = z.infer<typeof commentFormSchema>;
