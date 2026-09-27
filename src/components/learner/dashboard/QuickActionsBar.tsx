'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function QuickActionsBar() {
  const actions = [
    {
      id: 'catalog',
      title: 'Browse Catalog',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: '/learner/catalog',
      color: 'bg-[var(--color-phronesis-blue)]',
      textColor: 'text-white'
    },
    {
      id: 'quiz',
      title: 'Take Quiz',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/learner/assessments',
      color: 'bg-white',
      textColor: 'text-[var(--color-ink)]'
    },
    {
      id: 'class',
      title: 'Join Next Class',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      href: '/learner/calendar',
      color: 'bg-[var(--color-phronesis-teal)]',
      textColor: 'text-white'
    },
    {
      id: 'progress',
      title: 'My Progress',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      href: '/learner/progress',
      color: 'bg-white',
      textColor: 'text-[var(--color-ink)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link href={action.href} key={action.id}>
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 p-4 rounded-xl shadow-sm border border-[var(--color-mist)] ${action.color} ${action.textColor} transition-shadow hover:shadow-md cursor-pointer`}
          >
            <div className={action.color === 'bg-white' ? 'text-[var(--color-phronesis-blue)]' : 'text-white'}>
              {action.icon}
            </div>
            <span className="font-semibold text-sm">{action.title}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
