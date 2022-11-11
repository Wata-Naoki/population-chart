/* eslint-disable @typescript-eslint/no-floating-promises */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const usePrefDataQuery = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [prefData, setPrefData] = useState<{
    message: null;
    result: {
      prefCode: string;
      prefName: string;
    }[];
  }>();

  //初回レンダリング時にapiからデータを取得
  useEffect(() => {
    const fetchPrefData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
          headers: {
            'X-API-KEY': process.env.REACT_APP_API_KEY,
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setPrefData(response.data);
      } catch (e) {
        console.log(e);
        return;
      }
      setIsLoading(false);
    };
    fetchPrefData();
  }, []);

  return {
    prefData,
    isLoading,
    setIsLoading,
  };
};
