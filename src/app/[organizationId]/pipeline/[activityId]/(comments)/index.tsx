import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { Comment } from "./comment";
import { NewComment } from "./newComment";

export default async function Comments({
  dealId,
  organizationId,
}: {
  dealId: string;
  organizationId: string;
}) {
  const session = await getServerAuthSession();
  if (!session) return null;

  const comments = await api.comment.getAll({ dealId, organizationId });

  return (
    <div>
      <div className="mb-4">
        <NewComment
          dealId={dealId}
          organizationId={organizationId}
          self={session.user}
        />
      </div>

      {comments
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .map((comment) => (
          <Comment key={comment.id} comment={comment} self={session.user} />
        ))}
    </div>
  );
}
