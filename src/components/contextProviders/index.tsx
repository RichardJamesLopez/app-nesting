"use client";

import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "~/trpc/react";

import Web3ModalProvider from "./web3ModalProvider";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Web3ModalProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </Web3ModalProvider>
    </SessionProvider>
  );
}
