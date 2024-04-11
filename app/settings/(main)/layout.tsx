import { tabs } from '#/lib/menus';
import Link from 'next/link';
import React from 'react';
import { formHeaderStyle, sloganContainer } from 'styles/formStyles';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white p-3.5 lg:p-6">
      <div style={sloganContainer}>
        <h1 className="text-left text-4xl font-bold text-white">Settings</h1>
      </div>
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
        {children} 
      </div>
    </div>
  );
}