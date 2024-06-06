"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import {
  // UserIcon,
  WalletMinimalIcon,
  LogOutIcon,
  UsersIcon,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { OrganizationForm } from "~/components/organizationForm";
import {
  Sheet as NewOrganizationSheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { api } from "~/trpc/react";

export function UserMenu({ organizationId }: { organizationId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { isConnected: isWeb3Connected, address: walletAddress } = useAccount();
  const { open: openWeb3 } = useWeb3Modal();

  const username = session?.user.name;
  const avatar = session?.user.image ?? undefined;

  const truncatedWalletAddress = `${walletAddress?.slice(0, 4)}...${walletAddress?.slice(-4)}`;

  const [isNewOrganizationSheetOpen, setIsNewOrganizationSheetOpen] =
    useState<boolean>(false);

  const organizations = api.organization.getAll.useQuery();
  useEffect(() => {
    if (!organizationId) setIsNewOrganizationSheetOpen(true);
  }, [organizationId]);

  const createOrganization = api.organization.create.useMutation({
    onSuccess: (newOrganizationId) => {
      organizations.refetch();
      setIsNewOrganizationSheetOpen(false);
      toast("Organization created");
      router.push(`/${newOrganizationId}/pipeline`);
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
              height={36}
              width={36}
              className="rounded-full"
            />
          ) : (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="mr-2">{username}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => openWeb3()}
              className="cursor-pointer"
            >
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
                        className="cursor-pointer"
                        onCheckedChange={() =>
                          router.push(`/${organization.id}/pipeline`)
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
              <DropdownMenuItem className="cursor-pointer">
                <PlusIcon className="mr-2 h-4 w-4" />
                New organization
              </DropdownMenuItem>
            </SheetTrigger>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: window.location.origin })}
              className="cursor-pointer"
            >
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
