import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const usePrefDataQuery = () => {
  const [prefData, setPrefData] = useState<{
    message: null;
    result: {
      prefCode: string;
      prefName: string;
    }[];
  } | null>(null);

  useEffect(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
      })
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setPrefData(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return {
    prefData,
  };
};
