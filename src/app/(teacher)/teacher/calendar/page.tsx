'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TeacherCalendarPage() {
  const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Week');

  const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const MOCK_EVENTS = [
    { id: 'e1', title: 'A-Level Mathematics', type: 'Class', day: 'Mon', time: '10:00', duration: 1.5, students: 24 },
    { id: 'e2', title: 'O-Level Physics', type: 'Class', day: 'Tue', time: '13:00', duration: 1, students: 18 },
    { id: 'e3', title: 'Advanced Chemistry', type: 'Class', day: 'Wed', time: '15:30', duration: 1, students: 12 },
    { id: 'e4', title: '1-on-1: Sarah Connor', type: 'Tutoring', day: 'Thu', time: '14:00', duration: 0.5, students: 1 },
    { id: 'e5', title: 'Office Hours', type: 'Availability', day: 'Fri', time: '14:00', duration: 2, students: 0 },
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
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Teaching Schedule</h1>
          <p className="text-[var(--color-slate)] text-lg max-w-2xl">
            Manage your live classes, 1-on-1 tutoring sessions, and office hours.
          </p>
        </div>

        <div className="flex items-center gap-4">
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
          <button className="px-4 py-2 bg-[var(--color-phronesis-blue)] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 shadow-md">
            + Add Availability
          </button>
        </div>
      </motion.div>

      {/* Main Calendar View */}
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
          
          <div className="flex items-center gap-4 text-xs font-semibold text-[var(--color-slate)]">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#163A5F]"></div> Classes</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#D5A63A]"></div> Tutoring</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500"></div> Availability</span>
          </div>
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
              const isToday = day === 'Wed'; 
              
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
                      // Custom offset calculation based on string e.g. '15:30'
                      const [hourStr, minStr] = event.time.split(':');
                      const hourOffset = parseInt(hourStr) - 8; // Since grid starts at 08:00
                      const minOffset = parseInt(minStr) / 60;
                      
                      const top = (hourOffset + minOffset) * 6; // 6rem per hour
                      const height = event.duration * 6;
                      
                      const bgColor = event.type === 'Class' ? 'bg-[#163A5F]' : 
                                      event.type === 'Tutoring' ? 'bg-[#D5A63A]' : 'bg-green-500 border border-green-600 border-dashed';

                      return (
                        <div 
                          key={event.id}
                          className={`absolute w-[calc(100%-8px)] left-1 p-2 rounded-md shadow-sm pointer-events-auto overflow-hidden flex flex-col justify-between transition-transform hover:scale-[1.02] cursor-pointer ${bgColor} text-white`}
                          style={{ top: `${top}rem`, height: `${height}rem` }}
                        >
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none" />
                          
                          <div className="relative z-10 flex flex-col h-full">
                            <h4 className="text-xs font-bold leading-tight mb-0.5">{event.title}</h4>
                            <p className="text-[10px] font-medium opacity-80">{event.time} - {event.duration}hr</p>
                            
                            {event.students > 0 && (
                              <div className="mt-auto flex items-center gap-1 text-[10px] bg-black/20 self-start px-1.5 py-0.5 rounded">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                {event.students}
                              </div>
                            )}
                          </div>
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
