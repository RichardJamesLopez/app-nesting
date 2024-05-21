import Image from "next/image";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Comment } from "~/components/comment";
import { Skeleton } from "~/components/ui/skeleton";
import { getServerAuthSession } from "~/server/auth";

const commentsData = [
  {
    avatarSrc: "/placeholder.svg?height=40&width=40",
    username: "alskfds",
    timeAgo: "9h ago",
    content:
      "Impressive growth metrics in Q1. What are the projections for Q2?",
    upvotes: 37,
    replies: [
      {
        avatarSrc: "/placeholder.svg?height=40&width=40",
        username: "jsndgkfsdljlak",
        timeAgo: "8h ago",
        content:
          "Thank you! We're projecting a 20% increase in revenue, with a focus on expanding our user base in Europe.",
        upvotes: 22,
        replies: [
          {
            avatarSrc: "/placeholder.svg?height=40&width=40",
            username: "vksdnalfksd",
            timeAgo: "2h ago",
            content:
              "Great to hear. Are there any new product features or partnerships that will drive this growth?",
            upvotes: 1,
          },
        ],
      },
    ],
  },
  {
    avatarSrc: "/placeholder.svg?height=40&width=40",
    username: "kdnkldsfgs",
    timeAgo: "6h ago",
    content:
      "Considering a follow-on investment. What are the key risks you're monitoring?",
    upvotes: 18,
    replies: [],
  },
];

export default async function Comments() {
  const session = await getServerAuthSession();
  if (!session) return null;

  const avatar = session.user.image ?? undefined;

  return (
    <div>
      <div className="mb-4 flex flex-col space-y-2">
        <div className="flex items-start space-x-2">
          {avatar ? (
            <Image
              alt="User avatar"
              src={avatar}
              height={40}
              width={40}
              className="rounded-full"
            />
          ) : (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
          <Textarea className="flex-1" placeholder="Add a comment..." />
        </div>
        <Button size="sm" className="self-end">
          Comment
        </Button>
      </div>

      {commentsData.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
  );
}
