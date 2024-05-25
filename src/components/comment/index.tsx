import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { inferRouterOutputs } from "@trpc/server";

import { type CommentRouter } from "~/server/api/routers/comment";
import { Skeleton } from "~/components/ui/skeleton";

import { CommentActions } from "./actions";

type CommentType = Omit<
  inferRouterOutputs<CommentRouter>["getAll"][number],
  "replies"
>;

export const Comment: React.FC<CommentType & { replies?: CommentType[] }> = ({
  id,
  content,
  user,
  createdAt,
  dealId,
  replies,
  userReaction,
  totalVote,
}) => {
  return (
    <div className="mt-2 flex items-start space-x-2">
      {user.image ? (
        <Image
          alt="User avatar"
          src={user.image}
          height={40}
          width={40}
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
          avatar={user.image}
          userId={user.id}
        />
        {replies && replies.length > 0 && (
          <div className="mt-4 border-l-2 border-gray-200 pl-4">
            {replies.map((reply) => (
              <Comment key={reply.id} {...reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
