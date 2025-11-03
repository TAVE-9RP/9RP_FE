import React from 'react';

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  // ✅ 새로운 props 추가
  isSelected: boolean;
}

export const OptionCard = ({ icon, title, description, onClick, isSelected }: OptionCardProps) => {
  // 기본 테두리 색상: 회색 (테두리 두께 2px)
  const baseClasses = 'border-[1px] transition duration-150';

  const defaultClasses = 'bg-gray-100 border-transparent';

  // ✅ 선택 시 클래스: bg-blue-50 (blue050), border-blue-600 (blue600)
  const selectedClasses = 'bg-blue-50 border-blue-600';

  // 기존 스타일 클래스 (padding, flex 등)
  const dynamicClasses = `
    flex h-[192px] w-[669px] flex-shrink-0 items-center gap-[45px] rounded-[20px] p-0 pb-[26px] pl-[23px] pr-[85px] pt-[26px] text-left transition duration-150
    ${baseClasses}
    ${isSelected ? selectedClasses : 'bg-gray-100 border-transparent'}
  `;

  return (
    <button
      onClick={onClick}
      // ✅ isSelected 상태에 따라 클래스 적용
      className={dynamicClasses}
    >
      <div className="flex h-[140px] w-[140px] flex-shrink-0 items-center justify-center">
        {icon}
      </div>

      <div className="flex flex-col">
        <h3 className="font-pretendard mb-2 text-[24px] font-bold leading-normal text-black">
          {title}
        </h3>

        <p className="font-pretendard text-[19px] font-normal leading-normal text-gray-600">
          {description}
        </p>
      </div>
    </button>
  );
};

export default OptionCard;
