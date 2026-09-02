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
  const baseClasses = "w-full bg-[#FAFAF9] border border-[#C59A9F] rounded-lg px-4 py-3 text-[#1C1917] focus:outline-none focus:border-[#6B1D2F] focus:ring-1 focus:ring-[#6B1D2F] transition-all duration-300 placeholder:text-[#78716C]/40 text-sm";
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs text-[#78716C] font-semibold tracking-widest uppercase flex justify-between">
          <span>{label} {required && <span className="text-[#6B1D2F]">*</span>}</span>
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
