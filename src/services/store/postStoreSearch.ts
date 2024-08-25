import API from '@src/utils/axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
  name?: string;
  longitude?: number;
  latitude?: number;
};
type Response = {
  id: number;
  name: string;
  start_Time: string;
  end_Time: string;
  latitude: number;
  longitude: number;
  store_type: string;
  location: string;
  is_open: boolean;
  created_at: string;
  deleted_at: string | null;
}[];
const postStoreSearch = async (params: Params): Promise<Response> => {
  const { data } = await API.post(
    `/store/storesearch`,
    {
      longitude: params.longitude,
      latitude: params.latitude,
    },
    {
      params: {
        name: params.name,
      },
    },
  );
  return data;
};

export const usePostStoreSearch = (params: Params) => {
  return useQuery({
    queryKey: ['storeSearch', params],
    queryFn: () => postStoreSearch(params),
  });
};
