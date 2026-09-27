'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function ProgressSummaryWidget() {
  const overallProgress = 68;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[var(--color-ink)]">Overall Progress</h3>
        <Link href="/learner/progress" className="text-sm font-medium text-[var(--color-phronesis-teal)] hover:underline">
          View Detailed
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Simple Circular Progress using SVG */}
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-[var(--color-cloud)] stroke-current"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <motion.circle
              className="text-[var(--color-phronesis-gold)] stroke-current"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              initial={{ strokeDasharray: '251.2', strokeDashoffset: '251.2' }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * overallProgress) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            ></motion.circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-bold text-[var(--color-ink)]">{overallProgress}%</span>
            <span className="text-[10px] text-[var(--color-slate)] uppercase tracking-wider font-semibold">Mastered</span>
          </div>
        </div>
        
        <p className="text-sm text-center text-[var(--color-slate)] max-w-[200px]">
          You are making great progress across your enrolled subjects this term!
        </p>
      </div>
    </div>
  );
}
