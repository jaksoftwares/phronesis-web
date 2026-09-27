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
        <button className="px-5 py-2.5 bg-[var(--color-phronesis-blue)] text-white font-medium rounded-[var(--radius-sm)] hover:bg-opacity-90 self-start transition-all hover:shadow-md">
          Explore Curriculum
        </button>
      </div>
    );
  }

  // A mock thumbnail image based on content type, or a generic abstract one
  const thumbnailUrl = resource.contentType.toLowerCase().includes('video') 
    ? 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=800&q=80' 
    : 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80';

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[var(--color-ink)]">Continue Learning</h3>
        <span className="px-3 py-1 bg-[var(--color-cloud)] text-[var(--color-phronesis-teal)] text-xs font-bold uppercase tracking-wider rounded-md">
          {resource.contentType}
        </span>
      </div>

      <motion.div 
        whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(22, 58, 95, 0.1), 0 8px 10px -6px rgba(22, 58, 95, 0.1)' }}
        className="group relative flex-1 border border-[var(--color-mist)] rounded-xl overflow-hidden cursor-pointer flex flex-col md:flex-row transition-all duration-300"
      >
        {/* Media Thumbnail */}
        <div className="w-full md:w-1/3 h-40 md:h-auto relative overflow-hidden bg-[var(--color-cloud)]">
          <img 
            src={thumbnailUrl} 
            alt="Resource Thumbnail" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#163A5F]/80 to-transparent flex items-end p-4">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg">
              {resource.contentType.toLowerCase().includes('video') ? (
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-white relative">
          <div>
            <h4 className="text-lg font-bold text-[var(--color-ink)] mb-2 line-clamp-2 group-hover:text-[var(--color-phronesis-blue)] transition-colors">
              {resource.title}
            </h4>
            <p className="text-sm text-[var(--color-slate)] mb-4">
              Last engaged {new Date(resource.lastEngagedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </p>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-[var(--color-ink)]">Progress</span>
              <span className="text-[var(--color-phronesis-gold)]">{resource.completionPercentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-[var(--color-cloud)] rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${resource.completionPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[var(--color-phronesis-gold)] to-[#E6B955]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
