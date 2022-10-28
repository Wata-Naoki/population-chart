import React from 'react';

type SectionTitleProps = {
  children: React.ReactNode;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return <div className='text-left text-xl w-full ml-6 mt-5 text-neutral-500'>{children}</div>;
};
