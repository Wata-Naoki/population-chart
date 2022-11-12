/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import { useQuery } from 'react-query';
import { PrefData } from '../types/types';

export const fetchPref = async () => {
  //  const [isLoading, setIsLoading] = useState(false);
  const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    headers: {
      'X-API-KEY': process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

export const useQueryPrefData = () => {
  return useQuery<PrefData, Error>({
    queryKey: 'prefData',
    queryFn: fetchPref,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
