import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponsePrefData } from '../types/types';

export const usePrefDataQuery = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [prefData, setPrefData] = useState<{
    message: null;
    result: {
      prefCode: string;
      prefName: string;
    }[];
  }>();
  const fetchPrefData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<ResponsePrefData>('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: {
          'X-API-KEY': process.env.REACT_APP_API_KEY,
        },
      });
      setPrefData(response.data);
    } catch (e) {
      console.log(e);
      return;
    }
    setIsLoading(false);
  };
  //初回レンダリング時にapiからデータを取得
  useEffect(() => {
    void fetchPrefData();
  }, []);

  return {
    prefData,
    isLoading,
    setIsLoading,
  };
};
