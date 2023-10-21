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
}

interface Page extends FormInputData {
  content: string;
  id: number;
  title: string;
  thumbsUp: number;
  thumbsDown: number;
  comments: [];
}

const Post: React.FC<CommentModalProps> = ({ page }) => {
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

  return (
    <div>
      <input
        type="text"
        placeholder="id"
        value={getDate(page?.id)}
        style={formHeaderStyle}
      />

      <input
        type="text"
        placeholder="Title"
        value={page?.title}
        style={inputStyleSubmitted}
      />
      <input
        type="text"
        placeholder="Content"
        value={page?.content}
        style={contentInputStyleSubmitted}
      />
    </div>
  );
};
export default Post;
