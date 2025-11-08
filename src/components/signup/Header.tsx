import React from 'react';
import logo from '@/assets/logo.png';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex flex-col items-center justify-center gap-[60px] pt-[90px]">
      <div className="flex items-center justify-center gap-[10px]">
        <img src={logo} alt="NexERP 로고" className="h-[40px] w-[171px] object-contain" />
      </div>

      <h1 className="font-pretendard mt-0 whitespace-nowrap text-center text-[32px] font-bold leading-normal text-black">
        {title}
      </h1>
    </header>
  );
}
