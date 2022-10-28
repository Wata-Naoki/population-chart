import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const usePopulationDataQuery = () => {
  const [populationData, setPopulationData] = useState<{ prefName: string; data: { year: number; value: number }[] }[]>(
    []
  );
  useEffect(() => {
    axios
      .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?&prefCode=${1}`, {
        headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
      })
      .then((response) => {
        console.log(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setPopulationData(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return { populationData };
};
