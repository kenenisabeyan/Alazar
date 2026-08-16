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
  const baseStyle = "relative overflow-hidden inline-flex items-center justify-center px-9 py-4.5 sm:py-5 rounded-full font-black tracking-widest text-xs sm:text-sm select-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#6B1D2F]/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase transition-all duration-300 ease-out group active:scale-[0.97] min-h-[54px] sm:min-h-[58px]";
  
  const variants = {
    // Rich Burgundy Brand Gradient with ambient glow & sheen
    primary: "bg-gradient-to-r from-[#6B1D2F] via-[#7D2237] to-[#8B2440] text-white shadow-lg shadow-[#6B1D2F]/25 hover:shadow-xl hover:shadow-[#6B1D2F]/40 hover:-translate-y-0.5 border border-white/10",
    // Pristine White glass with burgundy border & text, hover fill transition
    secondary: "bg-white/95 backdrop-blur-md text-[#6B1D2F] border-2 border-[#6B1D2F]/80 hover:bg-[#6B1D2F] hover:text-white shadow-md shadow-black/5 hover:shadow-lg hover:-translate-y-0.5",
    // Inverted luxury light pill for dark burgundy cards/banners
    inverted: "bg-gradient-to-r from-white via-[#FFF7F8] to-white text-[#6B1D2F] hover:text-[#521321] shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-[1.02] border border-white/80 ring-4 ring-white/15 hover:ring-white/35",
    // Subtle frosted outline button
    outline: "bg-white/80 backdrop-blur-sm text-[#1C1917] border-2 border-[#C59A9F] hover:border-[#6B1D2F] hover:text-[#6B1D2F] hover:bg-white hover:-translate-y-0.5 shadow-sm",
    // Soft transparent hover pill
    ghost: "bg-transparent text-[#1C1917] hover:text-[#6B1D2F] hover:bg-[#F5E8EA]/80"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {/* Dynamic Light Sheen Sweep */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

      {loading ? (
        <span className="relative z-10 flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="relative z-10 flex items-center justify-center">
          {children}
          {icon && <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0 inline-flex items-center">{icon}</span>}
        </span>
      )}
    </button>
  );
};

export default Button;
