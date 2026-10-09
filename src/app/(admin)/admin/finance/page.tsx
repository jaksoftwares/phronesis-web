'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/axios';

export default function AdminFinancePage() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'refunds'>('transactions');
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [refunds, setRefunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Refund processing state
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [refundNotes, setRefundNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'transactions') {
        const res = await api.get('/admin/finance/transactions');
        setTransactions(res.data?.data || []);
      } else {
        const res = await api.get('/admin/finance/refunds');
        setRefunds(res.data?.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessRefund = async (approve: boolean) => {
    if (!processingId) return;
    if (!approve && !refundNotes) return alert('Notes are required when rejecting a refund.');
    
    setIsSubmitting(true);
    try {
      await api.post(`/admin/finance/refunds/${processingId}/process`, {
        approve,
        notes: refundNotes || 'Processed'
      });
      setProcessingId(null);
      setRefundNotes('');
      fetchData();
    } catch (err) {
      alert('Failed to process refund');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#163A5F]">Commerce & Finance</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'transactions' ? 'border-[#163A5F] text-[#163A5F]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Transaction Ledger
        </button>
        <button
          onClick={() => setActiveTab('refunds')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'refunds' ? 'border-[#163A5F] text-[#163A5F]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Refund Requests
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#163A5F]" />
          </div>
        ) : activeTab === 'transactions' ? (
          <div className="overflow-x-auto">
            {transactions.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No transactions found.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Provider</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-500">{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-slate-900 font-medium">{t.user?.firstName} {t.user?.lastName}<br/><span className="text-xs text-slate-500">{t.user?.email}</span></td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-700">{t.amount} {t.currency}</td>
                      <td className="px-6 py-4 text-slate-500">{t.referenceType === 0 ? 'Subscription' : t.referenceType === 1 ? 'Class' : 'Other'}</td>
                      <td className="px-6 py-4 text-slate-500">{t.provider === 1 ? 'Stripe' : 'Mock'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          t.status === 1 ? 'bg-green-100 text-green-700' : 
                          t.status === 2 ? 'bg-red-100 text-red-700' :
                          t.status === 3 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {t.status === 1 ? 'Success' : t.status === 2 ? 'Failed' : t.status === 3 ? 'Refunded' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {refunds.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No refund requests found.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {refunds.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-slate-900 font-medium">{r.user?.firstName} {r.user?.lastName}</td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-700">{r.amount} {r.transaction?.currency}</td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{r.reason}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          r.status === 0 ? 'bg-yellow-100 text-yellow-700' : 
                          r.status === 2 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {r.status === 0 ? 'Pending' : r.status === 1 ? 'Approved' : r.status === 2 ? 'Rejected' : 'Processed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {r.status === 0 && (
                          <button 
                            onClick={() => setProcessingId(r.id)}
                            className="text-xs font-semibold px-3 py-1.5 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            Process
                          </button>
                        )}
                        {r.status !== 0 && r.adminNotes && (
                          <span className="text-xs text-slate-400" title={r.adminNotes}>View Notes</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Process Refund Modal */}
      {processingId && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#163A5F]">Process Refund</h3>
            <p className="text-sm text-slate-500 mb-4">Please provide any internal notes regarding this refund decision. This will be recorded for audit purposes.</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Admin Notes</label>
                <textarea 
                  value={refundNotes} 
                  onChange={e => setRefundNotes(e.target.value)} 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 h-24 focus:ring-[#163A5F]" 
                  placeholder="Reason for approval or rejection..." 
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setProcessingId(null)} className="px-4 py-2 font-semibold text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button 
                onClick={() => handleProcessRefund(false)} 
                disabled={isSubmitting || !refundNotes}
                className="px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50"
              >
                Reject Refund
              </button>
              <button 
                onClick={() => handleProcessRefund(true)} 
                disabled={isSubmitting}
                className="px-4 py-2 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
              >
                Approve & Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
