"use client";

import { ArrowUpIcon, ArrowDownIcon, DotIcon } from "lucide-react";
import { toast } from "sonner";
import { type User } from "next-auth";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { type CommentType } from "~/server/api/routers/comment";

export const CommentActions: React.FC<{
  self: User;
  comment: CommentType;
  onReplyFormOpen: () => void;
  onVoteSuccess: () => void;
}> = ({ comment, self, onReplyFormOpen, onVoteSuccess }) => {
  const { id, totalVote, userReaction } = comment;

  const addReaction = api.comment.vote.useMutation({
    onSuccess: () => {
      onVoteSuccess();
    },
    onError: (error) => {
      toast.error("Error");
      console.error(error);
    },
  });

  return (
    <>
      <div className="mt-1 flex items-center space-x-3">
        <div className="flex items-center">
          <Button
            size="icon"
            variant={userReaction === true ? "default" : "ghost"}
            onClick={() =>
              addReaction.mutate({
                commentId: id,
                userId: self.id,
                type: userReaction === true ? undefined : true,
              })
            }
            className="h-min w-min flex-1 p-0.5"
          >
            <ArrowUpIcon strokeWidth={4} className="h-4 w-4 text-gray-400" />
          </Button>
          <span className="mx-1 flex-1 text-xs">
            {(totalVote as number) ?? (
              <DotIcon strokeWidth={4} className="h-3 w-3" />
            )}
          </span>
          <Button
            size="icon"
            variant={userReaction === false ? "default" : "ghost"}
            onClick={() =>
              addReaction.mutate({
                commentId: id,
                userId: self.id,
                type: userReaction === false ? undefined : false,
              })
            }
            className="h-min w-min flex-1 p-0.5"
          >
            <ArrowDownIcon strokeWidth={4} className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
        <Button
          onClick={() => onReplyFormOpen()}
          size="sm"
          variant="ghost"
          className="h-min w-min p-1 text-xs"
        >
          Reply
        </Button>
      </div>
    </>
  );
};
