'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from 'wagmi'; 
import { http, createConfig } from 'wagmi'; 
import { mainnet, sepolia } from '@wagmi/chains';
//import { coinbaseWallet, injected } from '@wagmi/connectors' 
//import { type WagmiProviderProps } from 'wagmi'
//import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';
//import { walletConnect } from 'wagmi/connectors';
//import { WagmiConfig, configureChains, createConfig } from 'wagmi';
//import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
//import { InjectedConnector } from 'wagmi/connectors/injected';
//import { WalletConnectConnector } from 'wagmi/connectors';
//import { publicProvider } from 'wagmi/providers/public';

// 1. Get projectId
const projectId = '853cd179149997582f1598415ec855f0';

// 2. Create wagmiConfig
/*const { chains, publicClient } = configureChains(
  [mainnet],
  [walletConnectProvider({ projectId }), publicProvider()],
);
*/
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const wagmiConfig = createConfig({
  //autoConnect: true,
  chains: [mainnet, sepolia], 
  transports: { 
    [mainnet.id]: http(), 
    [sepolia.id]: http(), 
  }, 
  /*connectors: [
    //new WalletConnectConnector({
      walletConnect({
        projectId,
      }),
    //new EIP6963Connector({ chains }),
    new injected({ chains, options: { shimDisconnect: true } }),
    new coinbaseWallet({
      chains,
      options: { appName: metadata.name },
      }),
  ], 
  */
  //publicClient,
  
});

// 3. Create modal
createWeb3Modal({ 
  wagmiConfig, 
  projectId, 
  //chains 
});

export function Web3Modal({ children }: any) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}


//Web3Modal config is not properly set up. install new additions and make sure #private type is expected