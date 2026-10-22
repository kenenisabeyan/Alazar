import React from 'react';

export const Input = ({
  label,
  type = "text",
  placeholder,
  multiline = false,
  value,
  onChange,
  name,
  required = false,
  error,
  rows = 4,
  className = '',
  ...props
}) => {
  const baseClasses = "w-full bg-white/80 dark:bg-[#18080A]/80 backdrop-blur-sm border border-[#C59A9F]/45 dark:border-white/15 rounded-xl px-4.5 py-3.5 text-[#1C1917] dark:text-[#F5F0F1] font-medium focus:outline-none focus:border-[#6B1D2F] dark:focus:border-[#E28D99] focus:ring-4 focus:ring-[#6B1D2F]/10 dark:focus:ring-[#E28D99]/15 shadow-sm hover:border-[#6B1D2F]/60 transition-all duration-300 placeholder:text-[#292524]/40 dark:placeholder:text-white/30 text-sm";
  
  const cleanLabel = label ? label.replace(/\s*\*+\s*$/, '') : '';

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs text-[#1C1917] dark:text-[#F5F0F1] font-black tracking-widest uppercase flex justify-between">
          <span>{cleanLabel} {required && <span className="text-[#6B1D2F] dark:text-[#E28D99]">*</span>}</span>
        </label>
      )}
      {multiline ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${baseClasses} resize-none ${error ? 'border-red-500/80 focus:border-red-500' : ''}`}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${baseClasses} ${error ? 'border-red-500/80 focus:border-red-500' : ''}`}
          {...props}
        />
      )}
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
};

export default Input;
