'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api/axios';

export function LinkedLearnersWidget() {
  const [learners, setLearners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const res = await api.get('/guardians/me/learners');
        setLearners(res.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch learners', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLearners();
  }, []);

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-sm border border-[var(--color-mist)] relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[var(--color-ink)] flex items-center gap-2">
          <svg className="w-5 h-5 text-[var(--color-phronesis-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          Linked Dependents
        </h3>
        <Link href="/guardian/dependents" className="text-sm font-semibold text-[var(--color-phronesis-blue)] hover:underline">
          View Detailed Analytics
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center text-sm text-slate-500 py-4">Loading dependents...</div>
        ) : learners.length === 0 ? (
          <div className="col-span-2 text-center text-sm text-slate-500 py-4">No dependents linked.</div>
        ) : (
          learners.map((l, i) => (
            <div key={l.learnerProfileId || i} className="p-4 rounded-xl border border-[var(--color-mist)] bg-[#F5F7F9] hover:bg-white hover:border-[var(--color-phronesis-blue)] hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--color-cloud)] border-2 border-white shadow-sm flex items-center justify-center relative uppercase">
                <span className="font-bold text-[var(--color-slate)] text-lg">{l.firstName?.charAt(0)}{l.lastName?.charAt(0)}</span>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500`}></span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[var(--color-ink)]">{l.firstName} {l.lastName}</h4>
                <p className="text-xs text-[var(--color-slate)] font-medium">Linked Dependent</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[var(--color-mist)] flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-[var(--color-slate)] tracking-wider">Current GPA</p>
                <p className="text-lg font-bold text-[var(--color-phronesis-teal)]">--</p>
              </div>
              <Link href={`/guardian/dashboard?learnerId=${l.learnerProfileId}`}>
                <button className="px-4 py-1.5 text-xs font-bold text-[var(--color-phronesis-blue)] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  Report Card
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
