import { Comment } from "~/components/comment";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { NewComment } from "~/components/comment/newComment";

export default async function Comments({ dealId }: { dealId: string }) {
  const session = await getServerAuthSession();
  if (!session) return null;

  const avatar = session.user.image ?? undefined;

  const comments = await api.comment.getAll({ dealId });

  return (
    <div>
      <div className="mb-4">
        <NewComment dealId={dealId} avatar={avatar} />
      </div>

      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
