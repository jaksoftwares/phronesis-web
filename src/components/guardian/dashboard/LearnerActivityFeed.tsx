'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGuardianDashboard } from '@/hooks/api/useGuardianDashboard';

export function LearnerActivityFeed() {
  const { primaryLearnerActivity } = useGuardianDashboard();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[var(--radius-card)] p-6 shadow-sm border border-[var(--color-mist)] h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[var(--color-ink)]">Recent Activity</h3>
      </div>

      <div className="flex-1">
        {primaryLearnerActivity.isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 w-full bg-[var(--color-mist)] rounded-[var(--radius-input)] animate-pulse"></div>
            ))}
          </div>
        ) : primaryLearnerActivity.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-12 h-12 bg-[var(--color-cloud)] rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[var(--color-slate)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-[var(--color-slate)]">No recent activity found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {primaryLearnerActivity.data?.map((activity) => (
              <div key={activity.id} className="flex gap-4 p-3 hover:bg-[var(--color-cloud)] rounded-[var(--radius-input)] transition-colors border border-transparent hover:border-[var(--color-mist)]">
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${activity.isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {activity.isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--color-ink)] line-clamp-1">{activity.contentTitle}</h4>
                  <p className="text-xs text-[var(--color-slate)] mt-1">
                    {activity.isCompleted ? 'Completed on' : 'Started on'} {new Date(activity.lastAccessedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
