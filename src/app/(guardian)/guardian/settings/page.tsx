'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GuardianSettingsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8 pb-12 pt-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Settings</h1>
        <p className="text-[var(--color-slate)] text-lg">Manage your account preferences and notification settings.</p>
      </div>

      <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
        
        {/* Notifications Section */}
        <div className="p-8 border-b border-[var(--color-mist)]">
          <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--color-phronesis-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Academic Alerts
          </h2>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[var(--color-phronesis-blue)] focus:ring-[var(--color-phronesis-blue)]" />
              <div>
                <span className="block font-bold text-[var(--color-ink)]">Missing Assignments</span>
                <span className="block text-xs text-[var(--color-slate)] font-medium">Alert me immediately if a dependent misses a deadline.</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[var(--color-phronesis-blue)] focus:ring-[var(--color-phronesis-blue)]" />
              <div>
                <span className="block font-bold text-[var(--color-ink)]">Low Assessment Scores</span>
                <span className="block text-xs text-[var(--color-slate)] font-medium">Alert me if a dependent scores below 70% on a major test.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[var(--color-phronesis-blue)] focus:ring-[var(--color-phronesis-blue)]" />
              <div>
                <span className="block font-bold text-[var(--color-ink)]">Live Class Attendance</span>
                <span className="block text-xs text-[var(--color-slate)] font-medium">Alert me if a dependent is absent from a scheduled live class.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Weekly Reports */}
        <div className="p-8 border-b border-[var(--color-mist)]">
          <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--color-phronesis-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Weekly Digest
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[var(--color-ink)]">Email Weekly Summary</p>
              <p className="text-sm text-[var(--color-slate)] font-medium">Receive a comprehensive report of all dependents every Friday afternoon.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-phronesis-teal)]"></div>
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Security</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[var(--color-ink)]">Password</p>
              <p className="text-sm text-[var(--color-slate)] font-medium">Last changed 3 months ago.</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-[var(--color-ink)] font-bold hover:bg-gray-50 transition-colors text-sm">
              Change Password
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
