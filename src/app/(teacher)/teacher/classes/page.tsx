'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/api/axios';

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/teachers/me/classes');
        setClasses(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8 pb-12 pt-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">My Classes</h1>
          <p className="text-[var(--color-slate)] text-lg">Manage your assigned cohorts and view student rosters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6">
            <h2 className="text-xl font-bold text-[var(--color-ink)] mb-2">{cls.name}</h2>
            <div className="flex items-center gap-4 text-sm text-[var(--color-slate)] mb-6">
              <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> {cls.students} Students</span>
              <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {cls.schedule}</span>
            </div>
            <div className="flex gap-3">
              <Link href={`/teacher/classes/${cls.id}`} className="flex-1">
                <button className="w-full py-2 bg-[var(--color-phronesis-blue)] text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors">
                  View Roster
                </button>
              </Link>
              <Link href={`/teacher/classroom/${cls.id}`} className="flex-1"><button className="w-full py-2 bg-white border border-[var(--color-mist)] text-[var(--color-ink)] font-medium rounded-lg hover:bg-gray-50 transition-colors">Go Live</button></Link>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
