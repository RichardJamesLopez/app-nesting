'use client';

import React, { useState } from 'react';
//import styles from '#/styles/globals.css';

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

  const buttonStyle = {
    backgroundColor: 'white',
    color: 'blue',
    borderRadius: '10px',
    padding: '1.5rem 1.5rem',
    width: '100%',
    margin: '4px',
  };
  const inputStyle = {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '10px',
    padding: '1.5rem 1.5rem',
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

    onSubmit(formInputData); // Use onSubmit here instead of directly calling the fetch function

    setTitle('');
    setContent('');
  };

  return (
    //...
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title} // using state variable
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Content"
        value={content} // using state variable
        onChange={(e) => setContent(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        add a new update here
      </button>
    </form>
  );
};
export default Form;
export type { FormInputData };
