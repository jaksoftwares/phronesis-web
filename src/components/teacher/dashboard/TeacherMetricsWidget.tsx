'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function TeacherMetricsWidget({ metrics: serverMetrics }: { metrics?: any }) {
  const metrics = [
    { label: 'Active Students', value: serverMetrics?.activeStudents || '0', change: '+12% this month', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Hours Taught', value: serverMetrics?.hoursTaught || '0', change: 'This week', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Pending Grading', value: serverMetrics?.pendingGrading || '0', change: 'Require attention', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { label: 'Avg Rating', value: serverMetrics?.avgRating || '0.0', change: 'Based on reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((m, idx) => (
        <motion.div 
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] flex items-center gap-4 group hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--color-cloud)] text-[var(--color-phronesis-blue)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-phronesis-blue)] group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.icon} /></svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-1">{m.label}</p>
            <p className="text-2xl font-bold text-[var(--color-ink)] leading-none">{m.value}</p>
            <p className="text-xs text-[var(--color-phronesis-teal)] font-medium mt-1">{m.change}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
