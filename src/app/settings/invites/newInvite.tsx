"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { inviteFormSchema, type InviteFormType } from "~/lib/validationSchemas";

export function NewInvite({
  id,
  organizationId,
  onCreate,
  onUpdate,
}: {
  id?: string;
  organizationId: string;
  onCreate: (values: InviteFormType) => void;
  onUpdate: (values: { id: string; form: InviteFormType }) => void;
}) {
  const form = useForm<InviteFormType>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      expires: "168",
      userLimit: "no",
      organizationId,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      console.log("=== useEffect ===", name, value);
      id &&
        name &&
        onUpdate({ id, form: { ...form.getValues(), [name]: value[name] } });
    });
    return () => subscription.unsubscribe();
  }, [id, form, form.watch, onUpdate]);

  return (
    <Sheet onOpenChange={(open) => !open && form.reset()}>
      <SheetTrigger asChild>
        <Button
          size="sm"
          onClick={async () => {
            const isValid = await form.trigger();
            if (isValid) onCreate(form.getValues());
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New invite
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-2">
          <SheetTitle>New invite</SheetTitle>
        </SheetHeader>
        <Button
          size="sm"
          className="mb-6 w-full"
          onClick={async () => {
            await navigator.clipboard.writeText(
              "https://invite.link/laskfsdljfa",
            );
            toast("Link copied");
          }}
        >
          https://invite.link/laskfsdljfa
          <CopyIcon className="ml-3 h-4 w-4 text-white" />
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreate)} className="space-y-4">
            <FormField
              control={form.control}
              name="expires"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expire after</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0.5">30 minutes</SelectItem>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="24">1 day</SelectItem>
                      <SelectItem value="168">7 days</SelectItem>
                      <SelectItem value="no">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max number of users</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="no">No limit</SelectItem>
                      <SelectItem value="1">1 use</SelectItem>
                      <SelectItem value="5">5 uses</SelectItem>
                      <SelectItem value="10">10 uses</SelectItem>
                      <SelectItem value="25">25 5uses</SelectItem>
                      <SelectItem value="50">50 uses</SelectItem>
                      <SelectItem value="100">100 uses</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
