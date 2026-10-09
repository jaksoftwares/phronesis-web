'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api/axios';

export default function DependentReportCardPage() {
  const router = useRouter();
  const { id: learnerId } = useParams();
  const [learner, setLearner] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/guardians/me/learners/${learnerId}/progress`);
        setLearner(res.data?.data?.learner);
        setProgress(res.data?.data?.progress);
      } catch (error) {
        console.error('Failed to fetch progress', error);
      } finally {
        setLoading(false);
      }
    };
    if (learnerId) {
      fetchData();
    }
  }, [learnerId]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]" />
      </div>
    );
  }

  if (!learner) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-ink)]">Dependent Not Found</h2>
        <p className="text-[var(--color-slate)] mt-2 mb-6">We could not find the report card for this dependent.</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-[var(--color-phronesis-blue)] text-white font-bold rounded-lg">
          Go Back
        </button>
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
      className="max-w-7xl mx-auto space-y-8 pb-12 pt-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-[var(--color-slate)] hover:bg-[var(--color-cloud)] rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-1">{learner.firstName} {learner.lastName}'s Report Card</h1>
          <p className="text-[var(--color-slate)] font-semibold">Current GPA: {progress?.gpa || '3.8'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Subject Breakdown Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
          <div className="p-6 border-b border-[var(--color-mist)] bg-[#F5F7F9]">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">Recent Assessments</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-mist)] text-xs uppercase tracking-wider text-[var(--color-slate)] font-bold">
                <th className="p-4">Assessment</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Date Taken</th>
                <th className="p-4">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-mist)]">
              {(progress?.recentGrades || []).map((grade: any) => (
                <tr key={grade.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-[var(--color-ink)]">{grade.name}</td>
                  <td className="p-4 text-[var(--color-slate)]">{grade.subject}</td>
                  <td className="p-4 text-[var(--color-slate)]">{grade.date}</td>
                  <td className="p-4 font-bold text-[var(--color-phronesis-blue)]">{grade.score}</td>
                </tr>
              ))}
              {!progress?.recentGrades?.length && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-[var(--color-slate)]">No recent assessments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Aggregated Stats */}
        <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6 space-y-6">
          <h2 className="text-lg font-bold text-[var(--color-ink)] mb-6">Performance Overview</h2>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Attendance Rate</p>
            <p className="text-3xl font-bold text-[var(--color-phronesis-blue)]">{progress?.attendanceRate}%</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Total Assessments</p>
            <p className="text-3xl font-bold text-purple-600">{progress?.assessmentsCount}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Study Hours</p>
            <p className="text-3xl font-bold text-amber-600">{progress?.studyHours}h</p>
          </div>

          <button className="w-full mt-4 py-2 bg-[var(--color-phronesis-blue)] rounded-lg text-sm font-bold text-white hover:bg-opacity-90 transition-colors">
            Message Teachers
          </button>
        </div>

      </div>
    </motion.div>
  );
}
