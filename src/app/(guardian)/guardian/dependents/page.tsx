'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GuardianDependentsPage() {
  const learners = [
    { id: '1', name: 'Alex Mercer', grade: 'Grade 11', gpa: '3.8', attendance: '98%', nextClass: 'Physics (Today, 2:00 PM)', studyTime: '12h 45m (This week)' },
    { id: '2', name: 'Mia Mercer', grade: 'Grade 9', gpa: '3.9', attendance: '100%', nextClass: 'Algebra I (Tomorrow, 9:00 AM)', studyTime: '10h 20m (This week)' }
  ];

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
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">My Dependents</h1>
          <p className="text-[var(--color-slate)] text-lg max-w-2xl">
            Monitor the academic performance and learning habits of your children.
          </p>
        </div>
        <button className="px-6 py-2.5 bg-[var(--color-phronesis-blue)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-md">
          + Link New Dependent
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {learners.map((l) => (
          <motion.div key={l.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#F5F7F9] to-white border-b border-[var(--color-mist)] flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                  {l.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-ink)]">{l.name}</h2>
                  <p className="font-semibold text-[var(--color-slate)]">{l.grade}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                Active Student
              </span>
            </div>

            {/* Stats Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Current GPA</p>
                <p className="text-3xl font-bold text-[var(--color-phronesis-teal)]">{l.gpa}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Attendance</p>
                <p className="text-3xl font-bold text-[var(--color-phronesis-blue)]">{l.attendance}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Total Study Time</p>
                  <p className="text-lg font-bold text-[var(--color-ink)]">{l.studyTime}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 col-span-2">
                <p className="text-xs uppercase font-bold text-blue-800 mb-1">Next Live Class</p>
                <p className="text-sm font-bold text-blue-900">{l.nextClass}</p>
              </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <Link href={`/guardian/dependents/${l.id}`}>
                <button className="w-full py-3 bg-white border-2 border-[var(--color-phronesis-blue)] text-[var(--color-phronesis-blue)] font-bold rounded-lg hover:bg-blue-50 transition-colors">
                  View Full Report Card
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
