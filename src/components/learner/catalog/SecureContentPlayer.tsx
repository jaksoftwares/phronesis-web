import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SecureContentPlayerProps {
  uri: string;
  type: string; // 'Video', 'Document', 'Pdf', etc.
  onClose: () => void;
  learnerId?: string;
}

export function SecureContentPlayer({ uri, type, onClose, learnerId = 'LNR-8942-S' }: SecureContentPlayerProps) {
  // Prevent context menu to deter simple saving
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    // Prevent keyboard shortcuts (Ctrl+S, Ctrl+P, F12)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i'))
      ) {
        e.preventDefault();
        alert('Security restriction: Action disabled.');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isVideo = type.toLowerCase().includes('video') || uri.endsWith('.mp4');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col font-sans backdrop-blur-sm"
    >
      {/* Header Controls */}
      <div className="h-14 bg-[#0F172A] border-b border-white/10 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-white font-semibold text-sm">Secure Viewer (DRM Active)</h2>
        </div>
        <button 
          onClick={onClose}
          className="px-4 py-1.5 bg-red-500/20 text-red-500 hover:bg-red-500/30 font-semibold rounded text-sm transition-colors"
        >
          Close Viewer
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden select-none">
        
        {/* The Content itself */}
        {isVideo ? (
          <video 
            src={uri} 
            controls 
            controlsList="nodownload noremoteplayback" 
            disablePictureInPicture
            className="max-w-full max-h-full object-contain pointer-events-auto"
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
          />
        ) : (
          <div className="relative w-full h-full bg-white/5 p-4 md:p-12 overflow-y-auto custom-scrollbar flex justify-center">
             {/* 
               For full PDF protection we would render canvas pages via pdf.js here. 
               For now, we iframe it but place a transparent div OVER it to block right clicks and downloads on the iframe.
             */}
             <div className="relative w-full max-w-5xl bg-white shadow-2xl min-h-screen">
                <iframe 
                  src={`${uri}#toolbar=0`} 
                  className="w-full h-full min-h-[1200px]"
                  title="Secure Document"
                />
                {/* Anti-interaction overlay to prevent iframe download buttons */}
                <div className="absolute inset-0 z-10" />
             </div>
          </div>
        )}

        {/* Dynamic Watermark Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] z-50 overflow-hidden mix-blend-overlay">
           {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="text-white text-4xl font-mono p-16 transform -rotate-45">
                {learnerId} - {new Date().toISOString().split('T')[0]}
              </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
