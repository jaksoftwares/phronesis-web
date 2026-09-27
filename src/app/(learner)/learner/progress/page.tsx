'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SubjectMasteryChart } from '@/components/learner/progress/SubjectMasteryChart';
import { StudyTimeChart } from '@/components/learner/progress/StudyTimeChart';

export default function ProgressPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-7xl mx-auto space-y-8 pb-12"
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">My Progress</h1>
        <p className="text-[var(--color-slate)] text-lg max-w-2xl">
          Track your learning journey, review subject mastery, and analyze your weekly study habits.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--color-phronesis-teal)]/10 text-[var(--color-phronesis-teal)] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider">Topics Completed</p>
              <h4 className="text-3xl font-bold text-[var(--color-ink)]">42</h4>
            </div>
          </div>
          <div className="text-sm font-medium text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            12% increase from last month
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--color-phronesis-gold)]/10 text-[var(--color-phronesis-gold)] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider">Study Hours</p>
              <h4 className="text-3xl font-bold text-[var(--color-ink)]">22.1<span className="text-lg text-[var(--color-slate)] font-medium ml-1">hrs</span></h4>
            </div>
          </div>
          <div className="text-sm font-medium text-[var(--color-slate)] flex items-center gap-1">
            Across 7 days
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#163A5F]/10 text-[#163A5F] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider">Current Streak</p>
              <h4 className="text-3xl font-bold text-[var(--color-ink)]">14<span className="text-lg text-[var(--color-slate)] font-medium ml-1">days</span></h4>
            </div>
          </div>
          <div className="text-sm font-medium text-[var(--color-phronesis-gold)] flex items-center gap-1">
            Personal best!
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="h-full">
          <SubjectMasteryChart />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="h-full">
          <StudyTimeChart />
        </motion.div>
      </div>
    </motion.div>
  );
}
