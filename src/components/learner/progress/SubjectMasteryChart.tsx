'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: 'Mathematics', A: 85, fullMark: 100 },
  { subject: 'English', A: 92, fullMark: 100 },
  { subject: 'Science', A: 78, fullMark: 100 },
  { subject: 'History', A: 88, fullMark: 100 },
  { subject: 'Geography', A: 65, fullMark: 100 },
  { subject: 'Art', A: 95, fullMark: 100 },
];

export function SubjectMasteryChart() {
  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] h-full flex flex-col">
      <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">Subject Mastery</h3>
      <p className="text-sm text-[var(--color-slate)] mb-6">Your competency levels across all enrolled subjects.</p>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="var(--color-mist)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-ink)', fontSize: 12, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--color-slate)', fontSize: 10 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <Radar
              name="Mastery Score"
              dataKey="A"
              stroke="var(--color-phronesis-teal)"
              fill="var(--color-phronesis-teal)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
