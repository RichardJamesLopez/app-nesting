import { tabs } from '#/lib/menus';
import Link from 'next/link';
import React from 'react';
import { formHeaderStyle } from 'styles/formStyles';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white p-3.5 lg:p-6">
      <h1 style={formHeaderStyle}>Settings</h1>
  
    <div className="space-y-9">
      <div className="flex justify-between">
        <nav className="space-y-1 py-5 pl-2">
          {tabs.map((section) => {
            return (
              <div key={section.name} className="flex justify-between">
                <div className="w-[100%] space-y-0.5">
                  <Link
                    href={`/${section.slug}`}
                    className="flex rounded-lg px-4 py-4 text-base font-medium"
                  >
                    <span className="pl-2">{section.name}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
      </div>
    </div>
  );
}


/*
      {children}
*/