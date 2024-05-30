"use client";

import { format } from "date-fns";
import { CopyIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { type InviteType } from "~/server/db/schema";

export function Invite({
  invite,
  timesUsed,
  onDelete,
}: {
  invite: InviteType;
  timesUsed: number;
  onDelete: (id: string) => void;
}) {
  const url = `${window.location.origin}/invite/${invite.id}`;

  return (
    <TableRow>
      <TableCell className="flex items-center font-medium">
        {invite.id}
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            await navigator.clipboard.writeText(url);
            toast("Link copied");
          }}
        >
          <CopyIcon className="h-4 w-4 text-gray-400" />
        </Button>
      </TableCell>
      <TableCell>
        {timesUsed}
        {invite.userLimit && `/${invite.userLimit}`}
      </TableCell>
      <TableCell>
        {invite.expires ? format(invite.expires, "yyyy-MM-dd hh:mm") : "-"}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" onClick={() => onDelete(invite.id)}>
          <XIcon className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
