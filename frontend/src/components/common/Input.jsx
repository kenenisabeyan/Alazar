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
  const baseClasses = "w-full bg-[#FAFAF9] dark:bg-[#1E0A0D] border border-[#C59A9F] dark:border-white/20 rounded-lg px-4 py-3 text-[#1C1917] dark:text-[#F5F0F1] focus:outline-none focus:border-[#6B1D2F] dark:focus:border-[#8B1E3F] focus:ring-1 focus:ring-[#6B1D2F] transition-all duration-300 placeholder:text-[#292524]/50 dark:placeholder:text-white/40 text-sm";
  
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
