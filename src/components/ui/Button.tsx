import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  isLoading = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    outline: 'bg-transparent hover:bg-gray-100 text-blue-700 border border-blue-500',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${
        isLoading ? 'opacity-75 cursor-not-allowed' : ''
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}