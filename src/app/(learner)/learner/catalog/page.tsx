'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CatalogSidebar } from '@/components/learner/catalog/CatalogSidebar';
import { CatalogContentArea } from '@/components/learner/catalog/CatalogContentArea';

export default function CatalogPage() {
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-7xl mx-auto space-y-6 pb-12 flex flex-col h-[calc(100vh-6rem)]"
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="shrink-0">
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Explore Curriculum</h1>
        <p className="text-[var(--color-slate)] text-lg max-w-2xl">
          Discover interactive video lessons, study materials, and assessments tailored to your grade.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left Sidebar - Filters */}
        <motion.div 
          variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
          className="w-full lg:w-64 shrink-0"
        >
          <CatalogSidebar 
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
          />
        </motion.div>

        {/* Main Content Area */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="flex-1 min-w-0"
        >
          <CatalogContentArea 
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
