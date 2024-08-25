import API from '@src/utils/axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
  id: number;
};
type Response = {
  id: number;
  name: string;
  price: string;
  discount_price: string;
  description: string;
  is_soldout: boolean;
  image_url: string;
  created_at: string;
  deleted_at: null | string;
  foodstore: {
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
    deleted_at: null | string;
  };
};
const getFood = async (params: Params): Promise<Response> => {
  const { data } = await API.get(`/food/${params.id}`);
  return data;
};

export const useGetFood = (params: Params) => {
  return useQuery({
    queryKey: ['food', params],
    queryFn: () => getFood(params),
  });
};
