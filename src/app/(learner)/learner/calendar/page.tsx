'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CalendarPage() {
  const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Week');

  const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const MOCK_EVENTS = [
    { id: 'e1', title: 'Mathematics: Algebra II', type: 'Live Class', day: 'Mon', time: '09:00', duration: 2, isNow: false },
    { id: 'e2', title: 'English Essay Draft Due', type: 'Deadline', day: 'Mon', time: '14:00', duration: 1, isNow: false },
    { id: 'e3', title: 'Biology: Cell Structure', type: 'Live Class', day: 'Wed', time: '10:00', duration: 1.5, isNow: true },
    { id: 'e4', title: 'History Group Discussion', type: 'Live Class', day: 'Thu', time: '13:00', duration: 1, isNow: false },
    { id: 'e5', title: 'Physics Quiz', type: 'Assessment', day: 'Fri', time: '11:00', duration: 1, isNow: false },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-7xl mx-auto space-y-6 pb-12 flex flex-col h-[calc(100vh-6rem)]"
    >
      {/* Header */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">My Schedule</h1>
          <p className="text-[var(--color-slate)] text-lg max-w-2xl">
            Manage your live classes, upcoming deadlines, and study sessions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-[var(--color-mist)] shadow-sm">
          {['Day', 'Week', 'Month'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                view === v ? 'bg-[var(--color-phronesis-blue)] text-white shadow' : 'text-[var(--color-slate)] hover:bg-[var(--color-cloud)] hover:text-[var(--color-ink)]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Calendar View (Week View Mockup) */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex-1 bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] flex flex-col overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-mist)] bg-white">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[var(--color-cloud)] transition-colors text-[var(--color-slate)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-lg font-bold text-[var(--color-ink)]">September 24 - 30, 2026</h2>
            <button className="p-2 rounded-full hover:bg-[var(--color-cloud)] transition-colors text-[var(--color-slate)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <button className="px-4 py-2 bg-[var(--color-phronesis-blue)] text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Book Tuition
          </button>
        </div>

        {/* Calendar Grid Container */}
        <div className="flex-1 overflow-auto bg-[var(--color-cloud)]/30 flex">
          {/* Time Column */}
          <div className="w-20 shrink-0 border-r border-[var(--color-mist)] bg-white sticky left-0 z-10 flex flex-col">
            <div className="h-12 border-b border-[var(--color-mist)] shrink-0"></div>
            {TIME_SLOTS.map((time) => (
              <div key={time} className="h-24 border-b border-[var(--color-mist)] text-xs text-[var(--color-slate)] font-medium text-right pr-2 pt-2">
                {time}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          <div className="flex-1 min-w-[800px] flex">
            {WEEK_DAYS.map((day, dayIndex) => {
              const isToday = day === 'Wed'; // Mock current day
              
              return (
                <div key={day} className={`flex-1 border-r border-[var(--color-mist)] relative ${isToday ? 'bg-[var(--color-phronesis-teal)]/5' : ''}`}>
                  {/* Day Header */}
                  <div className={`h-12 border-b border-[var(--color-mist)] flex flex-col items-center justify-center shrink-0 sticky top-0 z-20 ${isToday ? 'bg-white' : 'bg-white'}`}>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isToday ? 'text-[var(--color-phronesis-teal)]' : 'text-[var(--color-slate)]'}`}>{day}</span>
                    <span className={`text-sm font-bold ${isToday ? 'text-white bg-[var(--color-phronesis-teal)] w-6 h-6 rounded-full flex items-center justify-center mt-0.5' : 'text-[var(--color-ink)]'}`}>
                      {24 + dayIndex}
                    </span>
                  </div>

                  {/* Day Grid Lines */}
                  {TIME_SLOTS.map((_, i) => (
                    <div key={i} className="h-24 border-b border-[var(--color-mist)] border-dashed opacity-50 w-full" />
                  ))}

                  {/* Events Overlay */}
                  <div className="absolute top-12 left-0 w-full h-[calc(100%-3rem)] pointer-events-none p-1">
                    {MOCK_EVENTS.filter(e => e.day === day).map(event => {
                      const startIndex = TIME_SLOTS.indexOf(event.time);
                      const top = startIndex * 6; // 6rem per hour (96px)
                      const height = event.duration * 6;
                      
                      const isLive = event.isNow;
                      const bgColor = event.type === 'Live Class' ? 'bg-[#163A5F]' : 
                                      event.type === 'Deadline' ? 'bg-red-500' : 'bg-[#D5A63A]';

                      return (
                        <div 
                          key={event.id}
                          className={`absolute w-[calc(100%-8px)] left-1 p-2 rounded-md shadow-sm pointer-events-auto border overflow-hidden flex flex-col justify-between transition-transform hover:scale-[1.02] cursor-pointer ${bgColor} border-transparent text-white`}
                          style={{ top: `${top}rem`, height: `${height}rem` }}
                        >
                          {/* Glassmorphism subtle overlay */}
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none" />
                          
                          <div className="relative z-10">
                            <h4 className="text-xs font-bold leading-tight mb-1">{event.title}</h4>
                            <p className="text-[10px] font-medium opacity-80">{event.time} - {event.duration}hr</p>
                          </div>
                          
                          {isLive && (
                            <Link href={`/learner/classroom/${event.id}`} className="relative z-10 mt-auto w-full">
                              <button className="w-full py-1 bg-[var(--color-phronesis-teal)] text-white text-xs font-bold rounded hover:bg-opacity-90 flex items-center justify-center gap-1 shadow-md animate-pulse">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                Join Room
                              </button>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
