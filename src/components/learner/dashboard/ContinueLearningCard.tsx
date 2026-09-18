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

interface ContinueLearningCardProps {
  resource: RecentResource | null | undefined;
}

export function ContinueLearningCard({ resource }: ContinueLearningCardProps) {
  if (!resource) {
    return (
      <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] flex flex-col justify-center min-h-[220px]">
        <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">Continue Learning</h3>
        <p className="text-[var(--color-slate)] text-sm mb-6">You haven't started any topics yet. Explore the curriculum to begin.</p>
        <button className="px-4 py-2 bg-[var(--color-phronesis-blue)] text-white font-medium rounded-[var(--radius-sm)] hover:bg-opacity-90 self-start transition-colors">
          Explore Curriculum
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] flex flex-col justify-between min-h-[220px]"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-[var(--color-ink)]">Continue Learning</h3>
          <span className="px-2.5 py-1 bg-[var(--color-cloud)] text-[var(--color-phronesis-teal)] text-[10px] font-bold uppercase tracking-wider rounded-sm">
            {resource.contentType}
          </span>
        </div>
        <h4 className="text-[var(--color-slate)] font-medium mb-1 line-clamp-1">{resource.title}</h4>
        
        <div className="mt-6">
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-[var(--color-ink)]">Progress</span>
            <span className="text-[var(--color-phronesis-gold)]">{resource.completionPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-[var(--color-mist)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${resource.completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[var(--color-phronesis-gold)]"
            />
          </div>
        </div>
      </div>

      <button className="mt-6 w-full py-2.5 bg-[var(--color-phronesis-blue)] text-white font-medium rounded-[var(--radius-sm)] hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
        Resume Topic
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
}
