'use client';
import { getCategories, getCategory } from '#/app/api/categories/getCategories';
import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import Form, { FormInputData } from '#/app/components/Form';
import { useEffect, useState } from 'react';

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
    // Handle the form data when the form is submitted.
    // 'formData' will be an object containing the form data.
    console.log(formData);
  };
  /*const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('REACT_APP_API_URL')
      .then(response => response.json())
      .then(data => {
        console.log(data); // log the entire data object
        setTitle(data.title); // set the title field
        setContent(data.content); // set the content field
      })
      .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array makes this run once on mount
  */
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

/*import { getCategories, getCategory } from '#/app/api/categories/getCategories';
import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import Form from "#/app/components/Form";

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
