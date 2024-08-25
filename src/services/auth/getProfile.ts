import API from '@src/utils/axios';
import { useQuery } from '@tanstack/react-query';

type Response = {
  user_name: string;
  user_id: string;
};
const getProfile = async (): Promise<Response> => {
  const { data } = await API.get(`/auth/profile`);
  return data;
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });
};
