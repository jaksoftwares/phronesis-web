'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/axios';
import { motion } from 'framer-motion';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function AdminContentManagement() {
  const [activeTab, setActiveTab] = useState<'pending' | 'catalog'>('pending');
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [activeTab]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'pending' ? '/admin/content/pending' : '/admin/content/catalog';
      const res = await api.get(endpoint);
      setContent(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!reviewingId) return;
    setIsApproving(true);
    try {
      await api.post(`/admin/content/${reviewingId}/approve`, { feedback: feedback || 'Approved' });
      setReviewingId(null);
      setFeedback('');
      fetchContent();
    } catch (err) {
      alert('Failed to approve content');
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!reviewingId || !feedback) return alert('Feedback is required for rejection');
    setIsRejecting(true);
    try {
      await api.post(`/admin/content/${reviewingId}/reject`, { feedback });
      setReviewingId(null);
      setFeedback('');
      fetchContent();
    } catch (err) {
      alert('Failed to reject content');
    } finally {
      setIsRejecting(false);
    }
  };

  const handleArchive = async (id: string) => {
    if (!confirm('Are you sure you want to archive this content? It will no longer be visible to learners.')) return;
    try {
      await api.post(`/admin/content/${id}/archive`);
      fetchContent();
    } catch (err) {
      alert('Failed to archive content');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#163A5F]">Content & Curriculum</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'pending' ? 'border-[#163A5F] text-[#163A5F]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Pending Approvals
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'catalog' ? 'border-[#163A5F] text-[#163A5F]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Master Catalog
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#163A5F]" />
          </div>
        ) : content.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No content found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Type</th>
                  {activeTab === 'catalog' && <th className="px-6 py-4">Status</th>}
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {content.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{c.title}</td>
                    <td className="px-6 py-4 text-slate-600">{c.author?.firstName} {c.author?.lastName}</td>
                    <td className="px-6 py-4 text-slate-500">{c.subject} ({c.gradeLevel})</td>
                    <td className="px-6 py-4 text-slate-500">{c.contentType === 0 ? 'Video' : c.contentType === 1 ? 'Document' : 'Quiz'}</td>
                    {activeTab === 'catalog' && (
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          c.status === 2 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {c.status === 2 ? 'Published' : c.status === 3 ? 'Archived' : 'Draft'}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-right space-x-2">
                      {activeTab === 'pending' ? (
                        <button 
                          onClick={() => setReviewingId(c.id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Review
                        </button>
                      ) : (
                        c.status !== 3 && ( // 3 is archived
                          <button 
                            onClick={() => handleArchive(c.id)}
                            className="text-xs font-semibold px-3 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Archive
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewingId && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#163A5F]">Review Content</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Feedback / Notes</label>
                <textarea 
                  value={feedback} 
                  onChange={e => setFeedback(e.target.value)} 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 h-32 focus:ring-[#163A5F]" 
                  placeholder="Leave feedback for the author..." 
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setReviewingId(null)} className="px-4 py-2 font-semibold text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button 
                onClick={handleReject} 
                disabled={isRejecting || !feedback}
                className="px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50"
              >
                {isRejecting ? 'Rejecting...' : 'Reject & Return'}
              </button>
              <button 
                onClick={handleApprove} 
                disabled={isApproving}
                className="px-4 py-2 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
              >
                {isApproving ? 'Approving...' : 'Approve & Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
