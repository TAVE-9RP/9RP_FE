import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../types/member';

export const postLogin = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post('https://nexerp.site/member/login', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

