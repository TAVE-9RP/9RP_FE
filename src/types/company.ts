export interface CompanyRegisterRequest {
  name: string;
  industryType: string;
  description: string;
  imagePath: string;
}

export interface CompanyRegisterResponse {
  timestamp: string;
  isSuccess: boolean;
  status: number;
  code: string;
  message: string;
  result: {
    companyId: number;
  };
}

