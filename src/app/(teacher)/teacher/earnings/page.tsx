'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api/axios';

export default function EarningsPage() {
  const [earnings, setEarnings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/teachers/me/earnings');
        setEarnings(res.data?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !earnings) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]" />
      </div>
    );
  }

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
      {/* Header */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Earnings & Payouts</h1>
          <p className="text-[var(--color-slate)] text-lg max-w-2xl">
            Track your billable hours, view payout history, and manage financial details.
          </p>
        </div>
        <button className="px-6 py-2.5 bg-white border border-[var(--color-mist)] text-[var(--color-ink)] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Download Tax Statement
        </button>
      </motion.div>

      {/* Financial Overview Cards */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Current Balance */}
        <div className="bg-gradient-to-br from-[#163A5F] to-[#112a45] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2 relative z-10">Pending Next Payout</h3>
          <p className="text-4xl font-bold mb-1 relative z-10">${earnings.balance.toFixed(2)}</p>
          <p className="text-sm text-white/70 relative z-10">For Sept 15 - Present</p>
          
          <div className="mt-6 pt-4 border-t border-white/20 flex justify-between items-center relative z-10">
            <span className="text-sm font-medium">Scheduled for:</span>
            <span className="font-bold">Sept 30, 2026</span>
          </div>
        </div>

        {/* YTD Earnings */}
        <div className="bg-white border border-[var(--color-mist)] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-1">Total Earned (YTD)</h3>
            <p className="text-3xl font-bold text-[var(--color-ink)]">${earnings.ytdEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg w-max">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            +15% from last year
          </div>
        </div>

        {/* Current Rate */}
        <div className="bg-white border border-[var(--color-mist)] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-[#197C7A]/10 text-[var(--color-phronesis-teal)] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-1">Base Hourly Rate</h3>
            <p className="text-3xl font-bold text-[var(--color-ink)]">${earnings.hourlyRate.toFixed(2)}<span className="text-lg text-[var(--color-slate)] font-medium">/hr</span></p>
          </div>
          <p className="mt-4 text-sm text-[var(--color-slate)]">
            Rate based on Tier 2 Instructor status. Next tier review in 45 days.
          </p>
        </div>

      </motion.div>

      {/* Payout History Ledger */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-mist)] flex justify-between items-center bg-[#F5F7F9]">
          <h2 className="text-lg font-bold text-[var(--color-ink)]">Payout History</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--color-slate)] font-semibold">Filter:</span>
            <select className="text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:border-[var(--color-phronesis-blue)]">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-mist)] text-xs uppercase tracking-wider text-[var(--color-slate)] font-bold">
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Hours</th>
                <th className="p-4">Rate</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-mist)]">
              {earnings.ledger.map((tx: any) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-[var(--color-ink)]">{tx.date}</td>
                  <td className="p-4 text-[var(--color-slate)] text-sm">{tx.description}</td>
                  <td className="p-4 font-medium text-[var(--color-ink)]">{tx.hours}</td>
                  <td className="p-4 text-[var(--color-slate)] text-sm">{tx.rate}</td>
                  <td className="p-4 text-right font-bold text-[var(--color-ink)] text-lg">{tx.amount}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[var(--color-phronesis-blue)] hover:underline text-sm font-semibold">Invoice</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
