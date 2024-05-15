"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  organizationFormSchema,
  type OrganizationFormType,
} from "~/lib/validationSchemas";

export function OrganizationForm({
  onSave,
}: {
  onSave: (values: OrganizationFormType) => Promise<void>;
}) {
  const form = useForm<OrganizationFormType>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: OrganizationFormType) {
    await onSave(values);
    toast("Organization created");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
