/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { PopulationData, PrefNum } from '../../Pages/PrefPopulationChart';

export const usePopulationDataQuery = () => {
  const [populationData, setPopulationData] = useState<PopulationData>({
    prefCode: '',
    prefName: '',
    boundaryYear: '',
    data: { data: [{ year: null, value: null }], label: '' },
    label: '',
  });

  const getPopulationData = useCallback(async ({ prefCode, prefName }: PrefNum) => {
    console.log(prefCode, prefName);

    if (prefCode) {
      await axios
        .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?&prefCode=${prefCode}`, {
          headers: {
            'X-API-KEY': process.env.REACT_APP_API_KEY,
          },
        })
        .then((response) => {
          setPopulationData((prev: PopulationData) => ({
            ...prev,
            prefCode: prefCode,
            prefName: prefName,
            boundaryYear: response.data.result.boundaryYear,
            data: response.data.result.data[0],
            label: response.data.result.data[0].label,
          }));
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, []);

  return { populationData, getPopulationData };
};
