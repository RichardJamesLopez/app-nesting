"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { type User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { type CommentType } from "~/server/api/routers/comment";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";

import { CommentActions } from "./actions";
import { NewComment } from "./newComment";

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

  const replyCountNumber = Number(replyCount);

  let renderedReplies = null;
  if (replies?.length)
    renderedReplies = replies
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
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
      ));
  else if (replyCountNumber)
    renderedReplies = (
      <Button
        onClick={() => refetch()}
        className="h-min p-1 text-xs"
        variant="ghost"
        size="sm"
      >
        {replyCountNumber} more repl{replyCountNumber > 1 ? "ies" : "y"}
      </Button>
    );

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
        <p className="mt-1 text-sm">{content}</p>
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
            <NewComment
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
          {renderedReplies}
        </div>
      </div>
    </div>
  );
};
