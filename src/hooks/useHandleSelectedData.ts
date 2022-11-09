import React, { useEffect, useRef, useState } from 'react';
import { PopulationData } from '../types/types';
import { usePopulationDataQuery } from './usePopulationDataQuery';
import { usePrefDataQuery } from './usePrefDataQuery';

export const useHandleSelectedData = () => {
  const { prefData, isLoading } = usePrefDataQuery();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { populationData, getPopulationData } = usePopulationDataQuery();
  const [prefList, setPrefList] = useState<PopulationData[]>([]);
  const processing = useRef(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //    processing.current && return

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!prefList.find((pref) => pref.prefCode === populationData.prefCode)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      setPrefList((prev) => [...prev, populationData]);
    }
  }, [populationData]);

  return { prefData, isLoading, prefList, handleChange };
};
