import React from 'react';
import { StyleProps } from '../../../types/types';

export const Layout: React.FC<StyleProps> = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center min-w-full pb-10 bg-white gap-y-10 lg:gap-y-2 2xl:gap-y-20 sm:pb-0 '>
      {children}
    </div>
  );
};
