"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { type User } from "next-auth";

import { type CommentType as ICommentType } from "~/lib/types";
import { Skeleton } from "~/components/ui/skeleton";

import { CommentActions } from "./actions";

type CommentType = Omit<ICommentType, "replies">;

export const Comment: React.FC<
  CommentType & {
    replies?: CommentType[];
    self: User;
    children?: React.ReactNode;
  }
> = ({
  id,
  content,
  user,
  createdAt,
  dealId,
  organizationId,
  replies,
  userReaction,
  totalVote,
  self,
  children,
}) => {
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
          id={id}
          userReaction={userReaction as boolean}
          totalVote={totalVote as number}
          dealId={dealId}
          userId={user.id}
          organizationId={organizationId}
          self={self}
        />
        <div className="mt-4 border-l-2 border-gray-200 pl-4">
          {replies?.map((reply) => (
            <Comment key={reply.id} {...reply} self={self} />
          ))}
        </div>
      </div>
    </div>
  );
};
