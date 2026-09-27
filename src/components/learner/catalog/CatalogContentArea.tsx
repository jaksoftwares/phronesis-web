'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentItem, ContentCard } from '@/components/learner/catalog/ContentCard';
import { SecureViewerModal } from './SecureViewerModal';

// Mock data
const MOCK_CATALOG: ContentItem[] = [
  {
    id: 'c1',
    title: 'Introduction to Algebraic Expressions',
    subject: 'Mathematics',
    type: 'Video',
    duration: '45 min',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    rating: 4.8
  },
  {
    id: 'c2',
    title: 'Cellular Respiration and Photosynthesis',
    subject: 'Science',
    type: 'Document',
    duration: '12 pages',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    rating: 4.6
  },
  {
    id: 'c3',
    title: 'World War II: The European Theater',
    subject: 'History',
    type: 'Video',
    duration: '55 min',
    thumbnail: 'https://images.unsplash.com/photo-1552250575-e508473b090f?w=800&q=80',
    rating: 4.9
  },
  {
    id: 'c4',
    title: 'Literary Analysis: To Kill a Mockingbird',
    subject: 'English',
    type: 'Interactive',
    duration: '30 min',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    rating: 4.7
  },
  {
    id: 'c5',
    title: 'Trigonometric Functions & Identities',
    subject: 'Mathematics',
    type: 'Video',
    duration: '60 min',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    rating: 4.5
  },
  {
    id: 'c6',
    title: 'The Renaissance Art Movement',
    subject: 'Art',
    type: 'Document',
    duration: '25 pages',
    thumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
    rating: 4.9
  }
];

interface CatalogContentAreaProps {
  selectedGrade: string;
  selectedSubject: string;
}

export function CatalogContentArea({ selectedGrade, selectedSubject }: CatalogContentAreaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  // Filter logic
  const filteredCatalog = MOCK_CATALOG.filter(item => {
    const matchesSubject = selectedSubject === 'All Subjects' || item.subject === selectedSubject;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Search and Sort Bar */}
      <div className="bg-white rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[var(--color-phronesis-blue)] focus:border-[var(--color-phronesis-blue)] sm:text-sm transition-colors"
            placeholder="Search curriculum topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm text-[var(--color-slate)] whitespace-nowrap">Sort by:</span>
          <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--color-phronesis-blue)] focus:border-[var(--color-phronesis-blue)] sm:text-sm rounded-md bg-[var(--color-cloud)] border">
            <option>Most Relevant</option>
            <option>Highest Rated</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1">
        {filteredCatalog.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl border border-[var(--color-mist)] border-dashed">
            <p className="text-[var(--color-slate)] text-lg">No content found matching your filters.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-[var(--color-phronesis-blue)] hover:underline font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCatalog.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ContentCard item={item} onClick={setSelectedItem} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Secure Viewer Modal */}
      <AnimatePresence>
        {selectedItem && (
          <SecureViewerModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
