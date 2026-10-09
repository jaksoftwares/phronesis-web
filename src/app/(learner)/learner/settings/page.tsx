'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
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
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Account Settings</h1>
        <p className="text-[var(--color-slate)] text-lg">
          Manage your personal details, preferences, and notifications.
        </p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6">
        <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-slate)] mb-2">First Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-phronesis-blue)] focus:border-[var(--color-phronesis-blue)]" defaultValue="Jane" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-slate)] mb-2">Last Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-phronesis-blue)] focus:border-[var(--color-phronesis-blue)]" defaultValue="Doe" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[var(--color-slate)] mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-phronesis-blue)] focus:border-[var(--color-phronesis-blue)] bg-gray-50" defaultValue="jane.doe@example.com" disabled />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-[#163A5F] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            Save Changes
          </button>
        </div>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Subscription & Billing</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full uppercase tracking-wider">Plan Management</span>
        </div>
        <p className="text-slate-600 mb-6">Manage your premium access and subscription packages here.</p>
        <button 
          onClick={() => window.location.href = '/learner/subscription'}
          className="w-full md:w-auto px-6 py-3 bg-[var(--color-phronesis-gold)] text-white rounded-lg font-bold hover:bg-opacity-90 transition-colors shadow-md"
        >
          View Subscription Plans
        </button>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6">
        <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--color-ink)]">Class Reminders</p>
              <p className="text-sm text-[var(--color-slate)]">Get notified 15 minutes before a live class starts.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-phronesis-blue)]"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--color-ink)]">Assignment Deadlines</p>
              <p className="text-sm text-[var(--color-slate)]">Get notified 24 hours before an assignment is due.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-phronesis-blue)]"></div>
            </label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
