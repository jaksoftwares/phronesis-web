'use client';

import React from 'react';

export function LearnerActivityFeed() {
  const activities = [
    { id: '1', child: 'Alex', action: 'completed assessment', target: 'Mid-Term Mock Exam', time: '2 hours ago', type: 'assessment', score: '85%' },
    { id: '2', child: 'Mia', action: 'joined live class', target: 'Algebra I', time: '3 hours ago', type: 'class' },
    { id: '3', child: 'Alex', action: 'earned a badge', target: 'Physics Master', time: 'Yesterday', type: 'achievement' }
  ];

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-sm border border-[var(--color-mist)] h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-[var(--color-ink)] mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-[var(--color-phronesis-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Recent Activity
      </h3>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {activities.map(act => (
          <div key={act.id} className="flex gap-4">
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white shadow-sm
                ${act.type === 'assessment' ? 'bg-purple-100 text-purple-600' : act.type === 'class' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                {act.type === 'assessment' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {act.type === 'class' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                {act.type === 'achievement' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
              </div>
              <div className="w-0.5 h-full bg-gray-100 absolute top-10 -z-10"></div>
            </div>
            
            <div className="pb-4">
              <p className="text-sm text-[var(--color-ink)]">
                <span className="font-bold">{act.child}</span> {act.action} <span className="font-semibold text-[var(--color-phronesis-blue)]">{act.target}</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[var(--color-slate)]">{act.time}</span>
                {act.score && (
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Score: {act.score}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
