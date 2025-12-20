import { useMutation } from '@tanstack/react-query';
import { postTestValidation } from '../../apis/test';

export const useTestValidation = () => {
  return useMutation({
    mutationFn: postTestValidation,
  });
};
