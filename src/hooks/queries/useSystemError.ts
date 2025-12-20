import { useQuery } from '@tanstack/react-query';
import { getSystemError } from '../../apis/test';

export const useSystemError = () => {
  return useQuery({
    queryKey: ['systemError'], // 캐시 키
    queryFn: getSystemError, // 실제 요청 함수
  });
};
