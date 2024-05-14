"use client";

import { format } from "date-fns";
import { CopyIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";

type Invite = {
  link: string;
  users: number;
  userLimit?: number;
  expiry?: Date;
};

export function Invite({ invite }: { invite: Invite }) {
  return (
    <TableRow>
      <TableCell className="flex items-center font-medium">
        {invite.link}
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            await navigator.clipboard.writeText(invite.link);
            toast("Link copied.");
          }}
        >
          <CopyIcon className="h-4 w-4 text-gray-400" />
        </Button>
      </TableCell>
      <TableCell>
        {invite.users}
        {invite.userLimit && `/${invite.userLimit}`}
      </TableCell>
      <TableCell>
        {invite.expiry ? format(invite.expiry, "yyyy-MM-dd hh:mm") : "-"}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="icon">
          <XIcon className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
