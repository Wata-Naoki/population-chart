/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { PopulationData } from '../types/types';
import { fetchPopulationData, usePopulationDataQuery } from './usePopulationDataQuery';
import { useQueryPrefData } from './usePrefDataQuery';

export const useHandleSelectedData = () => {
  const [prefList, setPrefList] = useState<PopulationData[]>([]);
  const [selectedPref, setSelectedPref] = useState<any>({
    prefCode: '',
    prefName: '',
  });

  // const { prefData, isLoading } = usePrefDataQuery();
  const { data: prefData, status: isLoading } = useQueryPrefData();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const { populationData, getPopulationData } = usePopulationDataQuery();
  const {
    isLoading: isLoadingPopulationData,
    data: populationData,
    refetch,
  } = useQuery<any>({
    queryKey: ['populationData', selectedPref],
    queryFn: () => fetchPopulationData(selectedPref),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      //await getPopulationData({ prefCode: prefValue?.prefCode, prefName: prefValue?.prefName });

      setSelectedPref((prev: any) => ({
        ...prev,
        prefCode: prefValue?.prefCode,
        prefName: prefValue?.prefName,
      }));
    }
  };

  useEffect(() => {
    //初回レンダリング時の空のデータを削除
    setPrefList(
      prefList.filter((pref) => {
        return pref.prefCode !== '';
      })
    );

    if (populationData?.prefCode) {
      //prefListにないpopulationDataであれば追加
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!prefList.find((pref) => pref.prefCode === populationData?.prefCode)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setPrefList((prev) => [...prev, populationData]);
        // setPrefList((prev) => {
        //   alert(prev.map((pref) => pref.prefName));
        //   return [...prev, populationData];
        // });
      }
    }
  }, [populationData]);

  return { prefData, isLoading, prefList, handleChange };
};
