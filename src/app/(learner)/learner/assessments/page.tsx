'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizItem, QuizCard } from '@/components/learner/assessments/QuizCard';

const MOCK_QUIZZES: QuizItem[] = [
  {
    id: 'q1',
    title: 'Algebra: Linear Equations & Inequalities',
    subject: 'Mathematics',
    type: 'Topical Quiz',
    duration: 30,
    totalQuestions: 15,
    status: 'Pending'
  },
  {
    id: 'q2',
    title: 'Mid-Term Mock Exam: Combined Sciences',
    subject: 'Science',
    type: 'Mock Exam',
    duration: 120,
    totalQuestions: 60,
    status: 'Pending'
  },
  {
    id: 'q3',
    title: 'Essay Assignment: Themes in Shakespeare',
    subject: 'English',
    type: 'Assignment',
    duration: 90,
    totalQuestions: 3,
    status: 'Pending'
  },
  {
    id: 'q4',
    title: 'Trigonometry Fundamentals',
    subject: 'Mathematics',
    type: 'Topical Quiz',
    duration: 45,
    totalQuestions: 20,
    status: 'Completed',
    score: 85
  },
  {
    id: 'q5',
    title: 'World War II Timeline Assessment',
    subject: 'History',
    type: 'Topical Quiz',
    duration: 25,
    totalQuestions: 10,
    status: 'Completed',
    score: 100
  }
];

export default function AssessmentsPage() {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const filteredQuizzes = MOCK_QUIZZES.filter(q => filter === 'All' || q.status === filter);
  
  const pendingCount = MOCK_QUIZZES.filter(q => q.status === 'Pending').length;
  const completedCount = MOCK_QUIZZES.filter(q => q.status === 'Completed').length;

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
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Assessments & Quizzes</h1>
        <p className="text-[var(--color-slate)] text-lg max-w-2xl">
          Test your knowledge, complete assignments, and prepare for upcoming exams.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="border-b border-[var(--color-mist)] flex gap-8">
        <button 
          onClick={() => setFilter('All')}
          className={`pb-4 text-sm font-semibold transition-colors relative ${filter === 'All' ? 'text-[var(--color-phronesis-blue)]' : 'text-[var(--color-slate)] hover:text-[var(--color-ink)]'}`}
        >
          All Assessments
          {filter === 'All' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)] rounded-t-full" />}
        </button>
        <button 
          onClick={() => setFilter('Pending')}
          className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 ${filter === 'Pending' ? 'text-[var(--color-phronesis-blue)]' : 'text-[var(--color-slate)] hover:text-[var(--color-ink)]'}`}
        >
          Pending
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === 'Pending' ? 'bg-[var(--color-phronesis-blue)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}>
            {pendingCount}
          </span>
          {filter === 'Pending' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)] rounded-t-full" />}
        </button>
        <button 
          onClick={() => setFilter('Completed')}
          className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 ${filter === 'Completed' ? 'text-[var(--color-phronesis-blue)]' : 'text-[var(--color-slate)] hover:text-[var(--color-ink)]'}`}
        >
          Completed
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === 'Completed' ? 'bg-[var(--color-phronesis-blue)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}>
            {completedCount}
          </span>
          {filter === 'Completed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)] rounded-t-full" />}
        </button>
      </motion.div>

      {/* Grid */}
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredQuizzes.map(quiz => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
        {filteredQuizzes.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-[var(--color-mist)] border-dashed">
            <p className="text-[var(--color-slate)] text-lg">No assessments found in this category.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
