'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PortalSwitcherProps {
  currentPortal: 'learner' | 'guardian' | 'teacher';
  type: 'login' | 'register';
}

export function PortalSwitcher({ currentPortal, type }: PortalSwitcherProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    if (role === 'learner') {
      router.push(`/learner/${type}`);
    } else if (role === 'guardian') {
      router.push(`/guardian/${type}`);
    } else if (role === 'teacher') {
      // Teachers might use "apply" instead of "register"
      if (type === 'register') {
        router.push('/teacher/apply');
      } else {
        router.push(`/teacher/${type}`);
      }
    }
  };

  return (
    <div className="mb-6 relative z-10">
      <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">
        {type === 'login' ? 'Signing in as:' : 'Registering as:'}
      </label>
      <div className="relative">
        <select
          className="block w-full px-4 py-3 bg-[var(--color-cloud)] border border-[var(--color-mist)] rounded-[var(--radius-input)] text-[var(--color-ink)] font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--color-phronesis-blue)] transition-all appearance-none cursor-pointer hover:border-[var(--color-phronesis-blue)]"
          value={currentPortal}
          onChange={handleChange}
        >
          <option value="learner">Learner (Student)</option>
          <option value="guardian">Guardian / Parent</option>
          <option value="teacher">Teacher / Educator</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
