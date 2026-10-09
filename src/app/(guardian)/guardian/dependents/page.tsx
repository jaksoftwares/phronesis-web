'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/api/axios';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';

export default function GuardianDependentsPage() {
  const [learners, setLearners] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const [learnerRegId, setLearnerRegId] = useState('');
  const [relationshipType, setRelationshipType] = useState('0');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const fetchDependents = async () => {
    try {
      const [learnersRes, pendingRes] = await Promise.all([
        api.get('/guardians/me/learners'),
        api.get('/guardians/me/link-requests/pending')
      ]);
      setLearners(learnersRes.data?.data || []);
      setPendingRequests(pendingRes.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch dependents', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependents();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);
    setInviteError(null);
    setInviteSuccess(false);

    try {
      await api.post('/guardians/me/invite-learner', {
        learnerRegistrationNumber: learnerRegId,
        relationshipType: parseInt(relationshipType)
      });
      setInviteSuccess(true);
      setLearnerRegId('');
      setTimeout(() => {
        setIsInviteModalOpen(false);
        setInviteSuccess(false);
      }, 2000);
    } catch (err: any) {
      setInviteError(err.response?.data?.message || 'Failed to send invite.');
    } finally {
      setIsInviting(false);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await api.post(`/guardians/me/link-requests/${requestId}/accept`);
      fetchDependents(); // Refresh lists
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to accept request.');
    }
  };

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
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">My Dependents</h1>
          <p className="text-[var(--color-slate)] text-lg max-w-2xl">
            Monitor the academic performance and learning habits of your children.
          </p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="px-6 py-2.5 bg-[var(--color-phronesis-blue)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
        >
          + Link New Dependent
        </button>
      </motion.div>

      {pendingRequests.length > 0 && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 mb-4">Pending Requests ({pendingRequests.length})</h2>
          <div className="space-y-4">
            {pendingRequests.map(req => (
              <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg border border-amber-100 shadow-sm gap-4">
                <div>
                  <p className="font-bold text-[var(--color-ink)]">{req.firstName} {req.lastName}</p>
                  <p className="text-sm text-slate-500">Requested to link as {req.relationshipType === 0 ? 'Parent' : req.relationshipType === 1 ? 'Guardian' : req.relationshipType === 2 ? 'Sponsor' : 'Other'}</p>
                </div>
                <button 
                  onClick={() => handleAcceptRequest(req.id)}
                  className="px-4 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Accept Request
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]" />
        </div>
      ) : learners.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-mist)] p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--color-ink)] mb-2">No Dependents Linked</h2>
          <p className="text-[var(--color-slate)] mb-6 max-w-md mx-auto">You haven't linked any learners to your account yet. Ask your dependent for their Registration ID to connect.</p>
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="px-6 py-2 bg-white border-2 border-[var(--color-phronesis-blue)] text-[var(--color-phronesis-blue)] font-bold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Link Dependent Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {learners.map((l, idx) => (
            <motion.div key={l.learnerProfileId || idx} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-[#F5F7F9] to-white border-b border-[var(--color-mist)] flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-2xl shadow-sm uppercase">
                    {l.firstName?.charAt(0)}{l.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--color-ink)]">{l.firstName} {l.lastName}</h2>
                    <p className="font-semibold text-[var(--color-slate)]">Linked Learner</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  Active
                </span>
              </div>

              {/* Stats Grid (Mocked for Phase 1, implemented in Phase 2) */}
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Current GPA</p>
                  <p className="text-3xl font-bold text-[var(--color-phronesis-teal)]">--</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Attendance</p>
                  <p className="text-3xl font-bold text-[var(--color-phronesis-blue)]">--</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 col-span-2 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase font-bold text-[var(--color-slate)] mb-1">Relationship</p>
                    <p className="text-lg font-bold text-[var(--color-ink)]">
                      {l.relationshipType === 0 ? 'Parent' : l.relationshipType === 1 ? 'Guardian' : l.relationshipType === 2 ? 'Sponsor' : 'Other'}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <Link href={`/guardian/dashboard?learnerId=${l.learnerProfileId}`}>
                  <button className="w-full py-3 bg-white border-2 border-[var(--color-phronesis-blue)] text-[var(--color-phronesis-blue)] font-bold rounded-lg hover:bg-blue-50 transition-colors">
                    View Full Report Card
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Invite Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsInviteModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-50 border border-slate-200"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Link a Dependent</h2>
              <p className="text-slate-600 mb-6">Enter the Learner's Registration ID to send them a linkage request. They must approve this request from their portal.</p>
              
              {inviteSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="font-semibold">Link request sent successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleInvite} className="space-y-4">
                  {inviteError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-4">
                      {inviteError}
                    </div>
                  )}
                  
                  <FloatingLabelInput
                    label="Learner Registration ID (e.g. PHR-12345)"
                    value={learnerRegId}
                    onChange={(e) => setLearnerRegId(e.target.value)}
                    required
                  />
                  
                  <div className="relative">
                    <select
                      className="block w-full px-4 py-3 bg-[var(--color-cloud)] border border-[var(--color-mist)] focus:border-[var(--color-phronesis-blue)] rounded-[var(--radius-input)] text-[var(--color-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--color-phronesis-blue)] transition-colors appearance-none"
                      value={relationshipType}
                      onChange={(e) => setRelationshipType(e.target.value)}
                      required
                    >
                      <option value="0">Parent</option>
                      <option value="1">Guardian</option>
                      <option value="2">Sponsor</option>
                      <option value="3">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setIsInviteModalOpen(false)}
                      className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={isInviting || !learnerRegId}
                      className="flex-1 py-2.5 bg-[var(--color-phronesis-blue)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                      {isInviting ? 'Sending...' : 'Send Request'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
