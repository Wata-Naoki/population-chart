import React from 'react';
import { StyleProps } from '../../types/types';

export const Title: React.FC<StyleProps> = ({ children }) => {
  return (
    <div className='sm:text-4xl text-2xl font-bold text-center bg-neutral-200 text-zinc-500	py-4 w-full'>{children}</div>
  );
};
