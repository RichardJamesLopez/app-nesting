import { Layout } from '#/ui/page-directory/layout';
import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';
import 'styles/globals.css';
import Header from '#/ui/header';
import { GlobalNav } from '#/ui/global-nav';
import Image from 'next/image';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
require('dotenv').config();

const primaryFont = Inter({
  subsets: ['latin'],
  variable: '--primary-font',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${primaryFont.variable} font-sans`}>
      <GlobalNav />
      <div className="mx-auto h-full bg-slate-200 py-20 pl-0 lg:py-0 lg:pl-56">
      <div className="rounded-lg">
          
    </div>
      
      <div className="mx-auto max-w-4xl space-y-2 px-2 pt-20 lg:px-8 lg:py-8">
      <div className="rounded-lg p-px shadow-lg">
            <div className="rounded-lg bg-white p-3.5 lg:p-10">
            <Component  {...pageProps} />
            </div>
          </div>
        </div>
      </div>
      
      
    </main>
  );
}
