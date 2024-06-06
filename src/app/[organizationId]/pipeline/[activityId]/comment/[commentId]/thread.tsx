"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { CornerUpLeftIcon } from "lucide-react";

import { api } from "~/trpc/react";
import { Comment } from "~/components/comments/comment";
import { Button } from "~/components/ui/button";

export default function Thread({
  dealId,
  organizationId,
  commentId,
}: {
  dealId: string;
  organizationId: string;
  commentId: number;
}) {
  const [threadIds, setThreadIds] = useState<number[]>([commentId]);

  const { data: session } = useSession();

  const { data: thread, refetch } = api.comment.getThread.useQuery({
    dealId,
    organizationId,
    threadIds,
  });

  if (!thread || !session) return null;

  const parentId = thread[thread.length - 1]?.parentId;

  return (
    <div>
      <h2 className="mb-6 border-b pb-1 text-sm text-muted-foreground">
        Single comment thread
      </h2>
      {parentId && (
        <Button
          onClick={() => setThreadIds([...threadIds, parentId])}
          variant="ghost"
          size="sm"
          className="text-xs"
        >
          <CornerUpLeftIcon className="mr-2 h-3 w-3" />
          Parent comment
        </Button>
      )}

      {thread.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          self={session.user}
          onChange={() => {
            refetch();
          }}
        />
      ))}
    </div>
  );
}
