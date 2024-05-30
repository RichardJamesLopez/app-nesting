"use client";

import { toast } from "sonner";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";

import { Invite } from "./invite";
import { NewInvite } from "./newInvite";

export default function Invites({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const [newInviteId, setNewInviteId] = useState<string>();

  const invites = api.invite.getAll.useQuery(organizationId ?? "");
  const createInvite = api.invite.create.useMutation({
    onSuccess: (id) => {
      toast("Invite created");
      if (typeof id === "string") setNewInviteId(id);
      invites.refetch();
    },
    onError: (error) => {
      toast.error("Failed to create an invite");
      console.error(error);
    },
  });
  const updateInvite = api.invite.update.useMutation({
    onSuccess: (id) => {
      toast("Invite updated");
      if (typeof id === "string") setNewInviteId(id);
      invites.refetch();
    },
    onError: (error) => {
      toast.error("Failed to update an invite");
      console.error(error);
    },
  });
  const deleteInvite = api.invite.delete.useMutation({
    onSuccess: () => {
      toast("Invite deleted");
      invites.refetch();
    },
    onError: (error) => {
      toast.error("Failed to delete an invite");
      console.error(error);
    },
  });

  if (!organizationId) return null;

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${organizationId}/settings`}>
              Settings
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Invites</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Invites
            <NewInvite
              id={newInviteId}
              organizationId={organizationId}
              onCreate={createInvite.mutate}
              onUpdate={updateInvite.mutate}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Link</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.data?.map((invite) => (
                <Invite
                  key={invite.id}
                  invite={invite}
                  timesUsed={invite.memberships.length}
                  onDelete={deleteInvite.mutate}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
