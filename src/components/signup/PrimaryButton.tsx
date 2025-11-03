import React from 'react';

type Props = {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function PrimaryButton({ disabled = false, onClick, children }: Props) {
  // 기본 Tailwind 클래스 정의 (disabled 상태 스타일)
  const baseClasses = `
    flex 
    w-[252px]                                 /* width: 252px; */
    h-[70px]                                  /* height: 70px; */
    px-[50px]                                 /* padding-left: 50px; padding-right: 50px; */
    py-[17px]                                 /* padding-top: 17px; padding-bottom: 17px; */
    items-center 
    justify-center                            /* justify-content: center; */
    gap-[10px]                                /* gap: 10px; */
    flex-shrink-0                             /* flex-shrink: 0; */
    rounded-[10px]                            /* border-radius: 10px; */
    
    // 기본(disabled) 배경색: greyColor-grey300 (#C5C8CE)
    bg-gray-300
    text-white                                /* 버튼 텍스트 색상 (일반적으로 흰색 가정) */
    cursor-not-allowed                        /* disabled 상태 커서 */
  `;

  // enabled 상태일 때 추가할 스타일 (배경색 변경 및 커서 활성화)
  // 일반적으로 Primary 버튼은 Blue 계열이므로, blue-600을 예시로 적용합니다.
  const enabledClasses = `
    !bg-blue-600                              /* enabled 시 배경색 (활성화 색상으로 변경) */
    cursor-pointer                      /* 호버 효과 (선택 사항) */
    transition duration-200
  `;

  return (
    <button
      // disabled 상태에 따라 클래스를 조합합니다.
      className={`${baseClasses} ${!disabled ? enabledClasses : ''}`}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
