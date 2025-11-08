import React from 'react';
import Header from '@/components/signup/Header';
import Button from '@/components/common/Button';
import searchIcon from '@/assets/search.png';
import { useNavigate } from 'react-router-dom';

export default function EmployeeRegisterSecondPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-[535px] flex-col items-center">
      <Header title="회사를 선택해주세요" />

      <div className="mt-[49px] flex h-[69px] w-[535px] shrink-0 items-center gap-[14px] rounded-[10px] border border-[#A0A2AA] bg-[#F7F8F9] px-[15px]">
        <img src={searchIcon} alt="검색 아이콘" className="h-[36px] w-[36px] shrink-0" />

        <input
          type="text"
          placeholder="회사명을 입력하세요"
          className="flex-1 bg-transparent font-[Pretendard] text-[19px] font-[400] text-[#1B1C1F] outline-none placeholder:text-[#A0A2AA]"
        />
      </div>

      <div className="mt-[462.5px] flex w-full justify-center gap-[31.5px]">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => navigate('/employeesignup')}
          className="h-[70px] w-[252px] rounded-[10px] border-[#63656C] px-[50px] py-[17px]"
        >
          이전 단계
        </Button>

        <Button
          type="button"
          variant="active"
          size="md"
          onClick={() => navigate('/employeesignup/step3')}
          className="h-[70px] w-[252px] rounded-[10px] px-[50px] py-[17px] text-black"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
