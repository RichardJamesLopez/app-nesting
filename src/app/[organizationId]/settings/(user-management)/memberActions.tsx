"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { MembershipType } from "~/server/api/routers/membership";
import { api } from "~/trpc/react";
import { type RoleIdType } from "~/lib/validationSchemas";

export function MemberActions({
  membership,
  onChange,
}: {
  membership: MembershipType;
  onChange: () => void;
}) {
  const { data: session } = useSession();
  const isSelf = session?.user.id === membership.userId;
  if (isSelf) return null;

  const { data: userRoles } = api.user.getRoles.useQuery();
  const isSelfAdmin = userRoles?.isAdmin;
  const isSelfOwner = userRoles?.isOwner;

  const isMemberAdmin = membership.membershipRoles
    .map(({ roleId }) => roleId)
    .includes("admin" as RoleIdType);

  const enablePromoteToAdmin = isSelfOwner && !isMemberAdmin;
  const enableDemoteFromAdmin = isSelfOwner && isMemberAdmin;
  const enableKick =
    (isSelfAdmin && !isMemberAdmin) || (isSelfOwner && !isSelf);

  if (!(enablePromoteToAdmin || enableDemoteFromAdmin || enableKick))
    return null;

  const { mutateAsync: addRole } = api.membership.addRole.useMutation();
  const { mutateAsync: removeRole } = api.membership.removeRole.useMutation();
  const { mutateAsync: kick } = api.membership.remove.useMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(member.wallet);
            toast("Wallet address copied");
          }}
        >
          Copy wallet address
        </DropdownMenuItem> */}

        {enablePromoteToAdmin && (
          <DangerousAction
            label="Promote to Admin"
            dialogTitle={`Promote ${membership.user.name} to Admin?`}
            onSubmit={async () => {
              await addRole({
                organizationId: membership.organizationId,
                userId: membership.userId,
                roleId: "admin" as RoleIdType,
              });
              toast(`${membership.user.name} is promoted to Admin`);
              onChange();
            }}
          />
        )}

        {enableDemoteFromAdmin && (
          <DangerousAction
            label="Demote from Admin"
            dialogTitle={`Demote ${membership.user.name} from Admin?`}
            onSubmit={async () => {
              await removeRole({
                organizationId: membership.organizationId,
                userId: membership.userId,
                roleId: "admin" as RoleIdType,
              });
              toast(`${membership.user.name} is demoted from Admin`);
              onChange();
            }}
          />
        )}

        {enableKick && (
          <DangerousAction
            label="Kick"
            dialogTitle={`Kick ${membership.user.name}?`}
            onSubmit={async () => {
              await kick({
                organizationId: membership.organizationId,
                userId: membership.userId,
              });
              toast(`${membership.user.name} is kicked`);
              onChange();
            }}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DangerousAction = ({
  label,
  dialogTitle,
  onSubmit,
}: {
  label: string;
  dialogTitle: string;
  onSubmit: () => void;
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        {label}
      </DropdownMenuItem>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => onSubmit()}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
