import React from 'react';
import { LayoutProps } from '../../types/types';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center min-w-full pb-10 bg-white gap-y-10 2xl:gap-y-20 sm:pb-0 '>
      {children}
    </div>
  );
};
