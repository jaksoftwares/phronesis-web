'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api/axios';
import { QuizItem, QuizCard } from '@/components/learner/assessments/QuizCard';

export default function AssessmentsPage() {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await api.get('/assessments');
        // Map the backend structure to the frontend QuizItem structure if needed
        const data = res.data?.data?.map((a: any) => ({
          id: a.id,
          title: a.title,
          subject: a.subject || 'General',
          type: a.type,
          duration: a.duration,
          totalQuestions: a.totalQuestions,
          status: a.status,
          score: a.score
        })) || [];
        setQuizzes(data);
      } catch (err) {
        console.error('Failed to load assessments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  const filteredQuizzes = quizzes.filter(q => filter === 'All' || q.status === filter);
  
  const pendingCount = quizzes.filter(q => q.status === 'Pending').length;
  const completedCount = quizzes.filter(q => q.status === 'Completed').length;

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
