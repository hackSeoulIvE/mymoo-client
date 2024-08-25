import API from '@src/utils/axios';
import { useMutation } from '@tanstack/react-query';

type Params = {
  description: string;
  foodStoreId: number;
};
const postComment = async (params: Params): Promise<void> => {
  const { data } = await API.post(`/comment`, {
    description: params.description,
    foodstore_id: params.foodStoreId,
  });
  return data;
};

export const usePostComment = () => {
  return useMutation({
    mutationFn: (params: Params) => postComment(params),
  });
};
