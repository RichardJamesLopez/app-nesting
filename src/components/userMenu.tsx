"use client";

import { useSession, signOut } from "next-auth/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { UserIcon, WalletMinimalIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "~/components/ui/skeleton";

export function UserMenu() {
  const { data: session } = useSession();

  const { isConnected: isWeb3Connected, address: walletAddress } = useAccount();
  const { open: openWeb3 } = useWeb3Modal();

  const username = session?.user.name;
  const avatar = session?.user.image ?? undefined;

  const truncatedWalletAddress = `${walletAddress?.slice(0, 4)}...${walletAddress?.slice(-4)}`;

  return (
    <DropdownMenu>
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
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
