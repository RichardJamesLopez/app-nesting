import { getCategories, getCategory } from '#/app/api/categories/getCategories';
import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import React from 'react';
import { GlobalNav } from '#/ui/global-nav';
import { Boundary } from '#/ui/boundary';

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
    <div className="flex ">
      <TabGroup
        path="/layouts"
        items={[
          {
            text: 'Home',
          },
          ...categories.map((x) => ({
            text: x.name,
            slug: x.slug,
          })),
        ]}
      />
    <div>
      <Boundary>{children}</Boundary>
    </div>
    </div>
  );
  }