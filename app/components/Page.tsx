'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FormInputData } from '#/app/components/Form';
import { inputStyleSubmitted, contentStyleSubmitted } from 'styles/formStyles';
interface CommentModalProps {
  page: {
    content: string;
    id: number;
    _id: string;
    title: string;
    thumbsUp: [];
    thumbsDown: [];
    date: number;
    comments: [];
  };
}

interface Page extends FormInputData {
  content: string;
  id: number;
  _id: string;
  title: string;
  thumbsUp: [];
  thumbsDown: [];
  date: number;
  comments: [];
}

const Post: React.FC<CommentModalProps> = ({ page }) => {
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

  const shortenedAddress = (address: string) => {
    return address.slice(0, 4) + '...' + address.slice(-6);
  };

  return (
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
      <div style={inputStyleSubmitted}>{page.title}</div>
      <div style={contentStyleSubmitted}>{page.content}</div>
    </div>
  );
};
export default Post;
