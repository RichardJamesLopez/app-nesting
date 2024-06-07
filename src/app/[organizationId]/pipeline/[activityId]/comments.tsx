import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Comment } from "~/components/comments/comment";
import { CommentForm } from "~/components/comments/commentForm";

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
  if (!comments) return null;

  return (
    <div>
      <div className="mb-4">
        <CommentForm
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
