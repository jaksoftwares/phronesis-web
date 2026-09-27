'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RecentResource {
  id: string;
  contentId: string;
  title: string;
  contentType: string;
  completionPercentage: number;
  lastEngagedAt: string;
}

interface RecentActivityFeedProps {
  resources: RecentResource[] | undefined;
}

export function RecentActivityFeed({ resources }: RecentActivityFeedProps) {
  if (!resources || resources.length === 0) {
    return (
      <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] min-h-[300px]">
        <h3 className="text-xl font-bold text-[var(--color-ink)] mb-6">Recent Activity</h3>
        <p className="text-[var(--color-slate)] text-sm text-center mt-12">No recent activity to display.</p>
      </div>
    );
  }

  // Define icons based on content type
  const getIconForType = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('video')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (t.includes('quiz') || t.includes('assessment')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    }
    // Document/PDF default
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[var(--color-ink)]">Recent Activity</h3>
        <button className="text-sm font-medium text-[var(--color-phronesis-teal)] hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {resources.map((res, i) => {
          const date = new Date(res.lastEngagedAt);
          const dateString = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={res.id}
              className="group cursor-pointer rounded-xl border border-transparent hover:border-[var(--color-mist)] hover:bg-[var(--color-cloud)] p-3 -mx-3 transition-all duration-200"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 shrink-0 bg-[#F5F7F9] border border-[var(--color-mist)] text-[var(--color-phronesis-teal)] rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-phronesis-teal)] opacity-50"></div>
                  {getIconForType(res.contentType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-semibold text-[var(--color-ink)] text-sm truncate group-hover:text-[var(--color-phronesis-blue)] transition-colors leading-tight">
                      {res.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--color-slate)] capitalize font-medium">{res.contentType}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-xs text-[var(--color-slate)]">{dateString}</span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1 w-16">
                  <span className="text-xs font-bold text-[var(--color-ink)]">{res.completionPercentage}%</span>
                  <div className="w-full h-1.5 bg-[var(--color-mist)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--color-phronesis-gold)] rounded-full"
                      style={{ width: `${res.completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
