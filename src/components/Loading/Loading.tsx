import React from 'react';

export const Loading = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-4'>
      Loading...
      <div className='flex justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-500 border-t-transparent'></div>
      </div>
    </div>
  );
};
