'use client';

import React from 'react';

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;
  required?: boolean;
  error?: string | null;
  rows?: number;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
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
}) => {
  const baseClasses = "w-full bg-canvas border border-border rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 transition-all duration-300 placeholder:text-slate/50 text-sm";
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs text-slate font-semibold tracking-widest uppercase flex justify-between">
          <span>{label} {required && <span className="text-burgundy">*</span>}</span>
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
          className={`${baseClasses} resize-none ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200/30' : ''}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${baseClasses} ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200/30' : ''}`}
        />
      )}
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};

export default Input;
