import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface Page {
  id: number;
  title: string;
  content: string;
  thumbsUp?: number; // Add the thumbsUp property with an optional number type
  thumbsDown?: number; // Add the thumbsDown property with an optional number type
}

interface PageFormProps {
  onSubmit: (newPage: Page) => void;
}

const PageForm: React.FC<PageFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate if the title field is not empty
    if (title.trim() === '') {
      setIsTitleValid(false);
      return;
    }

    // Submit the form if all validations pass
    onSubmit({ id: Date.now(), title, content });
    setTitle('');
    setContent('');
    setIsTitleValid(true);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
    setIsTitleValid(true); // Reset the validation state when the field value changes
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setContent(e.target.value);
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: 'blue',
    borderRadius: '10px',
    padding: '1.5rem 1rem',
    width: '100%',
    margin: '4px',
  };
  const inputStyle = {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '10px',
    padding: '1.5rem 1rem',
    width: '100%',
    margin: '4px',
  };

  return (
    <div>
      <h2 className=" font-large w-8/12 text-2xl text-blue-400">
        Update Locally
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className={!isTitleValid ? 'invalid' : ''}
            style={inputStyle}
          />
          {!isTitleValid && <p className="error">Please enter a valid title</p>}
        </div>
        <div>
          <input
            placeholder="Content"
            value={content}
            onChange={handleContentChange}
            style={inputStyle}
          ></input>
        </div>
        <div>
          <button type="submit" style={buttonStyle}>
            Add a New Update
          </button>
        </div>
      </form>
      <div className="space-y-4">
        <h2 className=" font-large w-8/12 text-2xl text-blue-400">
          Latest Updates
        </h2>
        <div className="space-y-4"></div>
      </div>
    </div>
  );
};

export default PageForm;
