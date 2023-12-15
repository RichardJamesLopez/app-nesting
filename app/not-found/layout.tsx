import { getCategories } from '#/app/api/categories/getCategories';
import { ClickCounter } from '#/ui/click-counter';
import { GlobalNav } from '#/ui/global-nav';
import { TabGroup } from '#/ui/tab-group';
import React from 'react';

export const metadata = {
  title: 'Comments',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <>
      <GlobalNav />

      <div className="lg:pl-56">
        <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
          <div className=" rounded-lg  p-px shadow-lg">
            <div className="rounded-lg bg-white p-3.5 lg:p-6">
              <div className="space-y-9">
                <div className="flex justify-between">
                  <TabGroup
                    path="/not-found"
                    items={[
                      {
                        text: 'Home',
                      },
                      ...categories.map((x) => ({
                        text: x.name,
                        slug: x.slug,
                      })),
                      {
                        text: 'Category That Does Not Exist',
                        slug: 'does-not-exist',
                      },
                    ]}
                  />

                  <div className="self-start">
                    <ClickCounter />
                  </div>
                </div>

                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
