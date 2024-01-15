'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FormInputData } from '#/app/components/Form';
import CloseIcon from '@mui/icons-material/Close';
import {
  formContainerStyle,
  inputStyleSubmitted,
  contentInputStyleSubmitted,
  formHeaderStyle,
  contentInput,
  commentTextArea,
} from 'styles/formStyles';
import { Divider } from '@mui/material';
interface CommentModalProps {
  page: {
    _id: string;
    content: string;
    id: number;
    title: string;
    thumbsUp: number;
    thumbsDown: number;
    comments: [];
    date: number;
  };
  onSubmit: () => void;
}

interface Page extends FormInputData {
  thumbsUp: number;
  thumbsDown: number;
  comments: [];
}

interface FormCommentData {
  date: number;
  content: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ onSubmit, page }) => {
  const [content, setContent] = useState('');
  const [pages, setPages] = useState<Page[]>([]);

  const handleClose = () => {
    onSubmit();
  };

  const shortenedAddress = (address: string) => {
    return address.slice(0, 4) + '...' + address.slice(-6);
  };

  const timeAgo = (timestamp: any) => {
    const inputDate = new Date(timestamp);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));

    if (minutes < 1) {
      return 'Just now';
    } else if (minutes === 1) {
      return '1 minute ago';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  const addComment = async (id: string, comments: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/create`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: id,
            comments: comments,
          }),
        },
      );
    } catch (error) {
      console.error('Create comment Failed!', error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newComment: FormCommentData = {
      date: Date.now(),
      content: content,
    };
    var updatedComment = [...(page.comments || []), newComment];
    addComment(page._id, updatedComment);

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
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-3 sm:align-middle">
          <div className="mb-2 flex justify-between">
            <CloseIcon onClick={handleClose} className="cursor-pointer" />
            <span onClick={handleClose} className="cursor-pointer">
              Drafts
            </span>
          </div>
          <div className="sm:items-start">
            <div>
              <div className="flex">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  style={{
                    borderRadius: '50%',
                    marginRight: '10px',
                  }}
                />

                <span className="flex	items-center">
                  {shortenedAddress(localStorage.getItem('userAddress') ?? '')}
                  <span className="mx-1"> · </span>
                  {timeAgo(page.date)}
                </span>
              </div>
              <div className="my-2 flex text-slate-800">
                <div>
                  <div className="h-100 mx-5 h-full border-2 border-l	 border-gray-400"></div>
                </div>
                <div>
                  <div className="font-bold">{page.title}</div>
                  <div>{page.content}</div>
                </div>
              </div>
            </div>
            <div className="flex" style={commentTextArea}>
              <Image
                src="/avatar.png"
                alt="avatar"
                width={40}
                height={40}
                style={{
                  borderRadius: '50%',
                  marginRight: '10px',
                  width: '40px',
                  height: '40px',
                }}
              />
              <textarea
                placeholder="Post your reply"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                style={{ border: 'none', width: '100%' }}
              />
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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
