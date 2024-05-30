import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { Comment } from "./(comment)/index";
import { NewComment } from "./(comment)/newComment";

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

      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} self={session.user} />
      ))}
    </div>
  );
}
