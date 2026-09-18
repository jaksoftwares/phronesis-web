import React from 'react';

interface PasswordStrengthMeterProps {
  password?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(score, 4); // Max score 4
  };

  const strength = calculateStrength(password);

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-slate-200';
      case 1: return 'bg-red-400';
      case 2: return 'bg-orange-400';
      case 3: return 'bg-phronesis-gold';
      case 4: return 'bg-phronesis-teal';
      default: return 'bg-slate-200';
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0: return '';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              strength >= index ? getStrengthColor(strength) : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs mt-1 text-slate-500 text-right">
          {getStrengthText(strength)}
        </p>
      )}
    </div>
  );
};
