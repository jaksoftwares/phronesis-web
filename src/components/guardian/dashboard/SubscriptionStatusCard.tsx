'use client';

import React from 'react';
import Link from 'next/link';

export function SubscriptionStatusCard() {
  return (
    <div className="bg-gradient-to-br from-[#163A5F] to-[#112a45] rounded-xl p-6 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
            <svg className="w-6 h-6 text-[#D5A63A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
          <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
            Active
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-1">Family Premium Plan</h3>
        <p className="text-white/70 text-sm mb-6">Covers 2 dependents • All Live Classes Included</p>
        
        <div className="space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Next Billing Date</span>
            <span className="font-semibold text-white">Oct 15, 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Amount Due</span>
            <span className="font-bold text-[#D5A63A]">$149.00</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10">
        <Link href="/guardian/billing">
          <button className="w-full py-2.5 bg-white text-[#163A5F] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
            Manage Billing
          </button>
        </Link>
      </div>
    </div>
  );
}
