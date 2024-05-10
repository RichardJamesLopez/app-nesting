"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

import { Button } from "~/components/ui/button";

export function Header() {
  const { data: session } = useSession();

  const { isConnected: isWeb3Connected, address: walletAddress } = useAccount();
  const { open: openWeb3 } = useWeb3Modal();

  const username = session?.user.name;

  const truncatedWalletAddress = `${walletAddress?.slice(0, 4)}...${walletAddress?.slice(-4)}`;

  return (
    <header className="absolute top-0 flex w-full justify-between gap-2 border-b p-2">
      <div>
        {username && <span className="mr-2">Hi, {username}</span>}
        {session ? (
          <Button onClick={() => signOut()} variant="secondary">
            sign out
          </Button>
        ) : (
          <Button onClick={() => signIn()} variant="secondary">
            sign in
          </Button>
        )}
      </div>
      <div>
        {!isWeb3Connected ? (
          <Button onClick={() => openWeb3()} variant="secondary">
            connect wallet
          </Button>
        ) : (
          <Button onClick={() => openWeb3()} variant="secondary">
            {truncatedWalletAddress}
          </Button>
        )}
      </div>
    </header>
  );
}
