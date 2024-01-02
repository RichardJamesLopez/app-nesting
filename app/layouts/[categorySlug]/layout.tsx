// layout.tsx
import { getCategories, getCategory } from '#/app/api/categories/getCategories';
import { TabGroup } from '#/ui/tab-group';
import FormClientComponent from 'app/layouts/formClientComponent';
import { GlobalNav } from '#/ui/global-nav';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { categorySlug: string };
}) {
  const category = await getCategory({ slug: params.categorySlug });
  const categories = await getCategories({ parent: params.categorySlug });

  return (
    //<GlobalNav />
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/layouts/${category.slug}`}
          items={[
            
            ...categories.map((x) => ({
              text: x.name,
              slug: x.slug,
            })),
          ]}
        />
      </div>

      <div>{children}</div>
    </div>
  );
}

//<FormClientComponent /> was in line 38 of this file

/*
//'use client';
import { getCategories, getCategory } from '#/app/api/categories/getCategories';
import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import Form, { FormInputData } from '#/app/components/Form';
//import { useEffect, useState } from 'react';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { categorySlug: string };
}) {
  const category = await getCategory({ slug: params.categorySlug });
  const categories = await getCategories({ parent: params.categorySlug });

  const handlePageSubmit = (formData: FormInputData) => {
    // Handle the form data when  form is submitted.
    // 'formData' will be an object containing the form data.
    console.log(formData);
  };
  /*const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('API_URL')
      .then(response => response.json())
      .then(data => {
        console.log(data); // log the entire data object
        setTitle(data.title); // set the title field
        setContent(data.content); // set the content field
      })
      .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array makes this run once on mount
  */

/*
  //adjust component architecture here
  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/layouts/${category.slug}`}
          items={[
            {
              text: 'All',
            },
            ...categories.map((x) => ({
              text: x.name,
              slug: x.slug,
            })),
          ]}
        />

        <div className="self-start">
          <ClickCounter />
        </div>
      </div>

      <Form onSubmit={handlePageSubmit} />
      <div>{children}</div>
    </div>
  );
}
*/
