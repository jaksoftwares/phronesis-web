'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/api/axios';

export default function TeacherAssessmentsPage() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/assessments/teacher/me');
        setAssessments(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
      className="max-w-7xl mx-auto space-y-8 pb-12 pt-6"
    >
      {/* Header */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Assessments Hub</h1>
          <p className="text-[var(--color-slate)] text-lg max-w-2xl">
            Track class performance, manage active assignments, and review analytics.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/teacher/grading">
            <button className="px-6 py-2.5 bg-white border border-[var(--color-mist)] text-[var(--color-ink)] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              Go to Grading
            </button>
          </Link>
          <Link href="/teacher/content/new">
            <button className="px-6 py-2.5 bg-[#163A5F] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-md">
              + New Assessment
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Analytics Overview */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[var(--color-mist)] rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-2">Global Avg Score</h3>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-bold text-[var(--color-ink)]">82%</p>
            <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded mb-1">+4% this term</span>
          </div>
        </div>
        <div className="bg-white border border-[var(--color-mist)] rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-2">Active Assignments</h3>
          <p className="text-4xl font-bold text-[var(--color-ink)]">5</p>
          <p className="text-sm text-[var(--color-slate)] mt-1">Across 3 different cohorts</p>
        </div>
        <div className="bg-white border border-[var(--color-mist)] rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-2">Needs Grading</h3>
          <p className="text-4xl font-bold text-orange-500">24</p>
          <p className="text-sm text-[var(--color-slate)] mt-1">Submissions waiting for review</p>
        </div>
      </motion.div>

      {/* Assessment Tracking Table */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-mist)] bg-[#F5F7F9] flex justify-between items-center">
          <h2 className="text-lg font-bold text-[var(--color-ink)]">Class Assessments</h2>
          <select className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:border-[var(--color-phronesis-blue)]">
            <option>All Classes</option>
            <option>Grade 11 Alpha</option>
            <option>Grade 9 Beta</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-mist)] text-xs uppercase tracking-wider text-[var(--color-slate)] font-bold">
                <th className="p-4">Assessment</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Completion</th>
                <th className="p-4">Avg Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-mist)]">
              {assessments.map((assessment) => (
                <tr key={assessment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-[var(--color-ink)]">{assessment.title}</p>
                    <p className="text-xs text-[var(--color-slate)]">{assessment.subject}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-[var(--color-slate)]">
                    {assessment.assignedClass}
                  </td>
                  <td className="p-4 text-sm font-semibold text-[var(--color-ink)]">
                    {assessment.dueDate}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-24">
                        <div 
                          className={`h-full rounded-full ${assessment.completionRate === 100 ? 'bg-green-500' : 'bg-[var(--color-phronesis-blue)]'}`} 
                          style={{ width: `${assessment.completionRate}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[var(--color-slate)]">{assessment.completionRate}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {assessment.avgScore ? (
                      <span className={`text-sm font-bold ${assessment.avgScore >= 80 ? 'text-green-600' : 'text-orange-500'}`}>
                        {assessment.avgScore}%
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium italic">Pending</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                      assessment.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {assessment.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button className="text-[var(--color-phronesis-blue)] hover:underline text-sm font-semibold">Analytics</button>
                    <button className="text-[var(--color-phronesis-slate)] hover:underline text-sm font-semibold">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
