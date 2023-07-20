'use client';
import React, { useState } from 'react';
import Form, { FormInputData } from '#/app/components/Form';
import useSWR, { mutate } from 'swr';

interface Page extends FormInputData {
  thumbsUp: number;
  thumbsDown: number;
}
export default function Page({
  params,
}: {
  params: { subCategorySlug: string };
}): JSX.Element {
  const [pages, setPages] = useState<Page[]>([]);

  const apiUrl = process.env.POSTGRES_URL;

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .catch((err) => console.error('Error fetching data:', err));

  const { data: apiData, error } = useSWR(apiUrl, fetcher, {
    shouldRetryOnError: false,
    revalidateOnMount: false,
  });

  const handlePageSubmit = (newData: FormInputData): void => {
    setPages((prevData) => [
      ...prevData,
      {
        ...newData,
        thumbsUp: 0, // Initialize thumbsUp for the new Page
        thumbsDown: 0, // Initialize thumbsDown for the new Page
      },
    ]);
    mutate(apiUrl); // If you want to re-fetch the data when a new page is added
  };

  const handleThumbsUp = (pageId: number): void => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? { ...page, thumbsUp: (page.thumbsUp || 0) + 1 }
          : page,
      ),
    );
  };

  const handleThumbsDown = (pageId: number): void => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? { ...page, thumbsDown: (page.thumbsDown || 0) + 1 }
          : page,
      ),
    );
  };

  return (
    <div>
      <div className="lg:grid-cols- grid grid-cols-1 gap-6">
        <div className="rounded-md bg-gray-100 p-4">
          {/* Display the API output here */}
          <h2>API Output:</h2>
          {error && <div>Error: {error.message}</div>}
          {!apiData ? (
            <div>Loading...</div>
          ) : (
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          )}
        </div>
        <Form onSubmit={handlePageSubmit} />
        {pages.map((page) => (
          <div key={page.id}>
            <h3>{page.title}</h3>
            <button onClick={() => handleThumbsUp(page.id)}>Thumbs Up</button>
            <button onClick={() => handleThumbsDown(page.id)}>
              Thumbs Down
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
import React, { useEffect, useState } from 'react';
import Form from '#/app/components/Form';

export default function Page() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('ep-summer-darkness-477684-pooler.us-east-1.postgres.vercel-storage.com');
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="lg:grid-cols- grid grid-cols-1 gap-6">
        {apiData && (
          <div className="rounded-md bg-gray-100 p-4">
            {/*Display the API output here
          }
            <h2>API Output:</h2>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        )}
        <Form />
      </div>
    </div>
  );
}

*/

/*
export default function Page({
  params,
}: {
  params: { subCategorySlug: string };
}): JSX.Element {
  const [category, setCategory] = useState<Category | null>(null);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const fetchData = () => {
      getCategory({ slug: params.subCategorySlug })
        .then((fetchedCategory) => {
          setCategory(fetchedCategory);
        })
        .catch((error) => {
          console.error('Error fetching category:', error);
        });
    };

    fetchData();
  }, [params.subCategorySlug]);

  const handlePageSubmit = (newPage: Page): void => {
    setPages((prevPages) => [...prevPages, newPage]);
  };

  const handleThumbsUp = (pageId: number): void => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? { ...page, thumbsUp: (page.thumbsUp || 0) + 1 }
          : page,
      ),
    );
  };

  const handleThumbsDown = (pageId: number): void => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? { ...page, thumbsDown: (page.thumbsDown || 0) + 1 }
          : page,
      ),
    );
  };
*/
/*
<div>
      {category && (
        <div className="">
          <PageForm onSubmit={handlePageSubmit} />

          <div className="lg:grid-cols- grid grid-cols-1 gap-6">
            {pages.length > 0 ? (
              pages.map((page) => (
                <div key={page.id} className="rounded-md bg-gray-100 p-4">
                  <h2 className="text-xl font-medium">{page.title}</h2>
                  <p className="mt-2">{page.content}</p>
                  <div className="mt-2 flex">
                    <button
                      className="mr-2 rounded-md bg-green-400 px-2 py-1 text-white"
                      onClick={() => handleThumbsUp(page.id)}
                    >
                      Like ({page.thumbsUp || 0})
                    </button>
                    <button
                      className="rounded-md bg-red-400 px-2 py-1 text-white"
                      onClick={() => handleThumbsDown(page.id)}
                    >
                      Dislike ({page.thumbsDown || 0})
                    </button>
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: category.count }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            )}

</div>
*/
