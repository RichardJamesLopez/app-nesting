'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { contentInputStyleSubmitted } from 'styles/formStyles';

interface FormInputData {
  id: number;
  title: string;
  content: string;
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
    margin: '4px',
  };
  const inputStyle = {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '10px',
    padding: '1rem',
    width: '100%',
    margin: '4px',
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formInputData: FormInputData = {
      id: Date.now(),
      title: title,
      content: content,
    };
    console.log('formInputData', formInputData);

    onSubmit(formInputData); // Use onSubmit here instead of directly calling the fetch function

    push('/layouts/activities/updates');
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
        style={contentInputStyleSubmitted}
        onChange={(e) => setContent(e.target.value)}
        rows={10} // Number of visible rows
      />

      <button
        type="submit"
        style={buttonStyle}
        className="rounded-lg bg-vercel-blue px-3 py-1 text-sm text-gray-100 hover:bg-gray-500 hover:text-white"
      >
        Add a new update here
      </button>
    </form>
  );
};
export default Form;
export type { FormInputData };
