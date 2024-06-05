"use client";

import { useRef, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { type User } from "next-auth";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import {
  BeautifulMentionsPlugin,
  BeautifulMentionNode,
} from "lexical-beautiful-mentions";
import { $getRoot, type LexicalEditor } from "lexical";

import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "~/components/ui/form";
import {
  commentFormSchema,
  type CommentFormType,
} from "~/lib/validationSchemas";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";
import {
  getBeautifulMentionsTheme,
  MentionsMenu,
  MentionsMenuItem,
} from "~/components/mentions";

export function NewComment({
  dealId,
  parentId,
  organizationId,
  self,
  onClose,
  onSaveReplySuccess,
}: {
  dealId: string;
  parentId?: number;
  organizationId: string;
  self: User;
  onClose?: () => void;
  onSaveReplySuccess?: () => void;
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

  const editorRef = useRef<LexicalEditor | null | undefined>(null);

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      toast(`${parentId ? "Reply" : "Comment"} posted`);
      form.reset();
      editorRef.current?.update(() => $getRoot().clear());

      if (onSaveReplySuccess)
        onSaveReplySuccess(); // data from a client component
      else router.refresh(); // data from a server component
    },
    onError: (error) => {
      toast.error("Failed to post");
      console.error(error);
    },
  });

  const onCreate = (values: CommentFormType) => {
    createComment.mutate(values);
  };

  const { mutateAsync: queryMentions } = api.comment.queryMentions.useMutation({
    onError: (error) => {
      toast.error("Failed to query mentions");
      console.error(error);
    },
  });

  const handleSearch = useCallback(
    async (_: string, queryString?: string | null) =>
      (await queryMentions({
        organizationId,
        userNameQuery: queryString,
      })) ?? (await Promise.resolve([])),
    [organizationId, queryMentions],
  );

  return (
    <div className="flex min-w-48 items-start space-x-2">
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
              <FormItem className="relative space-y-0">
                <LexicalComposer
                  initialConfig={{
                    namespace: "CommentEditor",
                    onError: console.error,
                    theme: {
                      beautifulMentions: getBeautifulMentionsTheme({
                        editable: true,
                      }),
                    },
                    nodes: [BeautifulMentionNode],
                  }}
                >
                  <PlainTextPlugin
                    contentEditable={
                      <ContentEditable className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    }
                    placeholder={
                      <div className="pointer-events-none absolute top-0 px-3 py-2 text-sm text-muted-foreground">
                        Add a {parentId ? "reply" : "comment"}...
                      </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  <HistoryPlugin />
                  <EditorRefPlugin editorRef={editorRef} />
                  <BeautifulMentionsPlugin
                    triggers={["@"]}
                    onSearch={handleSearch}
                    menuComponent={MentionsMenu}
                    menuItemComponent={MentionsMenuItem}
                    insertOnBlur={false}
                  />
                  <OnChangePlugin
                    onChange={(editorState) => {
                      const content = JSON.stringify(editorState);
                      console.log(content);

                      return field.onChange(content);
                    }}
                  />
                </LexicalComposer>
                <FormMessage className="mt-2" />
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
