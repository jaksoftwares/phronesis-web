'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/axios';

export default function AdminNotificationsPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('All');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/notifications/history');
      setHistory(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return alert('Title and Message are required.');
    
    setIsSending(true);
    try {
      const res = await api.post('/admin/notifications/broadcast', {
        title,
        message,
        targetAudience
      });
      alert(res.data.message);
      setTitle('');
      setMessage('');
      fetchHistory();
    } catch (err) {
      alert('Failed to send broadcast.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#163A5F]">Announcements & Broadcasts</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Composer */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 self-start">
          <h2 className="text-xl font-bold text-[#163A5F] mb-4">New Broadcast</h2>
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <select 
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-[#163A5F]"
              >
                <option value="All">All Users (Global)</option>
                <option value="Teacher">All Teachers</option>
                <option value="Learner">All Learners</option>
                <option value="Guardian">All Guardians</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-[#163A5F]"
                placeholder="Announcement Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea 
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 h-32 focus:ring-[#163A5F]"
                placeholder="Write your message here..."
              />
            </div>
            <button 
              type="submit"
              disabled={isSending || !title || !message}
              className="w-full py-2 px-4 bg-[#163A5F] hover:bg-opacity-90 text-white font-semibold rounded-lg shadow disabled:opacity-50 transition-colors"
            >
              {isSending ? 'Broadcasting...' : 'Send Broadcast'}
            </button>
          </form>
        </div>

        {/* History */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-[#163A5F]">Broadcast History</h2>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#163A5F]" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No previous broadcasts found.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {history.map((h, i) => (
                <div key={i} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900">{h.title}</h3>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {new Date(h.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4 whitespace-pre-wrap">{h.message}</p>
                  <div className="flex items-center text-sm font-medium text-indigo-600">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Reached {h.recipientCount} users
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
