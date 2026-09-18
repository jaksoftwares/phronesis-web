'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeWidgetProps {
  user: { firstName: string; lastName: string } | undefined;
  learningStreak: number;
}

export function WelcomeWidget({ user, learningStreak }: WelcomeWidgetProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[var(--radius-panel)] p-8 shadow-[var(--shadow-institutional)] bg-[#163A5F] text-white"
    >
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-2 font-serif italic text-[#D5A63A]">
          Genesis of Knowledge
        </h2>
        {user ? (
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {user.firstName}
          </h1>
        ) : (
          <div className="h-10 w-64 bg-white/20 rounded animate-pulse mb-4"></div>
        )}
        <p className="text-[#E9EEF2] text-lg max-w-lg mb-6 leading-relaxed">
          Your dedication to excellence is inspiring. Ready to continue your journey?
        </p>
        
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
          <svg className="w-5 h-5 text-[#D5A63A]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-white">{learningStreak} Day Streak</span>
        </div>
      </div>

      {/* Decorative Brand Elements */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-[#197C7A] rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-20 -mb-20 w-48 h-48 bg-[#D5A63A] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
    </motion.div>
  );
}
