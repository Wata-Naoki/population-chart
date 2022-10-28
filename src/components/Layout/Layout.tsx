import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center min-w-full gap-8  m-0 overflow-scroll bg-white  grow'>
      {children}
    </div>
  );
};
