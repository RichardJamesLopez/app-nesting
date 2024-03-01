import { Layout } from '#/ui/page-directory/layout';
import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';
import 'styles/globals.css';
import Header from '#/ui/header';
import { GlobalNav } from '#/ui/global-nav';
import Image from 'next/image';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
require('dotenv').config();


// Using next/font instead of a manual setup, we get:
// - significantly easier setup
// - automatic best font practices
// - reduced layout shift
// - no network requests from the browser
const primaryFont = Inter({
  subsets: ['latin'],
  variable: '--primary-font',
});



export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${primaryFont.variable} font-sans`}>
      <div className="flex h-full items-center justify-center">
    
    </div>
      
      <div className="bg-slate-200 bg-[url('/grid.svg')]">
        <GlobalNav />
        <div className="mx-auto bg-white h-full white py-20 pl-0 lg:py-2 lg:pl-56">
          <div className="rounded-lg m-10" >
          <Component {...pageProps} />
          </div>
        </div>
      </div>
      
      
    </main>
  );
}
