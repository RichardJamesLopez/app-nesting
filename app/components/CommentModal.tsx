'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FormInputData } from '#/app/components/Form';
import {
  formContainerStyle,
  inputStyleSubmitted,
  contentInputStyleSubmitted,
  formHeaderStyle,
} from 'styles/formStyles';
interface CommentModalProps {
  page: {
    content: string;
    id: number;
    title: string;
    thumbsUp: number;
    thumbsDown: number;
    comments: [];
  };
  onSubmit: () => void;
}

interface Page extends FormInputData {
  thumbsUp: number;
  thumbsDown: number;
  comments: [];
}

interface FormCommentData {
  id: number;
  content: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ onSubmit, page }) => {
  const [content, setContent] = useState('');
  const [pages, setPages] = useState<Page[]>([]);
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

  const handleClose = () => {
    onSubmit();
  };

  const handleSubmit = (event: React.FormEvent) => {
    const storedPages = localStorage.getItem('pages') ?? '[]';
    var pages = JSON.parse(storedPages);
    const filteredPage = pages.filter(function (item: any) {
      return item.id == page.id;
    });
    event.preventDefault();
    const newComment: FormCommentData = {
      id: Date.now(),
      content: content,
    };

    var pageIndex = pages.findIndex(
      (page: any) => page.id === filteredPage[0].id,
    );

    var updatedPage = {
      ...pages[pageIndex],
      comments: [...(pages[pageIndex].comments || []), newComment],
    };

    pages[pageIndex] = updatedPage;

    if (pageIndex !== -1) {
      pages[pageIndex] = updatedPage;
    } else {
      pages.push(updatedPage);
    }
    localStorage.setItem('pages', JSON.stringify(pages));

    setPages(pages);
    onSubmit();
    setContent('');
  };

  return (
    <form
      className="fixed inset-0 z-10 overflow-y-auto"
      id="error-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-black text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-3 sm:align-middle">
          <Image
            src="/close.png"
            alt="close"
            width={10}
            height={10}
            className="mb-2"
            onClick={handleClose}
          />
          <div className="sm:items-start">
            <div style={formContainerStyle}>
              <input
                type="text"
                placeholder="id"
                value={getDate(page.id)}
                style={formHeaderStyle}
              />

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
            </div>
            <textarea
              placeholder="Post your reply"
              value={content}
              style={contentInputStyleSubmitted}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
            />
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CommentModal;
