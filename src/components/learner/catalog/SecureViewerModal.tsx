'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContentItem } from '@/components/learner/catalog/ContentCard';

interface SecureViewerModalProps {
  item: ContentItem;
  onClose: () => void;
}

export function SecureViewerModal({ item, onClose }: SecureViewerModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#17212B]/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-[#F5F7F9] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full"
      >
        {/* Header */}
        <div className="bg-[#163A5F] px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider">
                {item.type}
              </span>
              <span className="text-sm font-medium text-[#D5A63A]">{item.subject}</span>
            </div>
            <h2 className="text-xl font-bold">{item.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Anti-piracy watermark overlay container */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[400px]">
          {/* Watermark */}
          <div className="absolute inset-0 pointer-events-none flex flex-wrap items-center justify-center opacity-10 z-10 select-none overflow-hidden">
             {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="text-white text-xl font-mono p-8 transform -rotate-45">
                  ID: LNR-8942
                </div>
             ))}
          </div>

          {/* Fake Content area */}
          {item.type === 'Video' ? (
            <div className="relative w-full h-full">
              <img src={item.thumbnail} className="w-full h-full object-cover opacity-50" alt="Video placeholder" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                  <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white w-full max-w-3xl h-full overflow-y-auto p-12 text-black">
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                <div className="h-4 w-full bg-gray-100 rounded mt-8"></div>
                <div className="h-4 w-4/5 bg-gray-100 rounded"></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-600 hover:text-[#163A5F] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              Save for later
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-[#163A5F] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Ask Teacher
            </button>
          </div>
          
          <button className="px-6 py-2 bg-[#197C7A] text-white rounded font-medium hover:bg-opacity-90 transition-colors">
            Mark as Completed
          </button>
        </div>
      </motion.div>
    </div>
  );
}
