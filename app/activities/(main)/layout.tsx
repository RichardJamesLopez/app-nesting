import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <>
    <div>
      <div className="rounded-lg bg-white p-3.5 lg:p-6">{children}</div>
      </div>
  </>
  );
}

//const categories = await getCategories();