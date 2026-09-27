'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api/axios';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';

export default function AdminApplicationReview() {
  const { id } = useParams();
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewLink, setInterviewLink] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchApp();
  }, [id]);

  const fetchApp = async () => {
    try {
      const res = await api.get(`/admin/teacher-applications/${id}`);
      setApp(res.data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartReview = async () => {
    try {
      await api.post(`/admin/teacher-applications/${id}/start-review`);
      fetchApp();
    } catch (err) {
      alert('Failed to start review.');
    }
  };

  const handleScheduleInterview = async () => {
    if (!interviewDate) return alert('Date is required');
    try {
      await api.post(`/admin/teacher-applications/${id}/schedule-interview`, {
        date: new Date(interviewDate).toISOString(),
        meetingLink: interviewLink
      });
      setIsScheduling(false);
      fetchApp();
    } catch (err) {
      alert('Failed to schedule interview.');
    }
  };

  const handleApprove = async () => {
    try {
      await api.post(`/admin/teacher-applications/${id}/approve`, { notes: adminNotes });
      setIsApproving(false);
      fetchApp();
    } catch (err) {
      alert('Failed to approve application.');
    }
  };

  const handleReject = async () => {
    if (!adminNotes) return alert('Notes are required for rejection');
    try {
      await api.post(`/admin/teacher-applications/${id}/reject`, { notes: adminNotes });
      setIsRejecting(false);
      fetchApp();
    } catch (err) {
      alert('Failed to reject application.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#163A5F]" /></div>;
  }

  if (!app) {
    return <div className="p-8 text-center text-slate-500">Application not found.</div>;
  }

  const user = app.teacherProfile?.user;
  const docs = app.documents || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => router.back()} className="text-sm font-semibold text-slate-500 hover:text-slate-900 mb-2">&larr; Back to Applications</button>
          <h1 className="text-3xl font-bold text-[#163A5F]">Review Application</h1>
        </div>
        <div className="flex space-x-3">
          {app.status === 1 && ( // Submitted
            <PrimaryButton onClick={handleStartReview}>Start Review</PrimaryButton>
          )}
          {app.status === 2 && ( // Under Review
            <button onClick={() => setIsScheduling(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">Schedule Interview</button>
          )}
          {app.status === 4 && ( // Interview Completed
            <>
              <button onClick={() => setIsRejecting(true)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200">Reject</button>
              <button onClick={() => setIsApproving(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">Approve</button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Applicant Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-semibold text-slate-900">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold text-slate-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Experience</p>
                <p className="font-semibold text-slate-900">{app.teacherProfile?.experienceYears} years</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Qualifications</p>
                <p className="font-semibold text-slate-900">{app.teacherProfile?.qualifications || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Documents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Compliance Documents</h3>
            {docs.length === 0 ? (
              <p className="text-slate-500">No documents uploaded.</p>
            ) : (
              <div className="grid gap-4">
                {docs.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center mr-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Document Type: {doc.documentType}</p>
                        <p className="text-xs text-slate-500">{new Date(doc.uploadedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <a href={`http://localhost:5030${doc.fileUri}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">
                      View File
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isScheduling && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Schedule Interview</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date & Time</label>
                <input type="datetime-local" value={interviewDate} onChange={e => setInterviewDate(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2" />
              </div>
              <FloatingLabelInput label="Meeting Link (optional)" value={interviewLink} onChange={e => setInterviewLink(e.target.value)} />
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setIsScheduling(false)} className="px-4 py-2 font-semibold text-slate-500">Cancel</button>
              <PrimaryButton onClick={handleScheduleInterview}>Schedule</PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {(isApproving || isRejecting) && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">{isApproving ? 'Approve Application' : 'Reject Application'}</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Admin Notes</label>
                <textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 h-24" placeholder="Enter reason..." />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => { setIsApproving(false); setIsRejecting(false); }} className="px-4 py-2 font-semibold text-slate-500">Cancel</button>
              <button onClick={isApproving ? handleApprove : handleReject} className={`px-4 py-2 font-semibold text-white rounded-lg ${isApproving ? 'bg-green-600' : 'bg-red-600'}`}>
                {isApproving ? 'Confirm Approval' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
