import React from 'react';
import { SectionLayoutProps } from '../../types/types';

export const SectionLayout: React.FC<SectionLayoutProps> = ({ children, variant = 'primary' }) => {
  return (
    <div
      className={`${
        variant === 'primary'
          ? 'border my-2 mx-6 py-2 px-5 sm:px-4 rounded-md shadow 2xl:max-w-screen-2xl'
          : variant === 'sub'
          ? 'flex flex-col items-center justify-center mx-4 pr-6 w-screen'
          : ''
      }`}
    >
      {children}
    </div>
  );
};
