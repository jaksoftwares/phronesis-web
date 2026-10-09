'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/axios';

export default function AdminClassesPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/classes/sessions');
      setSessions(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isLive = (status: number) => status === 1; // 1 is InProgress

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#163A5F]">Live Class Oversight</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#163A5F]" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No class sessions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Teacher</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      {isLive(s.status) ? (
                        <span className="flex items-center text-xs font-bold text-red-600">
                          <span className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                          LIVE
                        </span>
                      ) : (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          s.status === 2 ? 'bg-green-100 text-green-700' : 
                          s.status === 3 ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {s.status === 2 ? 'Completed' : s.status === 3 ? 'Cancelled' : 'Scheduled'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{s.title}</td>
                    <td className="px-6 py-4 text-slate-600">{s.className}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">
                      {s.teacher?.firstName} {s.teacher?.lastName}
                      <div className="text-xs text-slate-500 font-normal">{s.teacher?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(s.startTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isLive(s.status) && s.meetingLink && (
                        <a 
                          href={s.meetingLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs font-semibold px-3 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Audit Session
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
