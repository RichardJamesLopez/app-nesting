import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { MemberActions } from "./memberActions";

type Member = {
  name: string;
  email: string;
  image: string;
  wallet: string;
  role: string;
  joinedOn: Date;
};

const members: Member[] = [
  {
    name: "John Doe",
    email: "john.doe.1@gmail.com",
    image: "/logo.png",
    wallet: "0x3242342342",
    role: "Admin",
    joinedOn: new Date(Number(new Date()) - 20000000),
  },
  {
    name: "Alice",
    email: "alice@gmail.com",
    image: "/logo.png",
    wallet: "0x6242342342",
    role: "Member",
    joinedOn: new Date(Number(new Date()) - 10000000),
  },
];

export async function Members() {
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
        {members.map((member) => (
          <TableRow key={member.email}>
            <TableCell className="font-medium">
              <div className="flex">
                <Image
                  src={member.image}
                  alt={`${member.name}' avatar`}
                  width={24}
                  height={24}
                  className="mr-1 h-8 w-8 rounded-full"
                />
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {member.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>{formatDistanceToNow(member.joinedOn)} ago</TableCell>
            <TableCell className="text-right">
              <MemberActions member={member} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
