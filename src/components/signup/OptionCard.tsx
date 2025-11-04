import React from 'react';

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}

export const OptionCard = ({ icon, title, description, onClick, isSelected }: OptionCardProps) => {
  const baseClasses = 'border-[1px] transition duration-150';

  const defaultClasses = 'bg-gray-100 border-transparent';

  const selectedClasses = 'bg-blue-50 border-blue-600';

  const dynamicClasses = `
    flex h-[192px] w-[669px] flex-shrink-0 items-center gap-[45px] rounded-[20px] p-0 pb-[26px] pl-[23px] pr-[85px] pt-[26px] text-left transition duration-150
    ${baseClasses}
    ${isSelected ? selectedClasses : 'bg-gray-100 border-transparent'}
  `;

  return (
    <button onClick={onClick} className={dynamicClasses}>
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
