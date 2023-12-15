import { GlobalNav } from '#/ui/global-nav';
import React from 'react';

export const metadata = {
  title: 'Route Groups',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalNav />

      <div className="lg:pl-56">
        <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
          <div className=" rounded-lg  p-px shadow-lg">
            <div className="rounded-lg bg-white p-3.5 lg:p-6">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
