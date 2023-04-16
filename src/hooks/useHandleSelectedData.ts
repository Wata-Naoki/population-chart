import React, { useEffect, useState } from 'react';
import { PopulationData } from '../types/types';
import { usePopulationDataQuery } from './usePopulationDataQuery';
import { usePrefDataQuery } from './usePrefDataQuery';

export const useHandleSelectedData = () => {
  const { prefData, isLoading } = usePrefDataQuery();
  const { populationData, getPopulationData } = usePopulationDataQuery();
  const [prefList, setPrefList] = useState<PopulationData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Fetching中の場合は何もしない
    if (isFetching) return;

    setIsFetching(true);

    const prefValue = prefData?.result?.find((pref) => pref.prefCode == e.target.value);
    if (prefList.find((pref) => pref.prefCode === prefValue?.prefCode)) {
      setPrefList(
        prefList.filter((pref) => {
          return pref.prefCode !== prefValue?.prefCode && pref.prefCode !== '';
        })
      );
    } else {
      await getPopulationData({ prefCode: prefValue?.prefCode, prefName: prefValue?.prefName });
    }

    setIsFetching(false);
  };

  useEffect(() => {
    setPrefList(
      prefList.filter((pref) => {
        return pref.prefCode !== '';
      })
    );
    if (!prefList.find((pref) => pref.prefCode === populationData.prefCode)) {
      setPrefList((prev) => [...prev, populationData]);
    }
  }, [populationData]);

  return { prefData, isLoading, prefList, handleChange, isFetching };
};
