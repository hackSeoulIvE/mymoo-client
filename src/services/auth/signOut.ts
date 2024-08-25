import API from '@src/utils/axios';
import { useMutation } from '@tanstack/react-query';

const signOut = async (): Promise<void> => {
  await API.post(`/auth/Signout`);
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signOut(),
    throwOnError: false,
  });
};
