import React from 'react';

interface PageProps {
  title: string;
  id: number;
  content: string;
}

const Page: React.FC<PageProps> = ({ title, id, content }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{id}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Page;
