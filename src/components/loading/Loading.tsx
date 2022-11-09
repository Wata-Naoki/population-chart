import React from 'react';

export const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      Loading...
      <div className='flex justify-center'>
        <div className='w-10 h-10 border-4 border-gray-500 rounded-full animate-spin border-t-transparent'></div>
      </div>
    </div>
  );
};
