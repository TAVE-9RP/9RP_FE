import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCustomError } from '../../apis/test';
import type { TestCustomErrorResponse } from '../../types/test';

export const useCustomError = (
  count: number,
  options?: UseQueryOptions<TestCustomErrorResponse, unknown, TestCustomErrorResponse>,
) => {
  return useQuery<TestCustomErrorResponse, unknown, TestCustomErrorResponse>({
    queryKey: ['customError', count],
    queryFn: () => getCustomError(count),
    enabled: false, // 수동 호출
    ...options,
  });
};
