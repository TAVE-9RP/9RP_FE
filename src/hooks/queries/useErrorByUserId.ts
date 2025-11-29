import { useQuery } from '@tanstack/react-query';
import { getErrorByUserId } from '../../apis/test';

export const useErrorByUserId = (userId: string) => {
  return useQuery({
    queryKey: ['errorByUserId', userId], // userId별 캐싱
    queryFn: () => getErrorByUserId(userId),
    enabled: !!userId, // userId가 있을 때만 실행
  });
};
