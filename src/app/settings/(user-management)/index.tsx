"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useAtomValue } from "jotai";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { organizationIdAtom } from "~/state";

import { MemberActions } from "./memberActions";

export function UserManagement() {
  const organizationId = useAtomValue(organizationIdAtom);
  const userRoles = api.userRole.getAll.useQuery(organizationId ?? "");
  if (!organizationId) return "Select organization";

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userRoles.data?.map(({ createdAt, user, role }) => (
          <TableRow key={user.email}>
            <TableCell className="font-medium">
              <div className="flex">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={`${user.name}' avatar`}
                    height={24}
                    width={24}
                    className="mr-1 h-8 w-8 rounded-full"
                  />
                ) : (
                  <Skeleton className="mr-1 h-8 w-8 rounded-full" />
                )}
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{role.name}</TableCell>
            <TableCell>{formatDistanceToNow(createdAt)} ago</TableCell>
            <TableCell className="text-right">
              <MemberActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
