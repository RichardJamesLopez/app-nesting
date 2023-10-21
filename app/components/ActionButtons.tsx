'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FormInputData } from '#/app/components/Form';
import { thumbsStyle } from 'styles/formStyles';

interface ActionButtonsProps {
  page: {
    content: string;
    id: number;
    title: string;
    thumbsUp: number;
    thumbsDown: number;
    comments: [];
  };
  onSubmit: (page: Page) => void;
}
interface Page extends FormInputData {
  content: string;
  id: number;
  title: string;
  thumbsUp: number;
  thumbsDown: number;
  comments: [];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ page, onSubmit }) => {
  const [pages, setPages] = useState<Page[]>([]);
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

  const handleModal = (page: any) => {
    onSubmit(page);
  };

  return (
    <div className="flex columns-2">
      <button style={thumbsStyle} onClick={() => handleThumbsUp(page?.id)}>
        <Image src="/thumb-up.png" alt="Thumb Up" width={20} height={20} />
      </button>
      <button style={thumbsStyle} onClick={() => handleThumbsDown(page?.id)}>
        <Image src="/thumb-down.png" alt="Thumb Down" width={20} height={20} />
      </button>
      <button
        onClick={() => handleModal(page)}
        style={thumbsStyle}
        className="flex"
      >
        <Image src="/comments.png" alt="Comments" width={20} height={20} />
        <span className="ml-4">
          {page?.comments?.length ? page?.comments.length : ''}
        </span>
      </button>
      <button style={thumbsStyle}>
        <Image src="/upload.png" alt="Upload" width={20} height={20} />
      </button>
    </div>
  );
};
export default ActionButtons;
