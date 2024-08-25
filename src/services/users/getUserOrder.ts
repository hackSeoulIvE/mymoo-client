import API from '@src/utils/axios';
import { useQuery } from '@tanstack/react-query';

type Response = {
  id: number;
  created_at: string;
  food: {
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
}[];
const getUserOrder = async (): Promise<Response> => {
  const { data } = await API.get(`/user/order`);
  return data;
};

export const useGetUserOrder = () => {
  return useQuery({
    queryKey: ['userOrder'],
    queryFn: () => getUserOrder(),
  });
};
