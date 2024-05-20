"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Switch } from "~/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  visibilityFormSchema,
  type VisibilityFormType,
} from "~/lib/validationSchemas";

export function Visibility({
  defaultValues,
  onSubmit,
}: {
  defaultValues: VisibilityFormType;
  onSubmit: (values: VisibilityFormType) => void;
}) {
  const form = useForm<VisibilityFormType>({
    resolver: zodResolver(visibilityFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      name && onSubmit({ ...form.getValues(), [name]: value[name] });
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch, onSubmit]);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Visibility</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="w-full">
            <div>
              <div>
                <FormField
                  control={form.control}
                  name="includeHiddenDeals"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-lg border p-4">
                      <div>
                        <FormLabel className="text-base">
                          Include hidden deals in total count
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
