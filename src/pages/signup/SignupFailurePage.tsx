import Header from '@/components/signup/Header';
import locked from '@/assets/Locked padlock.png';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function SignupSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <Header title="" />

      <h1
        className="font-pretendard mt-[80px] text-center text-[32px] font-bold leading-[100%] text-black"
        style={{ letterSpacing: '0%' }}
      >
        <span className="text-blue-600">홍길동</span>님의 가입 요청이 승인되지 않았습니다.
      </h1>

      <p className="font-pretendard mt-[22px] text-center text-[19px] font-normal leading-normal text-gray-600">
        회사의 승인 요청 진행이 완료될 때까지 기다려주세요.
      </p>

      <img
        src={locked}
        alt="가입 실패 아이콘"
        className="mt-[46px] h-[254px] w-[254px] flex-shrink-0 object-contain"
      />

      <div className="mt-[163px]">
        <Button
          variant="active"
          size="md"
          className="h-[70px] w-[252px] rounded-[10px]"
          onClick={() => navigate('/')}
        >
          홈 바로가기
        </Button>
      </div>
    </div>
  );
}
