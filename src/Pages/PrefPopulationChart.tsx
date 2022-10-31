/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import { usePopulationDataQuery } from '../components/Hooks/usePopulationDataQuery';
import { usePrefDataQuery } from '../components/Hooks/usePrefDataQuery';
import { Layout } from '../components/Layout/Layout';
import { SectionTitle } from '../components/Text/SectionTitle';
import { Title } from '../components/Text/Title';

// prefNum
export type PrefNum = {
  prefCode: string | undefined;
  prefName: string | undefined;
};
//人口構成(PopulationData）の型定義
export type PopulationData = {
  prefCode: string | undefined;
  prefName: string | undefined;
  boundaryYear: string;
  data: {
    data: {
      year: number | null;
      value: number | null;
    }[];
    label: string;
  };
  label: string;
};

//それぞれの県のyearとvalueの型定義
export type PopulationYearValue = {
  year: number | null;
  value: number | null;
};

export const PrefPopulationChart = () => {
  const { prefData } = usePrefDataQuery();
  const { populationData, getPopulationData } = usePopulationDataQuery();
  const [prefNum, setPrefNum] = useState<PrefNum[]>([]);
  const [prefList, setPrefList] = useState<PopulationData[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefValue = prefData?.result?.find((pref) => pref.prefCode == e.target.value);
    if (prefNum.find((pref) => pref.prefCode === prefValue?.prefCode)) {
      setPrefNum(
        prefNum.filter((pref) => {
          return pref.prefCode !== prefValue?.prefCode;
        })
      );
      setPrefList(
        prefList.filter((pref) => {
          return pref.prefCode !== prefValue?.prefCode && pref.prefCode !== '';
        })
      );
    } else {
      setPrefNum((prev) => [...prev, { prefCode: prefValue?.prefCode, prefName: prefValue?.prefName }]);
      await getPopulationData({ prefCode: prefValue?.prefCode, prefName: prefValue?.prefName });
    }
  };

  useEffect(() => {
    setPrefList(
      prefList.filter((pref) => {
        return pref.prefCode !== '';
      })
    );
    //prefListにないpopulationDataであれば追加
    if (!prefList.find((pref) => pref.prefCode === populationData.prefCode)) {
      setPrefList((prev) => [...prev, populationData]);
    }
  }, [populationData]);

  return (
    <Layout>
      <Title>都道府県別の総人口推移</Title>

      <div className='border m-6 p-4 rounded-md shadow'>
        <SectionTitle>都道府県</SectionTitle>
        <div className='w-full flex  flex-wrap p-8 gap-3'>
          {prefData?.result?.map((pref) => {
            return (
              <div key={pref.prefCode} className='flex gap-1'>
                <input type='checkbox' value={pref.prefCode} onChange={handleChange} />
                <p>{pref.prefName}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className='text-center my-2'>選択</div>
        <div className='flex flex-wrap gap-3 p-4'>
          {prefNum.map((pref: PrefNum) => {
            return <div key={pref.prefCode}>{pref.prefCode}</div>;
          })}
        </div>
      </div>

      <div>
        <div className='text-center my-2'>人口構成</div>
        <div className='flex justify-center flex-wrap gap-2 p-2'>
          {prefList?.map((pref: PopulationData, i: number) => {
            return (
              <div key={`${i}-${i}`}>
                <div className='text-green-500'>{pref.prefCode}</div>
                <div className='text-gray-600'>{pref.prefName}</div>
                <div className='text-purple-500'>{pref.boundaryYear}</div>
                {pref.data?.data?.map((prefChild: PopulationYearValue, index: number) => {
                  return (
                    <div key={`${i}-${index}`}>
                      <div className='flex gap-2 mr-2'>
                        <div className='text-red-500'>{prefChild.year}</div>
                        <div className='text-blue-500'>{prefChild.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
