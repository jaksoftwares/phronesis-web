'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function SubscriptionStatusCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[var(--color-phronesis-blue)] to-[#0f2844] rounded-[var(--radius-card)] p-6 shadow-sm h-full flex flex-col text-white"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Billing & Access</h3>
        <div className="p-2 bg-white/10 rounded-full">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-4">
          <p className="text-sm text-white/70 font-medium mb-1">Current Plan</p>
          <div className="flex items-end gap-2">
            <h4 className="text-3xl font-bold">Premium</h4>
            <span className="text-sm text-white/70 mb-1">/ Family</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm bg-white/10 p-3 rounded-lg">
            <span className="text-white/80">Status</span>
            <span className="font-semibold text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between text-sm bg-white/10 p-3 rounded-lg">
            <span className="text-white/80">Next Billing</span>
            <span className="font-semibold">Oct 15, 2026</span>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full py-3 bg-[var(--color-phronesis-gold)] hover:bg-[#c49835] text-[var(--color-ink)] font-bold rounded-[var(--radius-input)] transition-colors">
        Manage Subscription
      </button>
    </motion.div>
  );
}
