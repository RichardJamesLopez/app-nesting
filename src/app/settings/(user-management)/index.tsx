"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { UserPlusIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { organizationIdAtom } from "~/state";
import { Button } from "~/components/ui/button";

import { MemberActions } from "./memberActions";
import { RoleIdType } from "~/lib/validationSchemas";

export function UserManagement() {
  const organizationId = useAtomValue(organizationIdAtom);
  const userRoles = api.userRole.getAll.useQuery(organizationId ?? "");

  const user = api.user.get.useQuery();
  if (
    user.data?.userRoles.find(
      (userRole) => userRole.organizationId === organizationId,
    )?.roleId !== ("admin" as RoleIdType)
  )
    return null;

  if (!organizationId) return null;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between">
          User management
          <Link href="settings/invites">
            <Button size="sm" variant="outline">
              <UserPlusIcon className="mr-2 h-4 w-4" />
              Invites
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
