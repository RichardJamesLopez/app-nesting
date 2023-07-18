'use client';

import React, { useEffect, useState } from 'react';
import PageForm, { Page } from '#/app/components/PageForm';
import { getCategory } from '#/app/api/categories/getCategories';
import { SkeletonCard } from '#/ui/skeleton-card';

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

  return (
    <div>
      {category && (
        <div className="">
          <PageForm onSubmit={handlePageSubmit} />

          <div className="lg:grid-cols- grid grid-cols-1 gap-6">
            {pages.length > 0
              ? pages.map((page) => (
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
              : Array.from({ length: category.count }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface Category {
  name: string;
  count: number;
  // Add more properties as needed
}
