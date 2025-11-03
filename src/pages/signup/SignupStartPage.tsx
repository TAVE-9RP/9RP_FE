import React, { useState } from 'react';
import Header from '@/components/signup/header';
import { OptionCard } from '@/components/signup/OptionCard';
// ✅ PrimaryButton 컴포넌트 import
import PrimaryButton from '@/components/signup/PrimaryButton';

import '@/styles/index.css';

import signupicon01 from '@/assets/signupicon01.png';
import signupicon02 from '@/assets/signupicon02.png';

type CardType = 'COMPANY' | 'EMPLOYEE' | null;

export default function SignupStartPage() {
  const [selectedCard, setSelectedCard] = useState<CardType>(null);

  // ✅ 버튼 활성화 여부 결정: selectedCard가 null이 아니면 true (활성화)
  const isButtonEnabled = selectedCard !== null;

  const handleCardClick = (type: CardType) => {
    setSelectedCard(type);
    console.log(`${type} 카드 클릭`);
  };

  // ✅ 다음 버튼 클릭 핸들러 (실제 페이지 이동 로직이 들어갈 곳)
  const handleNextClick = () => {
    if (selectedCard) {
      console.log(`다음 단계로 이동: ${selectedCard}`);
      // TODO: 여기에 선택된 카드 타입에 따른 라우팅 로직 추가
    }
  };

  return (
    <div className="page">
      <div className="w-full px-6">
        <Header title="NexERP와 함께 편리한 기업 프로세스를 관리해보세요" />
        <div className="mt-[89px] flex flex-col items-center gap-[29px]">
          <OptionCard
            icon={<img src={signupicon01} alt="회사 등록 아이콘" className="h-[140px] w-[140px]" />}
            title="회사 신규 등록"
            description="우리 회사를 NexERP에 등록하고 팀을 관리하세요."
            onClick={() => handleCardClick('COMPANY')}
            isSelected={selectedCard === 'COMPANY'}
          />

          <OptionCard
            icon={<img src={signupicon02} alt="사원 등록 아이콘" className="h-[140px] w-[140px]" />}
            title="사원 신규 등록"
            description="오너가 등록한 회사에 참여하는 사원 계정을 생성합니다."
            onClick={() => handleCardClick('EMPLOYEE')}
            isSelected={selectedCard === 'EMPLOYEE'}
          />
        </div>

        {/*
          ✅ PrimaryButton 추가
          - 카드 섹션과 버튼 사이에 마진을 줍니다 (예: mt-10)
          - disabled={!isButtonEnabled}로, 카드가 선택되지 않으면 비활성화합니다.
        */}
        <div className="mt-[104px] flex justify-center pb-10">
          <PrimaryButton disabled={!isButtonEnabled} onClick={handleNextClick}>
            다음
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
