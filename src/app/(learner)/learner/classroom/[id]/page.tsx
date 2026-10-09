'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api/axios';

export default function LiveClassroomPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'Chat' | 'Participants'>('Chat');
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinSession = async () => {
      try {
        const res = await api.post(`/sessions/${id}/join`);
        setSessionData(res.data.data);
      } catch (err) {
        console.error('Failed to join session', err);
        alert('Could not join session. It may have ended or does not exist.');
        router.push('/learner/calendar');
      } finally {
        setLoading(false);
      }
    };
    if (id) joinSession();
  }, [id, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0F172A] z-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0F172A] z-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-[#163A5F] flex items-center justify-between px-6 shrink-0 shadow-md z-10 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">{sessionData?.title || 'Live Classroom'}</h1>
            <p className="text-white/60 text-xs font-medium">{sessionData?.hostName || 'Instructor'} • 12 Participants</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {sessionData?.isLive && (
            <span className="px-3 py-1 bg-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider rounded-md border border-red-500/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              LIVE
            </span>
          )}
          <span className="px-3 py-1 bg-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider rounded-md border border-green-500/50 flex items-center gap-2 ml-2">
            Secure Connection
          </span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden relative">
          
          {/* Main Teacher Feed */}
          <div className="flex-1 rounded-2xl overflow-hidden bg-black relative border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1580894732444-8ecded790047?w=1200&q=80" 
              alt="Teacher Video Feed" 
              className="w-full h-full object-cover opacity-90"
            />
            {/* Overlay Gradient for readability */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            
            {/* Teacher Nametag */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
              <div className="w-6 h-6 rounded-full bg-[var(--color-phronesis-gold)] flex items-center justify-center text-xs font-bold text-[#163A5F]">
                {sessionData?.hostName?.[0] || 'I'}
              </div>
              <span className="text-white text-sm font-medium">{sessionData?.hostName || 'Instructor'} (Host)</span>
            </div>

            {/* Anti-Piracy Watermark overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none z-10 overflow-hidden mix-blend-overlay">
               {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="text-white text-3xl font-mono p-12 transform -rotate-45">
                    LNR-8942-S
                  </div>
               ))}
            </div>
          </div>

          {/* Student Gallery (Bottom Row) */}
          <div className="h-32 shrink-0 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-48 h-full rounded-xl overflow-hidden bg-gray-800 relative border border-white/10 shrink-0 group">
                <img 
                  src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                  alt="Student" 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white backdrop-blur-sm">
                  Student {i}
                </div>
              </div>
            ))}
            
            {/* Self Video */}
            <div className="w-48 h-full rounded-xl overflow-hidden bg-gray-900 relative border-2 border-[var(--color-phronesis-teal)] shrink-0">
               <div className="absolute inset-0 flex items-center justify-center">
                  {!isVideoOn ? (
                    <div className="w-12 h-12 rounded-full bg-[#163A5F] flex items-center justify-center text-white font-bold text-xl">
                      ME
                    </div>
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&q=80" 
                      alt="My Video" 
                      className="w-full h-full object-cover"
                    />
                  )}
               </div>
               <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white backdrop-blur-sm flex items-center gap-2">
                 You
                 {!isMicOn && <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>}
               </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Chat & Participants) */}
        <div className="w-80 bg-white flex flex-col shrink-0 border-l border-white/10 relative z-20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.5)]">
          {/* Tabs */}
          <div className="flex bg-[#F5F7F9] border-b border-[var(--color-mist)]">
            <button 
              onClick={() => setActiveTab('Chat')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === 'Chat' ? 'text-[var(--color-phronesis-blue)] bg-white' : 'text-[var(--color-slate)] hover:bg-gray-100'}`}
            >
              Class Chat
              {activeTab === 'Chat' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)]" />}
            </button>
            <button 
              onClick={() => setActiveTab('Participants')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === 'Participants' ? 'text-[var(--color-phronesis-blue)] bg-white' : 'text-[var(--color-slate)] hover:bg-gray-100'}`}
            >
              Participants (12)
              {activeTab === 'Participants' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)]" />}
            </button>
          </div>

          {/* Chat Content */}
          {activeTab === 'Chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-[#163A5F]/5 p-3 rounded-lg border border-[#163A5F]/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[var(--color-phronesis-blue)]">Dr. Eleanor Vance (Host)</span>
                    <span className="text-[10px] text-gray-400">10:05 AM</span>
                  </div>
                  <p className="text-sm text-gray-700">Welcome everyone! Please open your textbooks to page 42 before we begin.</p>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-600">Student 2</span>
                    <span className="text-[10px] text-gray-400">10:07 AM</span>
                  </div>
                  <p className="text-sm text-gray-700">Done, thanks!</p>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-600">Student 5</span>
                    <span className="text-[10px] text-gray-400">10:08 AM</span>
                  </div>
                  <p className="text-sm text-gray-700">Can you repeat the page number?</p>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-[var(--color-mist)] bg-[#F5F7F9]">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Message the class..." 
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-phronesis-blue)] text-sm"
                  />
                  <button className="absolute right-2 top-1.5 p-1 rounded hover:bg-gray-100 text-[var(--color-phronesis-blue)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Participants Content */}
          {activeTab === 'Participants' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
               <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-phronesis-gold)] text-xs font-bold flex items-center justify-center">EV</div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-ink)]">Dr. Eleanor Vance</p>
                      <p className="text-[10px] text-[var(--color-slate)] uppercase">Host</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
               </div>
               
               {[1,2,3,4,5,6,7,8,9,10,11].map(i => (
                 <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-xs font-bold flex items-center justify-center text-gray-500">S{i}</div>
                    <p className="text-sm font-medium text-[var(--color-ink)]">Student {i}</p>
                  </div>
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      {/* Control Bar (Bottom) */}
      <div className="h-20 bg-[#0F172A] border-t border-white/10 flex items-center justify-center gap-6 shrink-0 relative z-10 px-6">
        <button 
          onClick={() => setIsMicOn(!isMicOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isMicOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
        >
          {isMicOn ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
          )}
        </button>

        <button 
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isVideoOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
        >
          {isVideoOn ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 16" /></svg>
          )}
        </button>

        <button className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
        </button>

        <button className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>

        <Link href="/learner/calendar" className="ml-auto">
          <button className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-lg">
            Leave Class
          </button>
        </Link>
      </div>
    </div>
  );
}
