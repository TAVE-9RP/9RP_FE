import React from 'react';

interface DateInputProps {
  placeholder: string;
  unit: string;
  width: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  placeholder,
  unit,
  width,
  name,
  value,
  onChange,
}) => {
  const defaultPlaceholder = `(예)${placeholder}`;

  const baseStyle: React.CSSProperties = {
    height: '50px',
    borderRadius: '10px',
    background: value.length > 0 ? '#E2F1FF' : '#FFF',
    width,
    textAlign: 'center',
    outline: 'none',
    boxSizing: 'border-box',
    borderColor: value.length > 0 ? '#007EF4' : '#A0A2AA',
    borderWidth: '1px',
    transition: 'border-color 0.15s, background-color 0.15s',
    color: value.length > 0 ? '#131517' : '#A0A2AA',
  };

  return (
    <div className="flex items-center gap-[6px]">
      <input
        type="text"
        name={name}
        placeholder={value ? '' : defaultPlaceholder}
        value={value}
        onChange={onChange}
        className="text-[19px] font-light"
        style={baseStyle}
      />
      <span className="text-[17px] font-medium text-greyColor-grey600">{unit}</span>
    </div>
  );
};

export default DateInput;
