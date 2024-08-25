import API from '@src/utils/axios';
import { useMutation } from '@tanstack/react-query';

type Params = {
  foodId: number;
};
const postOrderFood = async (params: Params): Promise<void> => {
  const { data } = await API.post(`/food/orderfood`, {
    food_id: params.foodId,
  });
  return data;
};

export const usePostOrderFood = () => {
  return useMutation({
    mutationFn: (params: Params) => postOrderFood(params),
  });
};
