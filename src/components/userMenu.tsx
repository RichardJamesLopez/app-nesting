"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import {
  UserIcon,
  WalletMinimalIcon,
  LogOutIcon,
  UsersIcon,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import { useAtom } from "jotai";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "~/components/ui/skeleton";
import { organizationIdAtom } from "~/state";
import { OrganizationForm } from "~/components/organizationForm";
import {
  Sheet as NewOrganizationSheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { api } from "~/trpc/react";

export function UserMenu() {
  const { data: session } = useSession();

  const { isConnected: isWeb3Connected, address: walletAddress } = useAccount();
  const { open: openWeb3 } = useWeb3Modal();

  const username = session?.user.name;
  const avatar = session?.user.image ?? undefined;

  const truncatedWalletAddress = `${walletAddress?.slice(0, 4)}...${walletAddress?.slice(-4)}`;

  const [isNewOrganizationSheetOpen, setIsNewOrganizationSheetOpen] =
    useState<boolean>(false);

  const [organizationId, setOrganizationId] = useAtom(organizationIdAtom);

  const organizations = api.organization.getAll.useQuery();
  useEffect(() => {
    console.log(
      "organizations.data, organizationId",
      organizations.data,
      !organizationId,
    );
    if (organizations.data && organizations.data[0] && !organizationId)
      setOrganizationId(organizations.data[0].id);
  }, [organizations.data, setOrganizationId, organizationId]);

  const createOrganization = api.organization.create.useMutation({
    onSuccess: (newOrganizationId) => {
      organizations.refetch();
      setIsNewOrganizationSheetOpen(false);
      toast("Organization created");
      setOrganizationId(newOrganizationId as string);
    },
    onError: () => {
      toast.error("Failed to create an organization");
    },
  });

  return (
    <NewOrganizationSheet
      open={isNewOrganizationSheetOpen}
      onOpenChange={setIsNewOrganizationSheetOpen}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          {avatar ? (
            <Image
              alt="User avatar"
              src={avatar}
              height={40}
              width={40}
              className="rounded-full"
            />
          ) : (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="mr-2">{username}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openWeb3()}>
              <WalletMinimalIcon className="mr-2 h-4 w-4" />
              <span>
                {!isWeb3Connected ? "Connect wallet" : truncatedWalletAddress}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UsersIcon className="mr-2 h-4 w-4" />
                <span>Organization</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {!organizations.data?.length ? (
                    <DropdownMenuCheckboxItem disabled>
                      None
                    </DropdownMenuCheckboxItem>
                  ) : (
                    organizations.data?.map((organization) => (
                      <DropdownMenuCheckboxItem
                        key={organization.id}
                        checked={organization.id === organizationId}
                        onCheckedChange={() =>
                          setOrganizationId(organization.id)
                        }
                      >
                        {organization.name}
                      </DropdownMenuCheckboxItem>
                    ))
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <SheetTrigger asChild>
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" />
                New organization
              </DropdownMenuItem>
            </SheetTrigger>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <SheetContent>
        <SheetHeader className="mb-2">
          <SheetTitle>New organization</SheetTitle>
        </SheetHeader>
        {session && <OrganizationForm onSubmit={createOrganization.mutate} />}
      </SheetContent>
    </NewOrganizationSheet>
  );
}
