'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface QuizItem {
  id: string;
  title: string;
  subject: string;
  type: 'Mock Exam' | 'Topical Quiz' | 'Assignment';
  duration: number; // minutes
  totalQuestions: number;
  dueDate?: string;
  status: 'Pending' | 'Completed';
  score?: number;
}

interface QuizCardProps {
  quiz: QuizItem;
}

export function QuizCard({ quiz }: QuizCardProps) {
  const isPending = quiz.status === 'Pending';
  
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(22, 58, 95, 0.1)' }}
      className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-5 flex flex-col h-full transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
            quiz.type === 'Mock Exam' ? 'bg-red-100 text-red-700' :
            quiz.type === 'Assignment' ? 'bg-blue-100 text-blue-700' :
            'bg-green-100 text-green-700'
          }`}>
            {quiz.type}
          </span>
          <span className="text-[10px] font-bold uppercase text-[var(--color-slate)] border border-[var(--color-mist)] px-2 py-1 rounded">
            {quiz.subject}
          </span>
        </div>
        {isPending ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Pending
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Completed
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2 line-clamp-2">{quiz.title}</h3>
      
      <div className="flex items-center gap-4 mt-2 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-[var(--color-slate)]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {quiz.duration} min
        </div>
        <div className="flex items-center gap-1.5 text-sm text-[var(--color-slate)]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {quiz.totalQuestions} Qs
        </div>
      </div>

      <div className="mt-auto">
        {isPending ? (
          <Link href={`/learner/assessments/${quiz.id}`} className="block w-full text-center py-2.5 bg-[#163A5F] text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors">
            Start Assessment
          </Link>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[var(--color-slate)] uppercase tracking-wider font-semibold">Score</span>
              <span className="text-xl font-bold text-[var(--color-phronesis-gold)]">{quiz.score}%</span>
            </div>
            <Link href={`/learner/assessments/${quiz.id}/results`} className="px-4 py-2 border border-[var(--color-mist)] text-[var(--color-ink)] font-medium rounded-lg hover:bg-[var(--color-cloud)] transition-colors">
              View Results
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
