import React, { InputHTMLAttributes } from 'react';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  iconSrc?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '검색어를 입력하세요.',
  iconSrc = '/src/assets/search.png',
  ...rest
}) => {
  return (
    <div
      className="border-greyColor-500 flex items-center rounded-[10px] border bg-white"
      style={{
        width: '500px',
        height: '45px',
        padding: '10px 20px',
        justifyContent: 'space-between',
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        style={{
          flexGrow: 1,
          height: '100%',
          border: 'none',
          outline: 'none',
          paddingRight: '10px',
          fontFamily: 'Pretendard',
          fontSize: '15px',
          fontWeight: 400,
        }}
        {...rest}
      />

      {iconSrc && (
        <img src={iconSrc} alt="Search Icon" width={20} height={20} style={{ cursor: 'pointer' }} />
      )}
    </div>
  );
};

export default SearchBar;
