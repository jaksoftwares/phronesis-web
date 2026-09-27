'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SupportPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-4xl mx-auto space-y-8 pb-12 pt-6"
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-center">
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-4">How can we help you?</h1>
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for articles, guides, or FAQs..." 
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 shadow-sm focus:ring-[var(--color-phronesis-blue)] focus:border-[var(--color-phronesis-blue)] text-lg"
          />
          <svg className="w-6 h-6 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-blue-50 text-[var(--color-phronesis-blue)] rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">Knowledge Base</h3>
          <p className="text-[var(--color-slate)]">Read guides on how to navigate the classroom, submit assignments, and view your progress.</p>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-green-50 text-[var(--color-phronesis-teal)] rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">Submit a Ticket</h3>
          <p className="text-[var(--color-slate)]">Experiencing technical issues? Open a support ticket and our team will assist you shortly.</p>
        </motion.div>
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6 mt-8">
        <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Recent Tickets</h2>
        <div className="text-center py-8">
          <p className="text-[var(--color-slate)]">You have no open support tickets.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
