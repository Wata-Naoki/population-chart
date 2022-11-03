import { PopulationData } from '../types/types';
//グラフに必要なデータに変換
export const convertToSeriesData = (prefList: PopulationData[]) => {
  const seriesData = prefList.map((pref) => {
    return {
      name: pref.prefName,
      data: pref.valueData,
    };
  });
  return seriesData;
};
