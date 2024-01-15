'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { contentInput } from 'styles/formStyles';
import Notiflix from 'notiflix';

interface FormInputData {
  userAddress: string;
  title: string;
  content: string;
  date: number;
}

interface FormProps {
  onSubmit: (data: FormInputData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  // Modify this line to accept FormProps and destructure onSubmit from it
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { push } = useRouter();
  const buttonStyle = {
    borderRadius: '10px',
    padding: '1rem',
    width: '100%',
  };
  const inputStyle = {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '10px',
    padding: '1rem',
    width: '100%',
    marginBottom: '4px',
  };
  const createComment = async (newPost: any) => {
    newPost.deletion = false;
    newPost.thumbsUp = [];
    newPost.thumbsDown = [];
    newPost.comments = [];
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();

      Notiflix.Notify.init({
        position: 'right-bottom',
      });
      Notiflix.Notify.success(data.message);

      return data;
    } catch (error) {
      console.error('Create comment Failed!', error);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userAddress = localStorage.getItem('userAddress') ?? '';

    const formInputData: FormInputData = {
      userAddress: userAddress,
      title: title,
      content: content,
      date: Date.now(),
    };
    const response = createComment(formInputData);
    onSubmit(await response);

    push('/activities/activities/updates');
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title} // using state variable
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Content"
        defaultValue={content} // using state variable
        style={contentInput}
        onChange={(e) => setContent(e.target.value)}
        rows={10} // Number of visible rows
      />

      <button
        type="submit"
        style={buttonStyle}
        className="bg-vercel-blue rounded-lg px-3 py-1 text-sm text-gray-100 hover:bg-gray-500 hover:text-white"
      >
        Add a new update here
      </button>
    </form>
  );
};
export default Form;
export type { FormInputData };
