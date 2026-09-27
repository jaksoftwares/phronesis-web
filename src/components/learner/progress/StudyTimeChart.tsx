'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.8 },
  { name: 'Wed', hours: 4.2 },
  { name: 'Thu', hours: 3.1 },
  { name: 'Fri', hours: 5.0 },
  { name: 'Sat', hours: 2.0 },
  { name: 'Sun', hours: 1.5 },
];

export function StudyTimeChart() {
  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] h-full flex flex-col">
      <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">Weekly Study Time</h3>
      <p className="text-sm text-[var(--color-slate)] mb-6">Hours spent engaged with course materials.</p>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-phronesis-gold)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--color-phronesis-gold)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-mist)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-slate)', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-slate)', fontSize: 12 }} dx={-10} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              cursor={{ stroke: 'var(--color-mist)', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area 
              type="monotone" 
              dataKey="hours" 
              stroke="var(--color-phronesis-gold)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorHours)" 
              activeDot={{ r: 6, fill: 'var(--color-phronesis-blue)', stroke: 'white', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
