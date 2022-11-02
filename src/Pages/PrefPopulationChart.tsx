import React, { useEffect, useState } from 'react';
import { usePopulationDataQuery } from '../components/Hooks/usePopulationDataQuery';
import { usePrefDataQuery } from '../components/Hooks/usePrefDataQuery';
import { Layout } from '../components/Layout/Layout';
import { PopulationGraphContainer } from '../components/PopulationGraph/PopulationGraph';
import { SectionTitle } from '../components/Text/SectionTitle';
import { Title } from '../components/Text/Title';

// 選択した県の番号と名前を格納する型
export type SelectedPref = {
  prefCode: string | undefined;
  prefName: string | undefined;
};
//人口構成(PopulationData）の型定義
export type PopulationData = {
  prefCode: string | undefined;
  prefName: string | undefined;
  yearData: number[] | undefined;
  valueData: number[] | undefined;
};

export const PrefPopulationChart = () => {
  const { prefData } = usePrefDataQuery();
  const { populationData, getPopulationData } = usePopulationDataQuery();
  const [prefList, setPrefList] = useState<PopulationData[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //選択した県の番号と名前を取得
    const prefValue = prefData?.result?.find((pref) => pref.prefCode == e.target.value);
    //選択した県がすでに選択されているか確認。
    if (prefList.find((pref) => pref.prefCode === prefValue?.prefCode)) {
      //すでに選択済みであれば、選択済みの県を削除
      setPrefList(
        prefList.filter((pref) => {
          return pref.prefCode !== prefValue?.prefCode && pref.prefCode !== '';
        })
      );
    } else {
      //選択されていなければ選択した県を追加するために、人口構成データをfetch
      await getPopulationData({ prefCode: prefValue?.prefCode, prefName: prefValue?.prefName });
    }
  };

  useEffect(() => {
    //初回レンダリング時の空のデータを削除
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

      <div className='border m-6 p-4 rounded-md shadow 2xl:max-w-screen-2xl'>
        <SectionTitle>都道府県</SectionTitle>
        <div className='w-full flex  flex-wrap p-8 gap-3'>
          {prefData?.result?.map((pref) => {
            return (
              <div key={pref.prefCode} className='flex gap-1'>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <input type='checkbox' value={pref.prefCode} onChange={handleChange} className='focus:outline-none' />
                <p>{pref.prefName}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex justify-center'>
        <div className='w-screen 2xl:max-w-screen-2xl'>
          <PopulationGraphContainer prefList={prefList} />
        </div>
      </div>
    </Layout>
  );
};
