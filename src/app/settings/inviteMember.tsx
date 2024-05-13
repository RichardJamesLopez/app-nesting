"use client";

import { UserPlusIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";

export function InviteMember() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button size="sm" variant="outline">
          <UserPlusIcon className="mr-2 h-4 w-4" /> Invite
        </Button>
      </SheetTrigger>
      <SheetContent>yo</SheetContent>
    </Sheet>
  );
}
