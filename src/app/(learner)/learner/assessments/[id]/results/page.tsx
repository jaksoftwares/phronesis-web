'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AssessmentResultsPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-4xl mx-auto space-y-8 pb-12 pt-6"
    >
      {/* Header Results Summary */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
        <div className="bg-[#163A5F] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[var(--color-phronesis-gold)] rounded-full mix-blend-screen filter blur-3xl opacity-40 pointer-events-none" />
          
          <h1 className="text-2xl font-bold text-white mb-2">Assessment Completed</h1>
          <h2 className="text-lg font-medium text-[#E9EEF2] mb-8">Algebra: Linear Equations</h2>
          
          <div className="inline-flex flex-col items-center justify-center w-40 h-40 rounded-full border-8 border-[var(--color-phronesis-gold)] bg-white/10 backdrop-blur-md shadow-2xl mb-4 relative z-10">
            <span className="text-5xl font-bold text-white tracking-tighter">85%</span>
            <span className="text-sm font-semibold text-[#D5A63A] uppercase tracking-wider">Score</span>
          </div>
          
          <p className="text-white text-lg font-light mt-4">Great job! You have demonstrated a solid understanding of linear equations.</p>
        </div>
        
        <div className="grid grid-cols-3 divide-x divide-[var(--color-mist)] p-6 bg-white text-center">
          <div>
            <p className="text-xs font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-1">Time Taken</p>
            <p className="text-xl font-bold text-[var(--color-ink)]">24:12</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-1">Correct Answers</p>
            <p className="text-xl font-bold text-[var(--color-phronesis-teal)]">17 / 20</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-1">Status</p>
            <p className="text-xl font-bold text-green-600">Passed</p>
          </div>
        </div>
      </motion.div>

      {/* Review Section */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[var(--color-ink)]">Detailed Review</h3>
          <Link href="/learner/assessments" className="text-sm font-medium text-[var(--color-phronesis-blue)] hover:underline">
            Back to Assessments
          </Link>
        </div>

        <div className="space-y-6">
          {/* Correct Question */}
          <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-green-500" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="font-bold text-[var(--color-ink)]">Question 1</span>
            </div>
            <p className="text-lg text-[var(--color-ink)] mb-4 font-medium">What is the value of x in the equation 2x + 5 = 15?</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <span className="text-xs font-bold text-green-800 uppercase tracking-wider block mb-1">Your Answer (Correct)</span>
              <span className="text-green-900 font-medium">5</span>
            </div>
          </div>

          {/* Incorrect Question */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <span className="font-bold text-[var(--color-ink)]">Question 2</span>
            </div>
            <p className="text-lg text-[var(--color-ink)] mb-4 font-medium">Solve the inequality: -3x &gt; 12</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <span className="text-xs font-bold text-red-800 uppercase tracking-wider block mb-1">Your Answer</span>
                <span className="text-red-900 font-medium line-through">x &gt; -4</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <span className="text-xs font-bold text-green-800 uppercase tracking-wider block mb-1">Correct Answer</span>
                <span className="text-green-900 font-medium">x &lt; -4</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-[var(--color-cloud)] rounded-lg border border-[var(--color-mist)]">
              <span className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider flex items-center gap-1 mb-2">
                <svg className="w-4 h-4 text-[var(--color-phronesis-gold)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                Teacher's Explanation
              </span>
              <p className="text-sm text-[var(--color-slate)] leading-relaxed">
                Remember, when you divide or multiply an inequality by a negative number, you must flip the inequality sign. Dividing by -3 changes &gt; to &lt;.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
