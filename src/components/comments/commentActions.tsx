"use client";

import {
  ArrowUpIcon,
  ArrowDownIcon,
  DotIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { toast } from "sonner";
import { type User } from "next-auth";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { type CommentType } from "~/server/api/routers/comment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { cn } from "~/lib/utils";

export const CommentActions: React.FC<{
  self: User;
  comment: CommentType;
  onReplyFormOpen: () => void;
  onChange: () => void;
}> = ({ comment, self, onReplyFormOpen, onChange }) => {
  const { id, totalVote, userReaction } = comment;

  const addReaction = api.comment.vote.useMutation({
    onSuccess: () => {
      onChange();
    },
    onError: (error) => {
      toast.error("Error");
      console.error(error);
    },
  });

  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      onChange();
      toast("Comment deleted");
    },
    onError: (error) => {
      toast.error("Error");
      console.error(error);
    },
  });
  const { data: userRoles } = api.user.getRoles.useQuery();
  const isDeletable = userRoles?.isAdmin || comment.createdById === self.id;

  return (
    <>
      <div className="mt-1 flex items-center space-x-3">
        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              addReaction.mutate({
                commentId: id,
                userId: self.id,
                type: userReaction === true ? undefined : true,
              })
            }
            className="h-min w-min flex-1 p-0.5"
          >
            <ArrowUpIcon
              strokeWidth={4}
              className={cn(
                "h-4 w-4",
                userReaction === true ? "text-gray-800" : "text-gray-400",
              )}
            />
          </Button>
          <span className="mx-1 flex-1 text-xs">
            {(totalVote as number) ?? (
              <DotIcon strokeWidth={4} className="h-3 w-3" />
            )}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              addReaction.mutate({
                commentId: id,
                userId: self.id,
                type: userReaction === false ? undefined : false,
              })
            }
            className="h-min w-min flex-1 p-0.5"
          >
            <ArrowDownIcon
              strokeWidth={4}
              className={cn(
                "h-4 w-4",
                userReaction === false ? "text-gray-800" : "text-gray-400",
              )}
            />
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

        {isDeletable && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-min p-1">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete the comment?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteComment.mutate(id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};
