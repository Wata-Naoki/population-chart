import React from 'react';
import { PrefProps } from '../../types/types';

export const Prefectures: React.FC<PrefProps> = ({ handleChange, prefData, prefList }) => {
  return (
    <>
      <div className='w-full flex items-center justify-start flex-wrap py-4 pl-6 sm:p-6 gap-3'>
        {prefData?.result?.map((pref) => {
          return (
            <div
              key={pref.prefCode}
              className={`flex gap-1 hover:shadow-2xl rounded px-1 text-zinc-500 hover:bg-zinc-400 hover:text-white hover:drop-shadow-2xl  border-transparent	transition-all duration-300  ease-out hover:ease-in ${
                prefList.find((prefListChild) => prefListChild.prefCode === pref.prefCode)
                  ? 'bg-zinc-400 text-white drop-shadow-2xl shadow-2xl'
                  : ''
              }`}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <input type='checkbox' value={pref.prefCode} onChange={handleChange} className='focus:outline-none' />
              <p>{pref.prefName}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
