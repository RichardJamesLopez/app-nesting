'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FormInputData } from '#/app/components/Form';
import { thumbsStyle } from 'styles/formStyles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import UploadIcon from '@mui/icons-material/Upload';
interface ActionButtonsProps {
  page: {
    content: string;
    _id: string;
    id: number;
    title: string;
    thumbsUp: [];
    thumbsDown: [];
    comments: [];
  };
  onSubmit: (page: Page) => void;
}
interface Page extends FormInputData {
  content: string;
  id: number;
  _id: string;
  title: string;
  thumbsUp: [];
  thumbsDown: number;
  comments: [];
}

const thumbsUpDown = async (
  postId: string,
  action: string,
  userAddress: string,
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/thumbsupdown`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: postId,
          action: action,
          userAddress: userAddress,
        }),
      },
    );
  } catch (error) {
    console.error('ThumbsUp post Failed!', error);
  }
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ page, onSubmit }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const handleThumbsUpDown = (postId: string, action: string): void => {
    const userAddress = localStorage.getItem('userAddress') ?? '';
    thumbsUpDown(postId, action, userAddress);
    // setPages((prevPages) =>
    //   prevPages.map((page) =>
    //     page._id === id
    //       ? { ...page, thumbsUp: (page.thumbsUp || 0) + 1 }
    //       : page,
    //   ),
    // );
  };

  const handleModal = (page: any) => {
    onSubmit(page);
  };

  return (
    <div className="flex columns-2">
      <button
        style={thumbsStyle}
        onClick={() => handleThumbsUpDown(page?._id, 'thumbsUp')}
      >
        <ThumbUpIcon />
        <span className="ml-1">
          {page?.thumbsUp?.length ? page?.thumbsUp.length : ''}
        </span>
      </button>
      <button
        style={thumbsStyle}
        onClick={() => handleThumbsUpDown(page?._id, 'thumbsDown')}
      >
        <ThumbDownIcon />
        <span className="ml-1">
          {page?.thumbsDown?.length ? page?.thumbsDown.length : ''}
        </span>
      </button>
      <button onClick={() => handleModal(page)} style={thumbsStyle}>
        <ChatBubbleIcon />
        <span className="ml-1">
          {page?.comments?.length ? page?.comments.length : ''}
        </span>
      </button>
      <button style={thumbsStyle}>
        <UploadIcon />
      </button>
    </div>
  );
};
export default ActionButtons;
