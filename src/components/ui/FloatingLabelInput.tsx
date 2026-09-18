import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, className = '', id, required, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

    const isPasswordType = type === 'password';
    const currentType = isPasswordType && showPassword ? 'text' : type;

    return (
      <div className={`relative w-full mb-4 ${className}`}>
        <input
          ref={ref}
          id={inputId}
          type={currentType}
          placeholder=" "
          className={`
            peer w-full h-14 px-4 pt-4 pb-1 text-ink bg-white border 
            rounded-[var(--radius-input)] outline-none transition-all
            ${isPasswordType ? 'pr-12' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-phronesis-blue focus:ring-1 focus:ring-phronesis-blue/20'}
          `}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none text-slate-400
            top-4 text-base
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-slate-500
            peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-500
            ${error ? 'text-red-500 peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:text-red-500' : ''}
          `}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[14px] text-slate-400 hover:text-phronesis-blue transition-colors focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';
