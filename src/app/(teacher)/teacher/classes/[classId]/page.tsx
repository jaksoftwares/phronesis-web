'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api/axios';

export default function ClassDetailsPage() {
  const { classId } = useParams();
  const router = useRouter();
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!classId) return;
    (async () => {
      try {
        const res = await api.get(`/teachers/me/classes/${classId}`);
        setClassData(res.data?.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load class details.');
      } finally {
        setLoading(false);
      }
    })();
  }, [classId]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-phronesis-blue)]" />
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <p className="text-red-500 mb-4">{error || 'Class not found'}</p>
        <button onClick={() => router.back()} className="text-[var(--color-phronesis-blue)] hover:underline">Go Back</button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8 pb-12 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-[var(--color-mist)] flex items-center justify-center text-[var(--color-slate)] hover:text-[var(--color-phronesis-blue)] hover:border-[var(--color-phronesis-blue)] transition-colors shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)]">{classData.name}</h1>
          <p className="text-[var(--color-slate)] font-medium mt-1">{classData.schedule} • {classData.students.length} Students</p>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-mist)] bg-gradient-to-r from-white to-[var(--color-cloud)] flex justify-between items-center">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Class Roster</h2>
          <button className="px-4 py-2 bg-white border border-[var(--color-mist)] rounded-lg text-sm font-semibold text-[var(--color-slate)] hover:bg-gray-50 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export CSV
          </button>
        </div>
        
        {classData.students.length === 0 ? (
          <div className="p-12 text-center text-[var(--color-slate)]">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <p>No students enrolled yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-cloud)] text-[var(--color-slate)] text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Student Name</th>
                  <th className="px-6 py-4 font-semibold">Reg Number</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-mist)]">
                {classData.students.map((student: any) => (
                  <tr key={student.enrollmentId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-phronesis-teal)] text-white flex items-center justify-center font-bold text-sm">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <span className="font-semibold text-[var(--color-ink)]">{student.firstName} {student.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--color-slate)] font-mono text-sm">{student.registrationNumber || 'N/A'}</td>
                    <td className="px-6 py-4 text-[var(--color-slate)]">{student.email}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[var(--color-phronesis-blue)] font-medium hover:underline text-sm">View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
