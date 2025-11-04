import React, { useState } from 'react';
import Header from '@/components/signup/Header';
import { InputField } from '@/components/signup/InputField';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import defaultLogoImg from '@/assets/logoimg.png';

export default function EmployeeRegisterFourthPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department: '',
    position: '',
  });

  const [image, setImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const openFileDialog = () => {
    document.getElementById('imageUploadInput')?.click();
  };

  return (
    <div className="mx-auto flex w-full max-w-[535px] flex-col items-center">
      <Header title="회사의 소속부서와 직급을 입력해주세요" />

      <div className="mt-[82px] flex flex-col items-center">
        <button type="button" onClick={openFileDialog} className="focus:outline-none">
          <img
            src={image || defaultLogoImg}
            alt="회사 로고 업로드"
            className="h-[188px] w-[188px] cursor-pointer rounded-[10px] object-cover"
          />
        </button>

        <input
          id="imageUploadInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="mt-[49px] flex w-full flex-col gap-[20px]">
        <InputField
          label="부서"
          name="department"
          placeholder="부서를 입력하세요."
          value={formData.department}
          onChange={handleChange}
        />

        <InputField
          label="직급"
          name="position"
          placeholder="직급을 입력하세요."
          value={formData.position}
          onChange={handleChange}
        />
      </div>

      <div className="mt-[31px] flex w-full justify-center gap-[31.5px]">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => navigate('/employeesignup/step3')}
          className="h-[70px] w-[252px] rounded-[10px] border-[#63656C] px-[50px] py-[17px]"
        >
          이전 단계
        </Button>

        <Button
          type="button"
          variant={formData.department && formData.position ? 'active' : 'secondary'}
          size="md"
          disabled={!formData.department || !formData.position}
          onClick={() => navigate('/employeesignup/step5')}
          className="h-[70px] w-[252px] rounded-[10px] px-[50px] py-[17px] text-black"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
