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
  formHeaderStyle,
} from 'styles/formStyles';
import { Boundary } from '#/ui/boundary';
import SampleForm from '#/app/@sampleModal/sampleForm';
import SampleForm2 from '#/app/@sampleModal/sampleForm2';

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
  //insert modal logic for parallel routing in this page
  return (
    <div>
      <Form onSubmit={handlePageSubmit} />
      <div>
        <h1
          style={headerStyle} // Use the imported headerStyle
        >
          {' '}
          Updates{' '}
        </h1>
      </div>
      <Boundary>
        {pages.map((page) => (
          <div key={page.id}>
            <div style={formContainerStyle}>
              <input
                type="text"
                placeholder="id"
                value={page.id}
                style={formHeaderStyle} // Use the imported inputStyle
              />
              <input
                type="text"
                placeholder="Title"
                value={page.title}
                style={inputStyleSubmitted} // Use the imported inputStyle
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
                <button
                  style={thumbsStyle} // Use the imported thumbsStyle
                >
                  Comment
                </button>
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
      </Boundary>
    </div>
  );
}
