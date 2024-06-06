"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { api } from "~/trpc/react";
import { Comment } from "~/components/comments/comment";

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
      <div className="mb-4">
        this is a thread
        <button
          onClick={() => parentId && setThreadIds([...threadIds, parentId])}
        >
          show parent
        </button>
      </div>

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
