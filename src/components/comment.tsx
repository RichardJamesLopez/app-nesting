import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

import { AvatarImage, Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

type CommentProps = {
  avatarSrc: string;
  username: string;
  timeAgo: string;
  content: string;
  upvotes: number;
  replies?: CommentProps[];
};

export const Comment: React.FC<CommentProps> = ({
  avatarSrc,
  username,
  timeAgo,
  content,
  upvotes,
  replies = [],
}) => {
  return (
    <div className="mt-2 flex items-start space-x-3">
      <Avatar>
        <AvatarImage alt={username} src={avatarSrc} />
        <AvatarFallback className="bg-gray-300" />
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold">{username}</p>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <p className="mt-1 text-sm">{content}</p>
        <div className="mt-1 flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Button size="icon" variant="ghost" className="h-min w-min p-1">
              <ArrowUpIcon className="h-4 w-4 text-gray-500" />
            </Button>
            <span className="text-sm">{upvotes}</span>
            <Button size="icon" variant="ghost" className="h-min w-min p-1">
              <ArrowDownIcon className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          <Button size="sm" variant="ghost" className="h-min w-min p-1 text-xs">
            Reply
          </Button>
        </div>
        {replies.length > 0 && (
          <div className="mt-4 border-l-2 border-gray-200 pl-4">
            {replies.map((reply, index) => (
              <Comment key={index} {...reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
