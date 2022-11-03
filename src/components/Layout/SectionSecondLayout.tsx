import React from 'react';
import { StyleProps } from '../../types/types';

export const SectionSecondLayout: React.FC<StyleProps> = ({ children }) => {
  return <div className='flex justify-center mx-4 pr-6'>{children}</div>;
};
