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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
      })
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setPrefData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  }, []);
  return {
    prefData,
    isLoading,
  };
};
