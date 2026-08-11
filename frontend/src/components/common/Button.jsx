import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  icon,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium transition-all duration-300 ease-out tracking-wide text-sm select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6B1D2F]/25 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Rich Burgundy — brand CTA
    primary: "bg-[#6B1D2F] text-white hover:bg-[#8B2440] hover:-translate-y-1 shadow-md shadow-[#6B1D2F]/20 active:translate-y-0",
    // Soft rose-tinted secondary
    secondary: "bg-[#F5E8EA] text-[#6B1D2F] border border-[#C59A9F]/50 hover:bg-[#6B1D2F] hover:text-white hover:border-[#6B1D2F] hover:-translate-y-1 active:translate-y-0",
    // Outline
    outline: "bg-transparent text-[#1C1917] border border-[#E5D9DB] hover:border-[#6B1D2F] hover:text-[#6B1D2F] hover:-translate-y-1 active:translate-y-0",
    ghost: "bg-transparent text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F0EF]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
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
    </button>
  );
};

export default Button;
