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

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] h-full">
      <h3 className="text-xl font-bold text-[var(--color-ink)] mb-6">Recent Activity</h3>
      
      <div className="space-y-5">
        {resources.map((res, i) => {
          const date = new Date(res.lastEngagedAt);
          const dateString = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={res.id}
              className="flex gap-4 items-start group cursor-pointer"
            >
              <div className="w-10 h-10 shrink-0 bg-[var(--color-cloud)] text-[var(--color-phronesis-teal)] rounded-full flex items-center justify-center group-hover:bg-[var(--color-phronesis-teal)] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="flex-1 min-w-0 border-b border-[var(--color-mist)] pb-5 group-last:border-0 group-last:pb-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="font-semibold text-[var(--color-ink)] text-sm truncate group-hover:text-[var(--color-phronesis-blue)] transition-colors">
                    {res.title}
                  </h4>
                  <span className="text-xs text-[var(--color-slate)] whitespace-nowrap">{dateString}</span>
                </div>
                <p className="text-xs text-[var(--color-slate)]">
                  Engaged with <span className="font-medium lowercase">{res.contentType}</span> • {res.completionPercentage}% complete
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
