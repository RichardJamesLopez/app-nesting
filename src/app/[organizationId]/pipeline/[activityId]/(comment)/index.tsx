"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { type User } from "next-auth";

import { type CommentType } from "~/server/api/routers/comment";
import { Skeleton } from "~/components/ui/skeleton";

import { CommentActions } from "./actions";

export const Comment: React.FC<{ self: User; comment: CommentType }> = ({
  comment,
  self,
}) => {
  const { content, user, createdAt, replies } = comment;

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
        <CommentActions comment={comment} self={self} />
        <div className="mt-4 border-l-2 border-gray-200 pl-4">
          {replies
            ?.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
            .map((reply) => (
              <Comment key={reply.id} comment={reply} self={self} />
            ))}
        </div>
      </div>
    </div>
  );
};
