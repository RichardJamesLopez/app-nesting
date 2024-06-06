"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { type User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  BeautifulMentionsPlugin,
  BeautifulMentionNode,
} from "lexical-beautiful-mentions";

import { type CommentType } from "~/server/api/routers/comment";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  getBeautifulMentionsTheme,
  MentionsMenu,
  MentionsMenuItem,
} from "~/components/mentions";

import { CommentActions } from "./commentActions";
import { CommentForm } from "./commentForm";

function isJSONParsable(value: string | null) {
  if (!value) return false;
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}

export const Comment: React.FC<{
  self: User;
  comment: CommentType;
  onChange?: () => void;
}> = ({ comment, self, onChange }) => {
  const {
    id,
    content,
    user,
    dealId,
    organizationId,
    createdAt,
    replies: initialReplies,
    replyCount,
  } = comment;

  const {
    data: fetchedReplies,
    refetch,
    isFetched: areRepliesFetched,
  } = api.comment.getAll.useQuery(
    { dealId, organizationId, parentId: id },
    { enabled: false },
  );

  const router = useRouter();

  const replies = areRepliesFetched ? fetchedReplies : initialReplies;

  const moreRepliesCount = Number(replyCount) - (replies?.length ?? 0);

  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  return (
    <div className="mt-2 flex items-start space-x-2">
      {user.image ? (
        <Image
          alt="User avatar"
          src={user.image}
          height={36}
          width={36}
          className="rounded-full"
        />
      ) : (
        <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
      )}
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(createdAt)} ago
            </p>
          </div>
        </div>

        <LexicalComposer
          initialConfig={{
            namespace: "CommentViewer",
            onError: console.error,
            nodes: [BeautifulMentionNode],
            theme: {
              beautifulMentions: getBeautifulMentionsTheme({ editable: false }),
            },
            editorState: isJSONParsable(content) ? content : undefined,
            editable: false,
          }}
        >
          <PlainTextPlugin
            contentEditable={<ContentEditable className="mt-1 text-sm" />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <BeautifulMentionsPlugin
            items={{}}
            menuComponent={MentionsMenu}
            menuItemComponent={MentionsMenuItem}
          />
        </LexicalComposer>

        <CommentActions
          comment={comment}
          self={self}
          onReplyFormOpen={() => setShowCommentForm(true)}
          onChange={() => {
            if (onChange)
              onChange(); // data from a client component
            else router.refresh(); // data from a server component
          }}
        />
        <div className="mt-4 border-l-2 border-gray-200 pl-4">
          {showCommentForm && (
            <CommentForm
              dealId={dealId}
              parentId={id}
              organizationId={organizationId}
              self={self}
              onClose={() => setShowCommentForm(false)}
              onSaveReplySuccess={() => {
                refetch();
                setShowCommentForm(false);
              }}
            />
          )}

          {replies
            ?.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
            .map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                self={self}
                onChange={() => {
                  refetch();
                  router.refresh();
                }} // go one level up to be able to cover the item
              />
            ))}

          {moreRepliesCount ? (
            <Button
              onClick={() => refetch()}
              className="h-min p-1 text-xs"
              variant="ghost"
              size="sm"
            >
              {moreRepliesCount} more repl{moreRepliesCount > 1 ? "ies" : "y"}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
