"use client";

import { ArrowUpIcon, ArrowDownIcon, DotIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

import { NewComment } from "./newComment";

export const CommentActions: React.FC<{
  id: number;
  dealId: string;
  avatar?: string | null;
  userId: string;
  totalVote: number;
  userReaction: boolean;
}> = ({ id, dealId, avatar, userId, totalVote, userReaction }) => {
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

  return (
    <>
      <div className="mt-1 flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <Button
            size="icon"
            variant={userReaction === true ? "default" : "ghost"}
            onClick={() =>
              addReaction.mutate({
                commentId: id,
                userId,
                type: userReaction === true ? undefined : true,
              })
            }
            className="h-min w-min flex-1 p-0.5"
          >
            <ArrowUpIcon strokeWidth={4} className="h-4 w-4 text-gray-400" />
          </Button>
          <span className="flex-1 text-xs">
            {totalVote ?? <DotIcon strokeWidth={4} className="h-3 w-3" />}
          </span>
          <Button
            size="icon"
            variant={userReaction === false ? "default" : "ghost"}
            onClick={() =>
              addReaction.mutate({
                commentId: id,
                userId,
                type: userReaction === false ? undefined : false,
              })
            }
            className="h-min w-min flex-1 p-0.5"
          >
            <ArrowDownIcon strokeWidth={4} className="h-4 w-4 text-gray-400" />
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
