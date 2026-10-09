'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/axios';

export default function AdminReportsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Status update state
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/support/tickets');
      setTickets(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignToMe = async (id: string) => {
    try {
      await api.post(`/admin/support/tickets/${id}/assign`);
      fetchTickets();
    } catch (err) {
      alert('Failed to assign ticket.');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await api.post(`/admin/support/tickets/${id}/status`, { status: newStatus });
      fetchTickets();
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#163A5F]">Trust & Safety</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#163A5F]" />
          </div>
        ) : tickets.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No reports or support tickets found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Reporter</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Agent</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-500">{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{t.user?.firstName} {t.user?.lastName}<br/><span className="text-xs text-slate-500">{t.user?.email}</span></td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">{t.subject}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]" title={t.description}>{t.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        t.category === 'Abuse' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        t.status === 'Open' ? 'bg-yellow-100 text-yellow-700' : 
                        t.status === 'Closed' || t.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {t.assignedAgent ? `${t.assignedAgent.firstName} ${t.assignedAgent.lastName}` : <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {!t.assignedAgent && t.status !== 'Closed' && t.status !== 'Resolved' && (
                        <button 
                          onClick={() => handleAssignToMe(t.id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          Assign to Me
                        </button>
                      )}
                      {t.status !== 'Closed' && t.status !== 'Resolved' && (
                        <button 
                          onClick={() => handleUpdateStatus(t.id, 'Resolved')}
                          disabled={updatingId === t.id}
                          className="text-xs font-semibold px-3 py-1.5 rounded border border-green-200 text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50"
                        >
                          {updatingId === t.id ? '...' : 'Resolve'}
                        </button>
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
