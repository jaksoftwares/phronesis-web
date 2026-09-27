'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ContentItem {
  id: string;
  title: string;
  subject: string;
  type: 'Video' | 'Document' | 'Interactive';
  duration: string;
  thumbnail: string;
  rating: number;
}

interface ContentCardProps {
  item: ContentItem;
  onClick: (item: ContentItem) => void;
}

export function ContentCard({ item, onClick }: ContentCardProps) {
  const getIcon = (type: string) => {
    if (type === 'Video') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl overflow-hidden shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] cursor-pointer group flex flex-col h-full transition-all duration-300 hover:shadow-xl"
      onClick={() => onClick(item)}
    >
      <div className="relative h-40 overflow-hidden bg-[var(--color-cloud)]">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
          {getIcon(item.type)}
          {item.duration}
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded text-[10px] font-bold text-[var(--color-phronesis-teal)] uppercase tracking-wide">
          {item.subject}
        </div>
        
        {/* Play overlay for hover state */}
        <div className="absolute inset-0 bg-[#163A5F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-75">
            <svg className="w-5 h-5 text-[var(--color-phronesis-blue)] ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-bold text-[var(--color-ink)] text-base mb-2 line-clamp-2 leading-tight group-hover:text-[var(--color-phronesis-blue)] transition-colors">
          {item.title}
        </h4>
        <div className="mt-auto pt-3 border-t border-[var(--color-mist)] flex items-center justify-between">
          <div className="flex items-center gap-1 text-[var(--color-phronesis-gold)]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-[var(--color-ink)]">{item.rating}</span>
          </div>
          <span className="text-xs font-semibold text-[var(--color-phronesis-blue)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            View Material
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
