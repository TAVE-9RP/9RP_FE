import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../types/member';
import type { CompanyRegisterRequest, CompanyRegisterResponse } from '../types/company';

const BASE_URL = 'https://nexerp.site';

export const postLogin = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/member/login`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const postCompany = async (payload: CompanyRegisterRequest): Promise<CompanyRegisterResponse> => {
  const response = await axios.post(`${BASE_URL}/companies`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};



