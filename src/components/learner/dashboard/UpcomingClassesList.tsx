'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface UpcomingClass {
  id: string;
  title: string;
  className: string;
  startTime: string;
  endTime: string;
  joinUrl: string | null;
}

interface UpcomingClassesListProps {
  classes: UpcomingClass[] | undefined;
}

export function UpcomingClassesList({ classes }: UpcomingClassesListProps) {
  if (!classes || classes.length === 0) {
    return (
      <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] flex flex-col items-center justify-center text-center h-full min-h-[300px] border border-[var(--color-mist)]">
        <div className="w-16 h-16 bg-[var(--color-cloud)] rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[var(--color-slate)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-1">No Upcoming Classes</h3>
        <p className="text-[var(--color-slate)] text-sm max-w-[200px]">You have no scheduled virtual classes for today.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[var(--color-ink)]">Today's Schedule</h3>
        <button className="text-sm font-medium text-[var(--color-phronesis-teal)] hover:underline">View Calendar</button>
      </div>

      <div className="space-y-4">
        {classes.map((cls, index) => {
          const startDate = new Date(cls.startTime);
          const timeString = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const isNow = Math.abs(startDate.getTime() - Date.now()) < 3600000; // Within an hour
          
          return (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={cls.id}
              className={`relative pl-4 py-3 border-l-2 ${isNow ? 'border-[var(--color-phronesis-gold)]' : 'border-[var(--color-mist)]'} hover:bg-[var(--color-cloud)] transition-colors rounded-r-lg group`}
            >
              {isNow && (
                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--color-phronesis-gold)] rounded-full border-2 border-white shadow-sm" />
              )}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-xs font-semibold text-[var(--color-phronesis-teal)] mb-1">{timeString}</p>
                  <h4 className="font-semibold text-[var(--color-ink)] text-sm">{cls.title}</h4>
                  <p className="text-xs text-[var(--color-slate)]">{cls.className}</p>
                </div>
                {cls.joinUrl && isNow ? (
                  <a 
                    href={cls.joinUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="shrink-0 px-3 py-1.5 bg-[var(--color-phronesis-blue)] text-white text-xs font-medium rounded-md hover:bg-opacity-90 transition-opacity"
                  >
                    Join Now
                  </a>
                ) : (
                  <span className="shrink-0 px-3 py-1.5 bg-[var(--color-mist)] text-[var(--color-slate)] text-xs font-medium rounded-md">
                    Scheduled
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
