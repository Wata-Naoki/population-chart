import React from 'react';
import { PrefProps } from '../../types/types';

//47都道府県を表示するコンポーネント
export const Prefectures: React.FC<PrefProps> = ({ handleChange, prefData, prefList }) => {
  return (
    <>
      <div className='flex flex-wrap items-center justify-start w-full gap-3 py-4 pl-6 sm:p-6'>
        {prefData?.result?.map((pref) => {
          return (
            <div
              key={pref.prefCode}
              className={`flex gap-1 hover:shadow rounded px-1 text-zinc-500 hover:bg-zinc-400 hover:text-white hover:drop-shadow  border-transparent	transition-all hover:opacity-90	 duration-300 cursor-pointer ease-out hover:ease-in ${
                prefList.find((prefListChild) => prefListChild.prefCode === pref.prefCode)
                  ? 'bg-zinc-400 text-white drop-shadow-2xl shadow-2xl'
                  : ''
              }`}
            >
              <input
                type='checkbox'
                id={pref.prefCode}
                value={pref.prefCode}
                onChange={handleChange}
                className='cursor-pointer'
              />
              <label htmlFor={pref.prefCode} className='cursor-pointer'>
                {pref.prefName}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};
