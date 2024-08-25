import API, { setAccessToken } from '@src/utils/axios';
import { useMutation } from '@tanstack/react-query';

type Params = {
  userId: string;
  password: string;
};
const signIn = async (params: Params): Promise<void> => {
  const { data } = await API.post(`/auth/Signin`, {
    user_id: params.userId,
    password: params.password,
  });
  setAccessToken(data.access_token);
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (params: Params) => signIn(params),
    throwOnError: false,
  });
};
