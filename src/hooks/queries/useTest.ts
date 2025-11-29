import { useQuery } from '@tanstack/react-query';
import { getTest } from '../../apis/test';

export const useTest = () => {
  return useQuery({
    queryKey: ['test'], // 캐시 키, 고유해야 함
    queryFn: getTest, // 실제 요청 함수
  });
};
