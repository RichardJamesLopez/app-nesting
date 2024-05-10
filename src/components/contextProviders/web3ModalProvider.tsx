"use client";

import { State, WagmiProvider } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { wagmiConfig } from "~/wagmiConfig";
import { env } from "~/env";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig,
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
