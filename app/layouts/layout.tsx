import { getCategories, getCategory } from '#/app/api/categories/getCategories';
//import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import React from 'react';
import { GlobalNav } from '#/ui/global-nav';
import '#/styles/globals.css';
//import { Boundary } from '#/ui/boundary';
import { AddressBar } from '#/ui/address-bar';
import Byline from '#/ui/byline';

export const metadata = {
  title: 'Ourmada',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en" className="[color-scheme:light]">
      <body className= "overflow-y-scroll">
        <GlobalNav />
        
        <div className="lg:pl-72">
          <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className= "rounded-lg p-px shadow-lg">
              
            </div>

            <div className=" rounded-lg  p-px shadow-lg">
              <div className="rounded-lg p-3.5 lg:p-6">{children}</div>
            </div>
            <Byline className="fixed sm:hidden" />
          </div>
        </div>
      </body>
    </html>
  );
  }