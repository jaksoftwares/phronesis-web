'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TeacherSettingsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8 pb-12 pt-6">
      <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Settings</h1>
      <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-8">
        <h2 className="text-xl font-bold text-[var(--color-ink)] mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[var(--color-phronesis-blue)] focus:ring-[var(--color-phronesis-blue)]" />
            <span className="font-medium text-[var(--color-slate)]">Email me when a student submits an assignment late</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[var(--color-phronesis-blue)] focus:ring-[var(--color-phronesis-blue)]" />
            <span className="font-medium text-[var(--color-slate)]">Email me a daily summary of ungraded assessments</span>
          </label>
        </div>
        
        <h2 className="text-xl font-bold text-[var(--color-ink)] mt-10 mb-4">Security</h2>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-[var(--color-ink)] font-medium hover:bg-gray-50">Change Password</button>
      </div>
    </motion.div>
  );
}
