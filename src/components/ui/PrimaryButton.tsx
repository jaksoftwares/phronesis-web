import React from 'react';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, isLoading, variant = 'primary', className = '', disabled, ...props }, ref) => {
    
    const baseStyles = 'w-full h-12 px-6 font-semibold rounded-[var(--radius-input)] transition-all flex items-center justify-center';
    
    const variants = {
      primary: 'bg-phronesis-blue text-white hover:bg-[#112a45] shadow-sm',
      secondary: 'bg-phronesis-gold text-white hover:bg-[#b88c2b] shadow-sm',
      outline: 'bg-transparent border-2 border-phronesis-blue text-phronesis-blue hover:bg-phronesis-blue/5'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${(disabled || isLoading) ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.98]'}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';
