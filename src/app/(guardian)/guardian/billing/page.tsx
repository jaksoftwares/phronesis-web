'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MOCK_INVOICES = [
  { id: 'INV-2026-09', date: 'Sept 15, 2026', amount: '$149.00', status: 'Paid', plan: 'Family Premium' },
  { id: 'INV-2026-08', date: 'Aug 15, 2026', amount: '$149.00', status: 'Paid', plan: 'Family Premium' },
  { id: 'INV-2026-07', date: 'Jul 15, 2026', amount: '$149.00', status: 'Paid', plan: 'Family Premium' },
];

export default function GuardianBillingPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-7xl mx-auto space-y-8 pb-12 pt-6"
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Billing & Subscriptions</h1>
        <p className="text-[var(--color-slate)] text-lg max-w-2xl">
          Manage your active plans, payment methods, and download past invoices.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Plan Card (Takes 1 column) */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-gradient-to-br from-[#163A5F] to-[#112a45] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <svg className="w-6 h-6 text-[#D5A63A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                Active Plan
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-1">Family Premium</h3>
              <p className="text-white/70 text-sm mb-6">Covers 2 dependents • Unlimited Live Classes</p>
              
              <div className="p-4 bg-black/20 rounded-lg border border-white/10 mb-6">
                <p className="text-sm text-white/60 mb-1">Next Billing Date</p>
                <div className="flex justify-between items-end">
                  <p className="font-bold text-lg">Oct 15, 2026</p>
                  <p className="font-bold text-[#D5A63A] text-xl">$149.00</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full py-2.5 bg-white text-[#163A5F] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                  Change Plan
                </button>
                <button className="w-full py-2.5 bg-transparent border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6">
            <h3 className="text-lg font-bold text-[var(--color-ink)] mb-4">Payment Method</h3>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-blue-800 rounded flex items-center justify-center text-white text-[10px] font-bold italic">VISA</div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-ink)]">•••• •••• •••• 4242</p>
                  <p className="text-xs text-[var(--color-slate)]">Expires 12/28</p>
                </div>
              </div>
              <button className="text-[var(--color-phronesis-blue)] text-sm font-bold hover:underline">Edit</button>
            </div>
          </motion.div>
        </div>

        {/* Invoice History (Takes 2 columns) */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-2 bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
          <div className="p-6 border-b border-[var(--color-mist)] bg-[#F5F7F9]">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">Billing History</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-mist)] text-xs uppercase tracking-wider text-[var(--color-slate)] font-bold">
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-mist)]">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-[var(--color-ink)]">{inv.id}</td>
                  <td className="p-4 text-[var(--color-slate)] font-medium">{inv.date}</td>
                  <td className="p-4 text-sm text-[var(--color-slate)]">{inv.plan}</td>
                  <td className="p-4 font-bold text-[var(--color-ink)]">{inv.amount}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[var(--color-phronesis-blue)] hover:underline text-sm font-semibold flex items-center justify-end gap-1 w-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </motion.div>
  );
}
