'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DependentReportCardPage() {
  const router = useRouter();
  
  const mockScores = [
    { subject: 'Physics', recentScore: '92%', trend: '+4%', assignments: 12 },
    { subject: 'Mathematics', recentScore: '85%', trend: '-2%', assignments: 15 },
    { subject: 'Chemistry', recentScore: '88%', trend: '+1%', assignments: 8 },
    { subject: 'Literature', recentScore: '95%', trend: '+5%', assignments: 10 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-8 pb-12 pt-6"
    >
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-[var(--color-slate)] hover:bg-[var(--color-cloud)] rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-1">Alex Mercer's Report Card</h1>
          <p className="text-[var(--color-slate)] font-semibold">Grade 11 • Current GPA: 3.8</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Subject Breakdown Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
          <div className="p-6 border-b border-[var(--color-mist)] bg-[#F5F7F9]">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">Subject Performance</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-mist)] text-xs uppercase tracking-wider text-[var(--color-slate)] font-bold">
                <th className="p-4">Subject</th>
                <th className="p-4">Avg Score</th>
                <th className="p-4">Trend</th>
                <th className="p-4">Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-mist)]">
              {mockScores.map((s) => (
                <tr key={s.subject} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-[var(--color-ink)]">{s.subject}</td>
                  <td className="p-4 font-bold text-[var(--color-phronesis-blue)]">{s.recentScore}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${s.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {s.trend}
                    </span>
                  </td>
                  <td className="p-4 text-[var(--color-slate)] font-medium">{s.assignments} Assignments</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Teacher Feedback */}
        <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6">
          <h2 className="text-lg font-bold text-[var(--color-ink)] mb-6">Recent Teacher Feedback</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[var(--color-phronesis-teal)] pl-4">
              <p className="text-sm text-[var(--color-ink)] italic mb-2">"Alex has been showing great improvement in understanding complex algebraic expressions. Keep up the good work!"</p>
              <p className="text-xs font-bold text-[var(--color-slate)]">— Mr. Davis (Mathematics)</p>
            </div>
            <div className="border-l-4 border-[var(--color-phronesis-blue)] pl-4">
              <p className="text-sm text-[var(--color-ink)] italic mb-2">"Very active participant in today's live session on Kinematics."</p>
              <p className="text-xs font-bold text-[var(--color-slate)]">— Mrs. Smith (Physics)</p>
            </div>
          </div>
          <button className="w-full mt-8 py-2 border border-gray-300 rounded-lg text-sm font-bold text-[var(--color-ink)] hover:bg-gray-50 transition-colors">
            Message Teachers
          </button>
        </div>

      </div>
    </motion.div>
  );
}
