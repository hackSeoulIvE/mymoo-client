import API from '@src/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

type Params = {
  userId: string;
  password: string;
  nickname: string;
};
const signUp = async (params: Params): Promise<void> => {
  await API.post(`/auth/signUp`, {
    user_id: params.userId,
    password: params.password,
    nickname: params.nickname,
  });
  toast.success('회원가입이 완료되었어요.');
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (params: Params) => signUp(params),
    throwOnError: false,
  });
};
