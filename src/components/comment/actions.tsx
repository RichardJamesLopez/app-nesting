"use client";

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useState } from "react";
import { inferRouterOutputs } from "@trpc/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { type CommentRouter } from "~/server/api/routers/comment";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

import { NewComment } from "./newComment";

type CommentReactionsType =
  inferRouterOutputs<CommentRouter>["getAll"][number]["reactions"];

export const CommentActions: React.FC<{
  id: number;
  dealId: string;
  avatar?: string | null;
  userId: string;
  reactions: CommentReactionsType;
}> = ({ id, dealId, avatar, userId, reactions }) => {
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  const router = useRouter();

  const addReaction = api.comment.vote.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      toast.error("Error");
      console.error(error);
    },
  });

  const totalVote = reactions.reduce(
    (acc, { type }) => (type ? acc + 1 : acc - 1),
    0,
  );

  const userVote = reactions.find((reaction) => reaction.userId === userId);

  return (
    <>
      <div className="mt-1 flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <Button
            size="icon"
            variant={userVote?.type === true ? "default" : "ghost"}
            onClick={() =>
              addReaction.mutate({
                commentId: id,
                userId,
                type: userVote?.type === true ? undefined : true,
              })
            }
            className="h-min w-min p-1"
          >
            <ArrowUpIcon className="h-4 w-4 text-gray-500" />
          </Button>
          <span className="text-sm">{totalVote}</span>
          <Button
            size="icon"
            variant={userVote?.type === false ? "default" : "ghost"}
            onClick={() =>
              addReaction.mutate({
                commentId: id,
                userId,
                type: userVote?.type === false ? undefined : false,
              })
            }
            className="h-min w-min p-1"
          >
            <ArrowDownIcon className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        <Button
          onClick={() => setShowCommentForm(true)}
          size="sm"
          variant="ghost"
          className="h-min w-min p-1 text-xs"
        >
          Reply
        </Button>
      </div>
      {showCommentForm && (
        <div className="mt-4 border-l-2 border-gray-200 pl-4">
          <NewComment
            dealId={dealId}
            parentId={id}
            avatar={avatar ?? undefined}
            onClose={() => setShowCommentForm(false)}
          />
        </div>
      )}
    </>
  );
};
