'use client';
import React, { useState, useEffect } from 'react';
import Header from '#/ui/header';
import { GlobalNav } from '#/ui/global-nav';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(delay);
  }, []);

  return isLoading ? (
    <div className="flex h-full items-center justify-center">
      <Image
        src="/preloader.svg"
        alt="preloader"
        width={300}
        height={300}
        style={{ display: 'flex', alignItems: 'center', height: '100vh' }}
      />
    </div>
  ) : (
    <div className="bg-slate-200 bg-[url('/grid.svg')]">
      <GlobalNav />
      <div className="mx-auto h-full bg-slate-200 py-20 pl-0 lg:py-0 lg:pl-56">
        <div className="rounded-lg">
          <Header />
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
