'use client';
import React, { useState } from 'react';
import Link from 'next/link';
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
  formHeaderStyle,
} from 'styles/formStyles';
import SampleForm from '#/app/@sampleModal/sampleForm';
import SampleForm2 from '#/app/@sampleModal/sampleForm2';
import CommentModal from '#/app/components/CommentModal';
import Post from '#/app/components/Page';
import ActionButtons from '#/app/components/ActionButtons';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Page extends FormInputData {
  content: string;
  id: number;
  title: string;
  thumbsUp: number;
  thumbsDown: number;
  comments: [];
}

const PageComponent: React.FC<{
  params: { subCategorySlug: string; searchParams: any };
}> = ({ params }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [deletions, setDeletions] = useState<Page[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState<any>({});

  const searchParams = useSearchParams();
  const commentId = searchParams?.get('id');
  const commentPage: any = pages.filter(function (page) {
    return page.id == Number(commentId);
  })[0];

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

  const handlePageCommentSubmit = () => {
    setShowModal(false);
  };

  const sortPagesByTimestamp = (pagesArray: any) => {
    return [...pagesArray].sort((a, b) => b.id - a.id);
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

  const handleModal = (page: any): void => {
    setShowModal(true);
    setPage(page);
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
      {params.subCategorySlug === 'new' && (
        <div>
          <h1 style={headerStyle}>{getUpperCase(params.subCategorySlug)}</h1>
          <div>
            <Form onSubmit={handlePageSubmit} />
          </div>
        </div>
      )}

      {params.subCategorySlug === 'updates' && (
        <div>
          <h1 style={headerStyle}>{getUpperCase(params.subCategorySlug)}</h1>
          <div>
            {pages.map((page) => (
              <div key={page.id} style={formContainerStyle}>
                <Link href={`/layouts/activities/comments?id=${page.id}`}>
                  <input
                    type="text"
                    placeholder="id"
                    value={getDate(page.id)}
                    className="cursor-pointer"
                    style={dateStyle}
                  />
                </Link>
                <button
                  style={deleteBtnStyle}
                  onClick={() => handleDelete(page.id)}
                >
                  <Image
                    src="/delete.png"
                    alt="Delete"
                    width={20}
                    height={20}
                    className="ml-4"
                  />
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
                <ActionButtons onSubmit={() => handleModal(page)} page={page} />
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
      )}

      {params.subCategorySlug === 'deletions' && (
        <div>
          <div>
            <h1 style={headerStyle}>{getUpperCase(params.subCategorySlug)}</h1>
            <div>
              {deletions.map((page) => (
                <div key={page.id}>
                  <div style={formContainerStyle}>
                    <Post page={page} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {params.subCategorySlug === 'comments' && (
        <div>
          <h1 style={headerStyle}>{getUpperCase(params.subCategorySlug)}</h1>
          <div>
            <Post page={commentPage} />
            <ActionButtons
              onSubmit={() => handleModal(commentPage)}
              page={commentPage}
            />
          </div>
          {commentPage?.comments?.length
            ? commentPage?.comments.map((comment: any) => (
                <div key={page.id}>
                  <div className="flex columns-2">
                    <textarea
                      placeholder="Content"
                      value={comment.content} // using state variable
                      style={contentInputStyleSubmitted}
                      rows={10} // Number of visible rows
                    />
                  </div>
                </div>
              ))
            : ''}
        </div>
      )}
      {showModal && (
        <CommentModal page={page} onSubmit={handlePageCommentSubmit} />
      )}
    </div>
  );
};

export default React.memo(PageComponent);
