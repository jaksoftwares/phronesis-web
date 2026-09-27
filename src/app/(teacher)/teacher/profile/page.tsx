'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TeacherProfilePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8 pb-12 pt-6">
      <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">My Profile</h1>
      <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-2xl">
            T
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-ink)]">Teacher Account</h2>
            <p className="text-[var(--color-slate)]">Tier 2 Instructor</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-slate)] mb-1">Bio</label>
            <textarea className="w-full border border-gray-300 rounded-lg p-3 resize-none h-32 focus:border-[var(--color-phronesis-blue)] outline-none" defaultValue="Passionate educator with 10 years of experience in STEM." />
          </div>
          <button className="px-6 py-2 bg-[var(--color-phronesis-blue)] text-white font-medium rounded-lg">Save Changes</button>
        </div>
      </div>
    </motion.div>
  );
}
