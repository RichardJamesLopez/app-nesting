'use client';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { loginStyle } from 'styles/formStyles';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { getBaseUrl } from '#/lib/getBaseUrl';
export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const router = useRouter();

  const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    padding: '5px',
    textTransform: 'none',
  }));

  useEffect(() => {
    const registerUser = async () => {
      if (address) {
        try {
          const response = await fetch(
            `https://app-nesting.vercel.app/api/users/registration`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                address: address,
              }),
            },
          );
          const data = await response.json();
          if (response.ok) {
            router.push('/dashboard');
          } else {
            console.log(data.error);
          }
        } catch (error) {
          console.error('Signup Failed!', error);
        }
      }
    };

    registerUser();
  }, [address, router]);

  return (
    <div>
      <div style={loginStyle}>
        <div className="flex justify-between">
          <div className="flex h-6 text-white">
            <Image src="/s-logo.svg" alt="s-logo" width={100} height={100} />
            <p className="text-xl font-bold">Ourmada</p>
          </div>
          <div>
            <div className="rounded-md bg-white p-2">
              <div>
                <StyledButton onClick={() => open()}>
                  <p>Click here to connect your wallet</p>
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-4/5 items-center">
          <div className="m-auto">
            <div className="flex items-center justify-center">
              <Image
                src="/home-logo.svg"
                alt="home-logo"
                width={300}
                height={300}
              />
            </div>
            <div className="mt-6 flex items-center justify-center">
              <Image
                src="/home-logo-text.svg"
                alt="home-logo-text"
                width={300}
                height={300}
              />
            </div>
            <p className="m-auto mt-4 w-6/12 text-center text-white">
              Ourmada is a modular platform for the web3 tools you need. All
              updates, feedback and community member activities are
              transparently displayed in each of the DAO instances.
            </p>
            <p className="mt-4 text-center text-white">
              Enjoy Ourmada for the fastest way to get succinct, contextual, and
              interactive updates.
            </p>
            <p className="mt-4 text-center font-bold text-white">
              Ourmada ships tools for DAOs
            </p>
            <div>
              <div className="m-auto mt-8 w-28 rounded-md bg-white p-2">
                <div className="flex items-center justify-center">
                  <StyledButton onClick={() => open()}>
                    <p>Get Started</p>
                  </StyledButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
