'use client';
import React, { useState } from 'react';
import Form, { FormInputData } from '#/app/components/Form';
import useSWR, { mutate } from 'swr';
import {
  headerStyle,
  formContainerStyle,
  inputStyleSubmitted,
  contentInputStyleSubmitted,
  thumbsStyle,
  deleteBtnStyle,
  dateStyle,
} from 'styles/formStyles';
import SampleForm from '#/app/@sampleModal/sampleForm';
import SampleForm2 from '#/app/@sampleModal/sampleForm2';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface Page extends FormInputData {
  thumbsUp: number;
  thumbsDown: number;
}

const PageComponent: React.FC<{ params: { subCategorySlug: string } }> = ({
  params,
}) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [deletions, setDeletions] = useState<Page[]>([]);
  const { push } = useRouter();
  const apiUrl = process.env.POSTGRES_URL;

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .catch((err) => console.error('Error fetching data:', err));

  const handlePageSubmit = (newData: FormInputData): void => {
    setPages((prevData) => {
      const updatedPages = [
        ...prevData,
        {
          ...newData,
          thumbsUp: 0,
          thumbsDown: 0,
        },
      ];

      const sortedPages = sortPagesByTimestamp(updatedPages);
      localStorage.setItem('pages', JSON.stringify(sortedPages));
      return sortedPages;
    });

    mutate(apiUrl);
  };

  const sortPagesByTimestamp = (pagesArray: any) => {
    return [...pagesArray].sort((a, b) => b.id - a.id);
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

  const handleDelete = (pageId: number): void => {
    const timestamp = Date.now(); // Get the current timestamp

    const filteredPages = pages.filter(function (page) {
      return page.id !== pageId;
    });

    const deletedPage = pages.filter(function (page) {
      return page.id == pageId;
    });

    const pageWithTimestamp = {
      ...deletedPage[0],
      timestamp: timestamp,
    };
    localStorage.setItem('pages', JSON.stringify(filteredPages));
    setDeletions((prevDeletedPages) => [
      pageWithTimestamp,
      ...prevDeletedPages,
    ]);
  };

  const getUpperCase = (subCategorySlug: string) => {
    return subCategorySlug.charAt(0).toUpperCase() + subCategorySlug.slice(1);
  };

  const getDate = (pageId: number) => {
    const date = new Date(pageId);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
  useEffect(() => {
    const storedDeletions = localStorage.getItem('deletions') ?? '[]';

    if (JSON.parse(storedDeletions).length) {
      setDeletions(JSON.parse(storedDeletions));
    }

    if (storedDeletions)
      localStorage.setItem('deletions', JSON.stringify(storedDeletions));

    const storedPages = localStorage.getItem('pages') ?? '[]';

    if (storedPages) {
      setPages(JSON.parse(storedPages));
    }
  }, [params]);

  useEffect(() => {
    const storedDeletions = localStorage.getItem('deletions') ?? '[]';
    if (storedDeletions)
      localStorage.setItem('deletions', JSON.stringify(deletions));

    const storedPages = localStorage.getItem('pages') ?? '[]';
    if (storedPages) {
      setPages(JSON.parse(storedPages));
    }
  }, [deletions]);

  return (
    <div>
      {params.subCategorySlug === 'new' ? (
        <div>
          <div>
            <Form onSubmit={handlePageSubmit} />
          </div>
        </div>
      ) : params.subCategorySlug === 'updates' ? (
        <div>
          <h1 style={headerStyle}>{getUpperCase(params.subCategorySlug)}</h1>
          <div>
            <div>
              {pages.map((page) => (
                <div key={page.id}>
                  <div style={formContainerStyle}>
                    <input
                      type="text"
                      placeholder="id"
                      value={getDate(page.id)}
                      style={dateStyle}
                    />
                    <button
                      style={deleteBtnStyle}
                      onClick={() => handleDelete(page.id)}
                    >
                      Delete
                    </button>
                    <input
                      type="text"
                      placeholder="Title"
                      value={page.title}
                      style={inputStyleSubmitted}
                    />
                    <input
                      type="text"
                      placeholder="Content"
                      value={page.content}
                      style={contentInputStyleSubmitted}
                    />
                    <div className="columns-2">
                      <button
                        style={thumbsStyle}
                        onClick={() => handleThumbsUp(page.id)}
                      >
                        Thumbs Up
                      </button>
                      <button
                        style={thumbsStyle}
                        onClick={() => handleThumbsDown(page.id)}
                      >
                        Thumbs Down
                      </button>
                      <button style={thumbsStyle}>Comment</button>
                      <button style={thumbsStyle}>Add a file</button>
                    </div>
                  </div>
                </div>
              ))}
              <div style={formContainerStyle}>
                <SampleForm />
              </div>
              <div style={formContainerStyle}>
                <SampleForm2 />
              </div>
            </div>
          </div>
        </div>
      ) : params.subCategorySlug === 'deletions' ? (
        <div>
          <div>
            <h1 style={headerStyle}>{getUpperCase(params.subCategorySlug)}</h1>
            <div>
              {deletions.map((page) => (
                <div key={page.id}>
                  <div style={formContainerStyle}>
                    <input
                      type="text"
                      placeholder="id"
                      value={getDate(page.id)}
                      style={dateStyle}
                    />
                    <button
                      style={deleteBtnStyle}
                      onClick={() => handleDelete(page.id)}
                    >
                      Delete
                    </button>
                    <input
                      type="text"
                      placeholder="Title"
                      value={page.title}
                      style={inputStyleSubmitted}
                    />
                    <input
                      type="text"
                      placeholder="Content"
                      value={page.content}
                      style={contentInputStyleSubmitted}
                    />
                    <div className="columns-2">
                      <button
                        style={thumbsStyle}
                        onClick={() => handleThumbsUp(page.id)}
                      >
                        Thumbs Up
                      </button>
                      <button
                        style={thumbsStyle}
                        onClick={() => handleThumbsDown(page.id)}
                      >
                        Thumbs Down
                      </button>
                      <button style={thumbsStyle}>Comment</button>

                      <button style={thumbsStyle}>Add a file</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 style={headerStyle}>{getUpperCase(params.subCategorySlug)}</h1>
        </div>
      )}
    </div>
  );
};

export default React.memo(PageComponent);
