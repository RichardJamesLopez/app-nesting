import { tabs } from '#/lib/menus';
import Link from 'next/link';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <nav className="space-y-1 py-5 pl-2">
          {tabs.map((section) => {
            return (
              <div key={section.name} className="flex justify-between">
                <div className="w-[93%] space-y-1">
                  <Link
                    href={`/${section.slug}`}
                    className="flex rounded-md px-3 py-4 text-base font-medium"
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
  );
}
