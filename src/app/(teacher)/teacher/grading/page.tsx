'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/api/axios';

export default function GradingInboxPage() {
  const [filter, setFilter] = useState<'Pending' | 'Graded'>('Pending');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/grading/inbox');
        setSubmissions(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredSubmissions = submissions.filter(sub => sub.status === filter);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]" />
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-7xl mx-auto space-y-6 pb-12 pt-6"
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Grading Inbox</h1>
        <p className="text-[var(--color-slate)] text-lg max-w-2xl">
          Review student submissions, provide feedback, and assign grades.
        </p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[var(--color-mist)] bg-[#F5F7F9]">
          <button 
            onClick={() => setFilter('Pending')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${filter === 'Pending' ? 'text-[var(--color-phronesis-blue)] bg-white' : 'text-[var(--color-slate)] hover:bg-gray-100'}`}
          >
            Needs Grading (3)
            {filter === 'Pending' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)]" />}
          </button>
          <button 
            onClick={() => setFilter('Graded')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${filter === 'Graded' ? 'text-[var(--color-phronesis-blue)] bg-white' : 'text-[var(--color-slate)] hover:bg-gray-100'}`}
          >
            Recently Graded
            {filter === 'Graded' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)]" />}
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-[var(--color-mist)]">
          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center text-[var(--color-slate)]">
              No {filter.toLowerCase()} submissions found. You're all caught up!
            </div>
          ) : (
            filteredSubmissions.map((sub, idx) => (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-[var(--color-cloud)] transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-mist)] flex items-center justify-center font-bold text-[var(--color-slate)]">
                    {sub.studentName.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-ink)] text-lg">{sub.assignmentTitle}</h3>
                    <p className="text-sm text-[var(--color-slate)]">
                      Submitted by <span className="font-semibold text-[var(--color-ink)]">{sub.studentName}</span> • {sub.submittedAt}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 self-start md:self-auto">
                  {sub.status === 'Graded' ? (
                    <div className="flex flex-col items-end mr-4">
                      <span className="text-xs font-semibold text-[var(--color-slate)] uppercase">Score</span>
                      <span className="text-xl font-bold text-[var(--color-phronesis-teal)]">{sub.score}</span>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-full">
                      Action Required
                    </span>
                  )}
                  
                  <Link href={`/teacher/grading/${sub.id}`}>
                    <button className={`px-6 py-2 rounded-lg font-medium transition-colors shadow-sm ${
                      sub.status === 'Pending' 
                        ? 'bg-[var(--color-phronesis-blue)] text-white hover:bg-opacity-90' 
                        : 'bg-white border border-[var(--color-mist)] text-[var(--color-ink)] hover:bg-gray-50'
                    }`}>
                      {sub.status === 'Pending' ? 'Grade Now' : 'Review'}
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
