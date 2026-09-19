'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGuardianDashboard } from '@/hooks/api/useGuardianDashboard';

export function LinkedLearnersWidget() {
  const { learners, primaryLearnerProgress } = useGuardianDashboard();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[var(--radius-card)] p-6 shadow-sm border border-[var(--color-mist)] h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[var(--color-ink)]">My Dependents</h3>
        <button className="text-sm font-medium text-[var(--color-phronesis-blue)] hover:text-[var(--color-phronesis-teal)] transition-colors">
          + Link Learner
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {learners.isLoading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-20 w-full bg-[var(--color-mist)] rounded-[var(--radius-input)] animate-pulse"></div>
            ))}
          </div>
        ) : learners.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-16 h-16 bg-[var(--color-cloud)] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[var(--color-slate)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-[var(--color-ink)] mb-1">No learners linked</h4>
            <p className="text-sm text-[var(--color-slate)] max-w-[200px]">Link a learner using their registration ID to track their progress.</p>
          </div>
        ) : (
          learners.data?.map((learner, idx) => (
            <div 
              key={learner.learnerProfileId}
              className={`p-4 rounded-[var(--radius-input)] border ${idx === 0 ? 'border-[var(--color-phronesis-blue)] bg-[var(--color-cloud)]' : 'border-[var(--color-mist)] bg-white'} transition-all hover:shadow-md cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-phronesis-blue)] flex items-center justify-center text-white font-bold">
                    {learner.firstName.charAt(0)}{learner.lastName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-ink)]">{learner.firstName} {learner.lastName}</h4>
                    <p className="text-xs font-medium text-[var(--color-slate)] uppercase tracking-wider">
                      {learner.relationshipType === 0 ? 'Parent' : learner.relationshipType === 1 ? 'Guardian' : 'Sponsor'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-[var(--color-slate)]">Active</span>
                </div>
              </div>

              {idx === 0 && primaryLearnerProgress.data && (
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[var(--color-mist)]">
                  <div>
                    <p className="text-xs text-[var(--color-slate)] font-medium mb-1">Completed Topics</p>
                    <p className="text-lg font-bold text-[var(--color-ink)]">{primaryLearnerProgress.data.completedTopics}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-slate)] font-medium mb-1">In Progress</p>
                    <p className="text-lg font-bold text-[var(--color-ink)]">{primaryLearnerProgress.data.inProgressTopics}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
