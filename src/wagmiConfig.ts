import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet } from "viem/chains";

import { env } from "~/env";

export const wagmiConfig = defaultWagmiConfig({
  chains: [mainnet] as const,
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: "Ourmada",
    description: "Ourmada",
    url: env.NEXT_PUBLIC_WALLETCONNECT_URL,
    icons: [],
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
