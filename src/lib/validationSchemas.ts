import * as z from "zod";

export const organizationFormSchema = z.object({
  name: z.string().min(1).max(255),
});
export type OrganizationFormType = z.infer<typeof organizationFormSchema>;
