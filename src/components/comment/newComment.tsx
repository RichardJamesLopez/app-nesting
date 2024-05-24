"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  avatar,
  onClose,
}: {
  dealId: string;
  parentId?: number;
  avatar?: string;
  onClose?: () => void;
}) {
  const form = useForm<CommentFormType>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
      dealId,
      parentId,
    },
  });

  const router = useRouter();

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      toast(`${parentId ? "Reply" : "Comment"} posted`);
      router.refresh();
      form.reset();
      onClose && onClose();
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
      {avatar ? (
        <Image
          alt="User avatar"
          src={avatar}
          height={40}
          width={40}
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
                  className="flex-1"
                  placeholder="Add a comment..."
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
