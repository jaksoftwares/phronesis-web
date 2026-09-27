'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function UpcomingClassesWidget() {
  const classes = [
    { id: 'c1', title: 'A-Level Mathematics', topic: 'Integration Techniques', time: '10:00 AM', duration: '90m', students: 24, isLive: true },
    { id: 'c2', title: 'O-Level Physics', topic: 'Kinematics', time: '01:00 PM', duration: '60m', students: 18, isLive: false },
    { id: 'c3', title: 'Advanced Chemistry', topic: 'Organic Synthesis', time: '03:30 PM', duration: '60m', students: 12, isLive: false },
  ];

  return (
    <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-[var(--color-mist)] flex items-center justify-between bg-gradient-to-r from-white to-[var(--color-cloud)]">
        <h3 className="text-lg font-bold text-[var(--color-ink)] flex items-center gap-2">
          <svg className="w-5 h-5 text-[var(--color-phronesis-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Today's Classes
        </h3>
        <Link href="/teacher/calendar" className="text-sm font-medium text-[var(--color-phronesis-blue)] hover:underline">
          View Calendar
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {classes.map((cls, idx) => (
          <motion.div 
            key={cls.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-xl border-2 transition-all ${cls.isLive ? 'border-[var(--color-phronesis-teal)] bg-[#197C7A]/5' : 'border-[var(--color-mist)] hover:border-gray-300'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${cls.isLive ? 'bg-[var(--color-phronesis-teal)] text-white animate-pulse' : 'bg-[var(--color-cloud)] text-[var(--color-slate)]'}`}>
                  {cls.isLive ? 'Live Now' : cls.time}
                </span>
                <h4 className="font-bold text-[var(--color-ink)] mt-1">{cls.title}</h4>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-[var(--color-slate)] flex items-center gap-1 justify-end">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  {cls.students}
                </span>
                <span className="text-xs text-[var(--color-slate)]">{cls.duration}</span>
              </div>
            </div>
            
            <p className="text-sm text-[var(--color-slate)] mb-4">{cls.topic}</p>
            
            {cls.isLive ? (
              <button className="w-full py-2 bg-[var(--color-phronesis-teal)] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-md flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                Enter Classroom
              </button>
            ) : (
              <button className="w-full py-2 bg-[var(--color-cloud)] text-[var(--color-ink)] text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors border border-[var(--color-mist)]">
                Prepare Materials
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
