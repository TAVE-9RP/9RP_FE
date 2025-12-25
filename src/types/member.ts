export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  result: {
    accessToken: string;
    refreshToken: string;
  };
}

