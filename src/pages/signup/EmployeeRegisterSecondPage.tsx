import React, { useState, useEffect } from 'react';
import Header from '@/components/signup/Header';
import Button from '@/components/common/Button';
import { useNavigate, useLocation } from 'react-router-dom';

import searchIcon from '@/assets/search.png';
import checkIcon from '@/assets/checkicon.png';
import companyImage from '@/assets/companyimage.png';

const MOCK_COMPANIES = [
  { id: 1, name: '카피바라 회사' },
  { id: 2, name: '카피바라바라 회사' },
  { id: 3, name: '박카스' },
  { id: 4, name: '구알피' },
  { id: 5, name: '타코에 고수 추가' },
];

export default function EmployeeRegisterSecondPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 이전 페이지에서 전달받은 데이터
  const { userId, email, password } = (location.state as {
    userId?: string;
    email?: string;
    password?: string;
  }) || {};

  useEffect(() => {
    console.log('=== EmployeeRegisterSecondPage에서 받은 데이터 ===');
    console.log('userId:', userId);
    console.log('email:', email);
    console.log('password:', password);
  }, [userId, email, password]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

  const filteredCompanies = searchTerm
    ? MOCK_COMPANIES.filter((company) => company.name.includes(searchTerm))
    : [];

  return (
    <div className="mx-auto flex w-full max-w-[535px] flex-col items-center">
      <Header title="회사를 선택해주세요" />

      <div className="mt-[49px] flex h-[69px] w-[535px] shrink-0 items-center gap-[14px] rounded-[10px] border border-greyColor-grey300 bg-[#F7F8F9] px-[15px]">
        {!searchTerm && <img src={searchIcon} alt="검색" className="h-[36px] w-[36px] shrink-0" />}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedCompanyId(null);
          }}
          placeholder="회사명을 입력하세요"
          className="flex-1 bg-transparent font-[Pretendard] text-[19px] font-[400] text-greyColor-grey900 outline-none placeholder:text-greyColor-grey300"
        />
      </div>

      <div className="mt-[30px] flex w-full flex-col">
        {filteredCompanies.map((company) => {
          const isSelected = selectedCompanyId === company.id;
          return (
            <div
              key={company.id}
              onClick={() => setSelectedCompanyId(company.id)}
              className="flex h-[75px] w-[535px] cursor-pointer items-center border-b border-greyColor-grey200 px-[10px] transition-colors hover:bg-gray-50"
            >
              <img src={companyImage} alt="로고" className="h-[36px] w-[36px] shrink-0" />

              <span className="ml-[17px] flex-1 font-[Pretendard] text-[19px] font-[700] text-greyColor-grey900">
                {company.name}
              </span>

              <div
                className={`mr-[19px] h-[36px] w-[36px] transition-colors duration-200 ${isSelected ? 'bg-mainColor-blue600' : 'bg-greyColor-grey300'}`}
                style={{
                  WebkitMaskImage: `url(${checkIcon})`,
                  maskImage: `url(${checkIcon})`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            </div>
          );
        })}
      </div>

      {selectedCompanyId && (
        <div className="mb-10 mt-[100px] flex w-full justify-center gap-[31.5px]">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => navigate('/signup')}
            className="h-[70px] w-[252px] rounded-[10px] border-[#63656C] px-[50px] py-[17px]"
          >
            이전 단계
          </Button>

          <Button
            type="button"
            variant="active"
            onClick={() => {
              const selectedCompany = MOCK_COMPANIES.find((c) => c.id === selectedCompanyId);
              navigate('/employeesignup/step4', {
                state: {
                  companyId: selectedCompanyId,
                  companyName: selectedCompany?.name,
                },
              });
            }}
            className="h-[70px] w-[252px] rounded-[10px] bg-mainColor-blue600 text-white"
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
}
