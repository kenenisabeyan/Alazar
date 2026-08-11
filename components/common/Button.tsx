'use client';

import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  icon?: React.ReactNode;
  href?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  icon,
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium transition-all duration-300 ease-out tracking-wide text-sm select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-burgundy/30 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Rich Burgundy — brand CTA
    primary: "bg-burgundy text-white hover:bg-burgundy-light hover:-translate-y-1 shadow-burgundy-sm active:translate-y-0",
    // Soft rose-tinted secondary
    secondary: "bg-burgundy-faint text-burgundy border border-burgundy-soft hover:bg-burgundy hover:text-white hover:border-burgundy hover:-translate-y-1 active:translate-y-0",
    // Ghost outline
    outline: "bg-transparent text-charcoal border border-border hover:border-burgundy hover:text-burgundy hover:-translate-y-1 active:translate-y-0",
    ghost: "bg-transparent text-slate hover:text-charcoal hover:bg-surface-alt"
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${className}`;

  const content = (
    <>
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <>
          {children}
          {icon && <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
        </>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
