import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
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

import { Invite } from "./invite";
import { NewInvite } from "./newInvite";

type Invite = {
  link: string;
  users: number;
  userLimit?: number;
  expiry?: Date;
};

const invites: Invite[] = [
  {
    link: "https://invite.link/asljfasd",
    users: 0,
    userLimit: 10,
    expiry: new Date(Number(new Date()) + 10000000),
  },
];

export default async function Invites() {
  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
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
            <NewInvite />
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
              {invites.map((invite) => (
                <Invite key={invite.link} invite={invite} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
