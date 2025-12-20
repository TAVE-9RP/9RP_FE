import React, { useState, useEffect } from 'react';
import Header from '@/components/signup/Header';
import { InputField } from '@/components/signup/InputField';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    userId: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = '';

    switch (name) {
      case 'userId':
        if (value.trim() === '') errorMsg = '아이디를 입력해주세요.';
        break;

      case 'password':
        if (!passwordRegex.test(value)) {
          errorMsg = '영문과 숫자를 포함한 8자 이상이어야 합니다.';
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  useEffect(() => {
    const isValid = formData.userId.trim() !== '' && passwordRegex.test(formData.password);

    setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      console.log('폼 유효성 검사 실패');
      return;
    }

    console.log('로그인 요청 데이터:', formData);

    // 로그인 API 를 여기에 붙일 예정
    navigate('/dashboard'); // 로그인 성공 시 이동
  };

  return (
    <div className="mx-auto flex w-full max-w-[535px] flex-col items-center">
      <Header title="로그인" />

      <form onSubmit={handleSubmit} className="mt-[49px] flex w-full flex-col gap-[20px]">
        <div>
          <InputField
            label="아이디"
            name="userId"
            placeholder="아이디를 입력하세요."
            type="text"
            value={formData.userId}
            onChange={handleChange}
            isError={!!errors.userId}
          />
          {errors.userId && <p className="mt-1 text-sm text-red-500">{errors.userId}</p>}
        </div>

        <div>
          <InputField
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력하세요."
            type="password"
            value={formData.password}
            onChange={handleChange}
            isError={!!errors.password}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div className="mt-[30px] flex w-full justify-center">
          <Button
            type="submit"
            variant={isFormValid ? 'active' : 'secondary'}
            size="md"
            disabled={!isFormValid}
            className="h-[70px] w-full rounded-[10px] px-[50px] py-[17px] text-black"
          >
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
