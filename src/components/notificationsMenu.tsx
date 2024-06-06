"use client";

import { Fragment } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BellIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

export function NotificationsMenu() {
  const router = useRouter();

  const { data: session } = useSession();
  if (!session) return;

  const { data: notifications } = api.notification.getAll.useQuery();

  const { data: hasUnread } = api.notification.getHasUnread.useQuery();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <BellIcon className="h-5 w-5 text-gray-600" />
          {hasUnread && (
            <UnreadDot className="absolute right-[10px] top-[10px]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-0" align="end">
        {notifications && notifications.length ? (
          notifications.map(
            ({
              id,
              createdAt,
              isRead,
              commentId,
              dealId,
              mentionedBy: { name, avatar },
            }) => (
              <Fragment key={id}>
                <DropdownMenuItem className="flex cursor-pointer items-center justify-between space-x-3 rounded-none p-4">
                  {avatar ? (
                    <Image
                      alt="User avatar"
                      src={avatar}
                      height={36}
                      width={36}
                      className="self-start rounded-full"
                    />
                  ) : (
                    <Skeleton className="h-8 w-8 rounded-full" />
                  )}
                  <div>
                    <p className="mb-1 leading-tight">
                      <span className="font-semibold">{name}</span> mentioned
                      you
                    </p>
                    <p className="text-xs opacity-70">
                      {formatDistanceToNow(createdAt)} ago
                    </p>
                  </div>
                  <UnreadDot
                    className={cn("shrink-0", isRead && "bg-transparent")}
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-0" />
              </Fragment>
            ),
          )
        ) : (
          <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UnreadDot({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("h-[10px] w-[10px] rounded-full bg-blue-400", className)}
      {...props}
    />
  );
}
