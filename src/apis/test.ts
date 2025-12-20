import axios from 'axios';
import type {
  TestValidationRequest,
  TestValidationResponse,
  TestGetResponse,
  TestUnexpectedErrorResponse,
  TestSystemErrorResponse,
  TestErrorResponse,
  TestCustomErrorResponse,
} from '../types/test';

export const postTestValidation = async (
  payload: TestValidationRequest,
): Promise<TestValidationResponse> => {
  const response = await axios.post('https://nexerp.site/test/validation', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const getTest = async (): Promise<TestGetResponse> => {
  const response = await axios.get('https://nexerp.site/test');
  return response.data;
};

export const getUnexpectedError = async (): Promise<TestUnexpectedErrorResponse> => {
  const response = await axios.get('https://nexerp.site/test/unexpected-error');
  return response.data;
};

export const getSystemError = async (): Promise<TestSystemErrorResponse> => {
  const response = await axios.get('https://nexerp.site/test/system-error');
  return response.data;
};

export const getErrorByUserId = async (userId: string): Promise<TestErrorResponse> => {
  const response = await axios.get(`https://nexerp.site/test/error/${userId}`);
  return response.data;
};

export const getCustomError = async (count: number): Promise<TestCustomErrorResponse> => {
  const { data } = await axios.get<TestCustomErrorResponse>(
    'https://nexerp.site/test/custom-error',
    {
      params: { count },
    },
  );
  return data;
};
