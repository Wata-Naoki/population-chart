import React from 'react';

type TitleProps = {
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ children }) => {
  return <div className='sm:text-4xl text-2xl font-bold text-center bg-zinc-300	py-4 w-full'>{children}</div>;
};
