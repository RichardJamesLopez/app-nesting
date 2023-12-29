import { GlobalNav } from '#/ui/global-nav';
import Header from '#/ui/header';
import React from 'react';

export const metadata = {
  title: 'Settings',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalNav />
      <div className="mx-auto h-full bg-slate-200 py-20 pl-0 lg:py-0 lg:pl-56">
        <div className="rounded-lg">
          <Header />
        </div>

        <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
          <div className=" rounded-lg  p-px shadow-lg">
            <div className="rounded-lg bg-white p-3.5 lg:p-6">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
