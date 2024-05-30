"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { type User } from "next-auth";

import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import {
  commentFormSchema,
  type CommentFormType,
} from "~/lib/validationSchemas";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";

export function NewComment({
  dealId,
  parentId,
  organizationId,
  self,
  onClose,
  onSave,
}: {
  dealId: string;
  parentId?: number;
  organizationId: string;
  self: User;
  onClose?: () => void;
  onSave?: () => void;
}) {
  const form = useForm<CommentFormType>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
      dealId,
      parentId,
      organizationId,
    },
  });

  const router = useRouter();

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      toast(`${parentId ? "Reply" : "Comment"} posted`);
      router.refresh();
      form.reset();
      onSave && onSave();
    },
    onError: (error) => {
      toast.error("Failed to post");
      console.error(error);
    },
  });

  const onCreate = (values: CommentFormType) => {
    createComment.mutate(values);
  };

  return (
    <div className="flex items-start space-x-2">
      {self.image ? (
        <Image
          alt="User avatar"
          src={self.image}
          height={36}
          width={36}
          className="rounded-full"
        />
      ) : (
        <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onCreate)}
          className="flex flex-grow flex-col space-y-2"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <Textarea
                  {...field}
                  autoFocus={!!parentId}
                  className="flex-1"
                  placeholder={`Add a ${parentId ? "reply" : "comment"}...`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-2 self-end">
            {onClose && (
              <Button onClick={onClose} variant="ghost" size="sm">
                Cancel
              </Button>
            )}
            <Button type="submit" size="sm">
              {parentId ? "Reply" : "Comment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
