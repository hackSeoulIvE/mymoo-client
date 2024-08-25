import API from '@src/utils/axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
  id: number;
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
  foods: {
    id: number;
    name: string;
    price: string;
    discount_price: string;
    description: string;
    is_soldout: boolean;
    image_url: string;
    created_at: string;
    deleted_at: string | null;
  }[];
  comments: {
    id: number;
    description: string;
    created_at: '2024-08-24T07:56:13.351Z';
    deleted_at: null;
    user: {
      id: 1;
      username: string;
      password: string;
      nickname: string;
      created_at: string;
      deleted_at: null | string;
    };
  }[];
};
const getStore = async (params: Params): Promise<Response> => {
  const { data } = await API.get(`/store/${params.id}`);
  return data;
};

export const useGetStore = (params: Params) => {
  return useQuery({
    queryKey: ['store', params],
    queryFn: () => getStore(params),
  });
};
