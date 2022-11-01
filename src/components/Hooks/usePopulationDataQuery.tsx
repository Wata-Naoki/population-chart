/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { PopulationData, SelectedPref } from '../../Pages/PrefPopulationChart';

export const usePopulationDataQuery = () => {
  const [populationData, setPopulationData] = useState<PopulationData>({
    prefCode: '',
    prefName: '',
    yearData: [],
    valueData: [],
  });

  const getPopulationData = useCallback(async ({ prefCode, prefName }: SelectedPref) => {
    if (prefCode) {
      await axios
        .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?&prefCode=${prefCode}`, {
          headers: {
            'X-API-KEY': process.env.REACT_APP_API_KEY,
          },
        })
        .then((response) => {
          //グラフで扱えるようにデータを整形
          //yearを取得。グラフのx軸に使用
          const yearData = response.data.result.data[0].data.map((data: { year: number }) => data.year);
          //valueを取得。グラフのy軸に使用
          const valueData = response.data.result.data[0].data.map((data: { value: number }) => data.value);

          setPopulationData((prev: PopulationData) => ({
            ...prev,
            prefCode: prefCode,
            prefName: prefName,
            yearData: yearData,
            valueData: valueData,
          }));
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, []);

  return { populationData, getPopulationData };
};
