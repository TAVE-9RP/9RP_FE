import { useQuery } from '@tanstack/react-query';
import { getUnexpectedError } from '../../apis/test';

export const useUnexpectedError = () => {
  return useQuery({
    queryKey: ['unexpectedError'],
    queryFn: getUnexpectedError,
  });
};
