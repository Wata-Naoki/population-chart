import React from 'react';
import { SectionTitleProps } from '../../types/types';

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, variant = 'primary' }) => {
  return (
    <div
      className={`${
        variant === 'primary'
          ? ' text-left text-xl w-full ml-6 mt-5 text-neutral-500'
          : variant === 'sub'
          ? 'text-center text-xl w-full ml-6 mb-4 mt-0.5 text-neutral-400'
          : ''
      }`}
    >
      {children}
    </div>
  );
};
