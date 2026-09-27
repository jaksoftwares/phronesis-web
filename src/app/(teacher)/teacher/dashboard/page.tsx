"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api/axios';
import { TeacherMetricsWidget } from '@/components/teacher/dashboard/TeacherMetricsWidget';
import { UpcomingClassesWidget } from '@/components/teacher/dashboard/UpcomingClassesWidget';

const S = { Draft: 0, Submitted: 1, UnderReview: 2, InterviewScheduled: 3, InterviewCompleted: 4, Approved: 5, Rejected: 6 };

const STAGE_LABEL: Record<number, string> = {
  0: 'Draft', 1: 'Submitted', 2: 'Under Review',
  3: 'Interview Scheduled', 4: 'Interview Completed',
  5: 'Approved', 6: 'Rejected',
};

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showStatusView, setShowStatusView] = useState(false);

  useEffect(() => {
    if (searchParams.get('view') === 'history') {
      setShowStatusView(true);
    } else {
      setShowStatusView(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const profRes = await api.get('/teachers/' + user.id + '/profile');
        setProfile(profRes.data?.data);
        try {
          const appRes = await api.get('/teacher-onboarding/me/application');
          setApplication(appRes.data?.data);
        } catch (e: any) { if (e.response?.status !== 404) console.error(e); }
      } catch (err) { console.error('Dashboard load failed', err); }
      finally { setLoading(false); }
    })();
  }, [user?.id]);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]" />
    </div>
  );

  const vs = profile?.verificationState;
  const st = application?.status;

  const hasPendingApp = application && st !== S.Draft && vs !== 2;

  // Verified teacher - full dashboard
  if (vs === 2) return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Welcome back, {user?.firstName || 'Teacher'}!</h1>
          <p className="text-[var(--color-slate)] text-lg">
            Here's what's happening with your classes today.
          </p>
        </div>
        <button className="px-6 py-2.5 bg-[var(--color-phronesis-blue)] text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors shadow-md">
          + Start Live Class
        </button>
      </div>

      <TeacherMetricsWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        <div className="lg:col-span-1 h-full">
          <UpcomingClassesWidget />
        </div>
        <div className="lg:col-span-2 h-full bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-6">
          <h3 className="text-lg font-bold text-[var(--color-ink)] mb-4">Pending Grading</h3>
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-[var(--color-mist)] rounded-xl">
             <p className="text-[var(--color-slate)] text-sm mb-2">You have 24 assessments waiting to be graded.</p>
             <button className="text-[var(--color-phronesis-blue)] font-medium hover:underline">Go to Grading Inbox &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );

  // If application is in progress but they haven't clicked to view status yet
  if (!showStatusView && vs !== 2) return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[#163A5F] mb-6">Welcome, {user?.firstName || 'Teacher'}!</h1>
      
      {!hasPendingApp ? (
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl text-center max-w-3xl mx-auto mt-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#163A5F]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#163A5F] mb-3">Complete Your Teacher Profile</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">Before you can start teaching, we need your qualifications, subjects, and compliance documents.</p>
          <button onClick={() => router.push('/teacher/onboarding')} className="px-8 py-3 bg-[#163A5F] text-white rounded-lg font-semibold hover:bg-[#112a45] transition-colors">
            {st === S.Draft ? 'Continue Application (Draft Saved)' : 'Start Onboarding'}
          </button>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl text-center max-w-3xl mx-auto mt-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#163A5F]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#163A5F] mb-3">Application in Progress</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">Your application has been submitted and is currently moving through our review pipeline.</p>
          <button onClick={() => setShowStatusView(true)} className="px-8 py-3 bg-[#163A5F] text-white rounded-lg font-semibold hover:bg-[#112a45] transition-colors">
            Track Application Status
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 opacity-40 pointer-events-none">
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
  const stages = [
    { label: 'Application Submitted', sublabel: application.submittedAt ? new Date(application.submittedAt).toLocaleDateString('en-KE', { dateStyle: 'medium' }) : null, done: st >= S.Submitted },
    { label: 'Document Verification', sublabel: 'Compliance team review', done: st >= S.UnderReview },
    { label: 'Interview Invitation', sublabel: st >= S.InterviewScheduled ? 'You have been invited' : 'Pending admin action', done: st >= S.InterviewScheduled },
    { label: 'Interview Completed', sublabel: null, done: st >= S.InterviewCompleted },
    { label: 'Final Decision', sublabel: st === S.Approved ? 'Approved' : st === S.Rejected ? 'Not successful' : 'Pending', done: st >= S.Approved || st === S.Rejected },
  ];

  const isCurrent = (i: number) => {
    if (i === 0) return st === S.Submitted;
    if (i === 1) return st === S.UnderReview;
    if (i === 2) return st === S.InterviewScheduled;
    if (i === 3) return st === S.InterviewCompleted;
    if (i === 4) return st === S.Approved || st === S.Rejected;
    return false;
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      <button 
        onClick={() => router.push('/teacher/dashboard')}
        className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-4"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#163A5F]">Application Status</h1>
        <span className={'px-3 py-1 rounded-full text-xs font-semibold ' + (
          st === S.Rejected ? 'bg-red-100 text-red-700' :
          st === S.Approved ? 'bg-green-100 text-green-700' :
          st === S.InterviewScheduled ? 'bg-amber-100 text-amber-700' :
          'bg-blue-100 text-blue-700'
        )}>
          {STAGE_LABEL[st] ?? 'Unknown'}
        </span>
      </div>

      {/* Timeline card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-600 mb-6">Application History</h2>
        <ol className="relative">
          {stages.map((stage, i) => {
            const isLast = i === stages.length - 1;
            const current = isCurrent(i);
            return (
              <li key={i} className={'relative flex gap-4 ' + (isLast ? '' : 'pb-8')}>
                {/* connector line */}
                {!isLast && (
                  <div className={'absolute left-3.5 top-7 bottom-0 w-0.5 ' + (stage.done ? 'bg-[#197C7A]' : 'bg-gray-200')} />
                )}
                {/* dot */}
                <div className={'relative z-10 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ' + (
                  stage.done ? 'bg-[#197C7A]' : current ? 'bg-white border-2 border-[#197C7A]' : 'bg-gray-100 border-2 border-gray-200'
                )}>
                  {stage.done ? (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : current ? (
                    <span className="w-2 h-2 rounded-full bg-[#197C7A] animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                </div>
                {/* content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className={'font-semibold text-sm ' + (stage.done || current ? 'text-gray-900' : 'text-gray-400')}>
                    {stage.label}
                    {current && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Current</span>}
                  </p>
                  {stage.sublabel && (
                    <p className={'text-xs mt-0.5 ' + (stage.done ? 'text-gray-500' : 'text-gray-400')}>{stage.sublabel}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Status-specific detail cards */}

      {(st === S.Submitted || st === S.UnderReview) && (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#163A5F] text-lg">Your application is being reviewed</h3>
              <p className="text-slate-600 text-sm mt-1">Our compliance team is verifying your documents and credentials. This typically takes 2-5 business days. You will receive an email notification when there is an update.</p>
              {application.submittedAt && (
                <p className="text-xs text-slate-400 mt-3">Submitted: {new Date(application.submittedAt).toLocaleDateString('en-KE', { dateStyle: 'long' })}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {st === S.InterviewScheduled && (
        <div className="bg-green-50 border border-green-300 p-6 rounded-2xl">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-800 text-lg">Interview Invitation</h3>
              <p className="text-green-700 text-sm mt-1">Congratulations! You have been selected for an interview with our team.</p>
              {application.interviewDate && (
                <div className="mt-4 bg-white border border-green-200 rounded-xl p-4">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Scheduled Date and Time</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(application.interviewDate).toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-base text-gray-600 mt-0.5">
                    {new Date(application.interviewDate).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              )}
              {application.interviewNotes && (
                <div className="mt-3 text-sm text-green-800 italic bg-green-100 rounded-lg px-4 py-2">
                  {application.interviewNotes}
                </div>
              )}
              {application.interviewLink && (
                <a href={application.interviewLink} target="_blank" rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.07A1 1 0 0121 8.845V15.155a1 1 0 01-1.447.91L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  Join Interview Meeting
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {st === S.InterviewCompleted && (
        <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-purple-800 text-lg">Interview Completed</h3>
              <p className="text-purple-700 text-sm mt-1">Your interview is done. Our team is deliberating on the final decision. You will be notified by email shortly.</p>
            </div>
          </div>
        </div>
      )}

      {st === S.Rejected && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-red-800 text-lg">Application Not Successful</h3>
              {application.adminNotes && <p className="text-red-700 text-sm mt-1 italic">"{application.adminNotes}"</p>}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}