"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api/axios';

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  
  const [profile, setProfile] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherState = async () => {
      try {
        const profRes = await api.get(`/teachers/${user?.id}/profile`);
        setProfile(profRes.data?.data);

        // Fetch application state
        try {
          const appRes = await api.get('/teacher-onboarding/me/application');
          setApplication(appRes.data?.data);
        } catch (e: any) {
          if (e.response?.status !== 404) throw e;
        }

      } catch (err) {
        console.error("Failed to load teacher dashboard state", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchTeacherState();
    }
  }, [user?.id]);

  // Removed auto-redirect to onboarding to allow users to start manually
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]"></div>
      </div>
    );
  }

  // Dashboard Guard Logic
  const verificationState = profile?.verificationState;
  
  // If they are strictly verified, let them in
  if (verificationState === 2) { // 2 = Verified
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#163A5F] mb-6">Welcome back, {user?.firstName || 'Teacher'}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">My Classes</h3>
            <p className="text-slate-500">You haven't been assigned any classes yet.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Upcoming Schedule</h3>
            <p className="text-slate-500">Your calendar is clear.</p>
          </div>
        </div>
      </div>
    );
  }

  // If pending and haven't submitted application, show onboarding prompt
  if (verificationState === 0 && (!application || application.status === 0)) { // 0 = Pending/Draft
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#163A5F] mb-6">Welcome, {user?.firstName || 'Teacher'}!</h1>
        
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl shadow-sm text-center max-w-3xl mx-auto mt-8">
          <div className="w-16 h-16 bg-blue-100 text-phronesis-blue rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
          </div>
          <h2 className="text-2xl font-bold text-phronesis-blue mb-3">Complete Your Teacher Profile</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Before you can start teaching or managing classes, we need a few details about your qualifications, subjects, and experience.
          </p>
          <button 
            onClick={() => router.push('/teacher/onboarding')}
            className="px-8 py-3 bg-phronesis-blue text-white rounded-[var(--radius-input)] font-semibold transition-colors hover:bg-[#112a45]"
          >
            {application?.status === 0 ? 'Continue Application (Draft)' : 'Start Onboarding'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 opacity-50 pointer-events-none">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">My Classes</h3>
            <p className="text-slate-500">Locked until onboarding is complete.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Upcoming Schedule</h3>
            <p className="text-slate-500">Locked until onboarding is complete.</p>
          </div>
        </div>
      </div>
    );
  }

  // If they have submitted an application, show the Under Review lock screen
  return (
    <div className="max-w-3xl mx-auto mt-12 text-center bg-white p-12 rounded-2xl border border-gray-200 shadow-sm">
      <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-[#163A5F] mb-4">Application Under Review</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        Your teaching application and compliance documents have been received and are currently being reviewed by our administration team.
      </p>
      
      {application?.status === 3 && ( // 3 = InterviewScheduled
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-left max-w-md mx-auto">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Interview Scheduled!
          </h4>
          <p className="text-sm text-green-700">Date: {new Date(application.interviewDate).toLocaleString()}</p>
          <a href={application.interviewLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-green-900 underline mt-2 inline-block">Join Interview</a>
        </div>
      )}

      {application?.status === 6 && ( // 6 = Rejected
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-left max-w-md mx-auto">
          <h4 className="font-semibold text-red-800 mb-2">Application Rejected</h4>
          <p className="text-sm text-red-700">{application.adminNotes}</p>
          <button onClick={() => router.push('/teacher/onboarding')} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium">Edit & Resubmit</button>
        </div>
      )}
    </div>
  );
}
