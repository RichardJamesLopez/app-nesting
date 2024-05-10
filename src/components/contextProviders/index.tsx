"use client";

import { SessionProvider } from "next-auth/react";

import Web3ModalProvider from "./web3ModalProvider";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Web3ModalProvider>{children}</Web3ModalProvider>
    </SessionProvider>
  );
}
