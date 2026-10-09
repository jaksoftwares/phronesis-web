'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios';

export default function GradingEvaluationPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-4rem)] bg-[#F5F7F9]"
    >
      {/* Header */}
      <div className="h-16 bg-white border-b border-[var(--color-mist)] flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 text-[var(--color-slate)] hover:bg-[var(--color-cloud)] rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="text-[var(--color-ink)] font-bold">Algebra: Linear Equations Quiz</h1>
            <p className="text-[var(--color-slate)] text-xs">Submission by <span className="font-semibold">Alex Mercer</span> • Submitted 2 hours ago</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-md uppercase tracking-wider text-xs">
            Needs Grading
          </span>
        </div>
      </div>

      {/* Split Screen Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Student Submission Document Viewer */}
        <div className="flex-1 border-r border-[var(--color-mist)] bg-[var(--color-cloud)] overflow-y-auto p-8 relative">
          
          <div className="max-w-3xl mx-auto bg-white min-h-[800px] shadow-lg rounded-sm border border-gray-200 p-12">
            <h2 className="text-2xl font-bold mb-8 text-center underline decoration-gray-300 underline-offset-8">Algebra: Linear Equations Quiz</h2>
            
            <div className="space-y-12">
              <div>
                <p className="font-bold text-lg mb-2">1. What is the value of x in the equation 2x + 5 = 15?</p>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg inline-block">
                  <span className="text-blue-900 font-medium">Student Answer: 5</span>
                </div>
              </div>

              <div>
                <p className="font-bold text-lg mb-2">2. Solve the inequality: -3x &gt; 12</p>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg inline-block">
                  <span className="text-blue-900 font-medium">Student Answer: x &gt; -4</span>
                </div>
                <div className="mt-2 text-sm text-red-500 font-medium">
                  * Automatic flag: Incorrect sign flip detected.
                </div>
              </div>

              <div>
                <p className="font-bold text-lg mb-2">3. Explain the steps to solve a system of linear equations using the substitution method.</p>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 font-medium leading-relaxed">
                    First, you solve one of the equations for either x or y. Then, you take that expression and plug it into the other equation. This gives you an equation with only one variable. You solve for that variable, and then plug the number back into the first equation to get the other variable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Grading Rubric & Feedback Form */}
        <div className="w-[450px] bg-white flex flex-col shrink-0 relative z-20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Total Score Input */}
            <div>
              <label className="block text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider mb-2">Total Score</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  className="w-24 text-2xl font-bold text-center px-2 py-3 border-2 border-gray-300 rounded-lg focus:border-[var(--color-phronesis-blue)] focus:outline-none focus:ring-0" 
                  placeholder="--"
                  max={100}
                />
                <span className="text-2xl font-bold text-[var(--color-slate)]">/ 100</span>
              </div>
            </div>

            {/* Rubric Breakdown */}
            <div>
              <label className="block text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider mb-4">Rubric Breakdown</label>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-xl bg-[#F5F7F9]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-[var(--color-ink)]">Q1: Simple Linear Equation</span>
                    <span className="text-xs font-bold text-[var(--color-slate)]">/ 20</span>
                  </div>
                  <input type="number" className="w-full px-3 py-1.5 border border-gray-300 rounded focus:border-[var(--color-phronesis-blue)] text-sm" placeholder="Enter points..." defaultValue="20" />
                </div>
                
                <div className="p-4 border border-gray-200 rounded-xl bg-[#F5F7F9]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-[var(--color-ink)]">Q2: Inequality Rules</span>
                    <span className="text-xs font-bold text-[var(--color-slate)]">/ 30</span>
                  </div>
                  <input type="number" className="w-full px-3 py-1.5 border border-red-300 bg-red-50 rounded focus:border-red-500 text-sm" placeholder="Enter points..." defaultValue="0" />
                </div>
                
                <div className="p-4 border border-gray-200 rounded-xl bg-[#F5F7F9]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-[var(--color-ink)]">Q3: Conceptual Explanation</span>
                    <span className="text-xs font-bold text-[var(--color-slate)]">/ 50</span>
                  </div>
                  <input type="number" className="w-full px-3 py-1.5 border border-gray-300 rounded focus:border-[var(--color-phronesis-blue)] text-sm" placeholder="Enter points..." defaultValue="45" />
                </div>
              </div>
            </div>

            {/* Written Feedback */}
            <div>
              <label className="block text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider mb-2">Overall Feedback</label>
              <textarea 
                className="w-full h-40 p-3 border-2 border-gray-300 rounded-xl focus:border-[var(--color-phronesis-blue)] focus:outline-none resize-none text-sm"
                placeholder="Write your feedback for the student here..."
                defaultValue="Great explanation of the substitution method, Alex! However, please review the rules for inequalities. When dividing by a negative number, you must flip the inequality sign."
              />
            </div>
            
          </div>

          {/* Action Bar */}
          <div className="p-6 border-t border-[var(--color-mist)] bg-[#F5F7F9] flex gap-3">
            <button 
              onClick={() => router.back()}
              className="flex-1 py-3 bg-white border border-[var(--color-mist)] text-[var(--color-ink)] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Save Draft
            </button>
            <button 
              onClick={async () => {
                try {
                  await api.post(`/grading/submissions/${params.id}/grade`, { score: 65, feedback: "Great work!" });
                  router.push('/teacher/grading');
                } catch (err) {
                  console.error(err);
                }
              }}
              className="flex-1 py-3 bg-[var(--color-phronesis-teal)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
            >
              Publish Grade
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
