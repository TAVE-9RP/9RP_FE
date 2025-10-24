import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  ...rest
}: ButtonProps) => {
  const baseStyles = 'transition-all flex items-center justify-center rounded-md font-[Pretendard]';

  const variantStyles = {
    primary:
      'bg-white text-black border border-[#BEBEBE] ' +
      'shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-gray-50 font-medium',
    secondary: 'bg-[#E8E8E8] hover:bg-[#DCDCDC] text-black font-semibold rounded-[30px]',
  };

  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-[32px] py-[10px]',
    lg: 'text-lg px-8 py-3',
  };

  const finalClassName = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isLoading && 'opacity-50 cursor-not-allowed',
    className,
  );

  return (
    <button {...rest} className={finalClassName} disabled={isLoading || rest.disabled}>
      {isLoading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-black"></div>
          처리 중...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
