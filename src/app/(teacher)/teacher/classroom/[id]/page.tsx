'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TeacherLiveClassroomPage() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [activeTab, setActiveTab] = useState<'Chat' | 'Participants'>('Participants');

  return (
    <div className="fixed inset-0 bg-[#0F172A] z-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-[#163A5F] flex items-center justify-between px-6 shrink-0 shadow-md z-10 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--color-phronesis-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Advanced Chemistry (Host View)</h1>
            <p className="text-[var(--color-phronesis-gold)] text-xs font-medium">12 Students in Session</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border flex items-center gap-2 transition-colors ${
              isRecording ? 'bg-red-500/20 text-red-500 border-red-500/50 hover:bg-red-500/30' : 'bg-gray-700/50 text-gray-300 border-gray-500 hover:bg-gray-600'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></span>
            {isRecording ? 'Recording' : 'Start Record'}
          </button>
          
          <span className="px-3 py-1 bg-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider rounded-md border border-green-500/50">
            Host Connected
          </span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden relative">
          
          {/* Main Stage (Self / Screen Share) */}
          <div className={`flex-1 rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl transition-all ${isScreenSharing ? 'bg-[#000]' : 'bg-gray-900'}`}>
            {isScreenSharing ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <svg className="w-24 h-24 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <h2 className="text-white text-xl font-bold">You are sharing your screen</h2>
                <button onClick={() => setIsScreenSharing(false)} className="mt-4 px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">Stop Sharing</button>
              </div>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=1200&q=80" 
                alt="My Video" 
                className={`w-full h-full object-cover ${!isVideoOn && 'opacity-0'}`}
              />
            )}
            
            {/* Host Tag */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
              <span className="text-white text-sm font-medium">You (Host)</span>
              {!isMicOn && <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>}
            </div>
          </div>

          {/* Student Gallery (Bottom Row) */}
          <div className="h-32 shrink-0 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-48 h-full rounded-xl overflow-hidden bg-gray-800 relative border border-white/10 shrink-0 group">
                <img 
                  src={`https://i.pravatar.cc/150?img=${i + 15}`} 
                  alt="Student" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white backdrop-blur-sm flex items-center gap-2">
                  Student {i}
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </div>
                {/* Host Control Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white" title="Mute Student">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </button>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white" title="Pin Video">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar (Chat & Participants) */}
        <div className="w-80 bg-white flex flex-col shrink-0 border-l border-white/10 relative z-20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.5)]">
          {/* Tabs */}
          <div className="flex bg-[#F5F7F9] border-b border-[var(--color-mist)]">
            <button 
              onClick={() => setActiveTab('Participants')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === 'Participants' ? 'text-[var(--color-phronesis-blue)] bg-white' : 'text-[var(--color-slate)] hover:bg-gray-100'}`}
            >
              Roster (12)
              {activeTab === 'Participants' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)]" />}
            </button>
            <button 
              onClick={() => setActiveTab('Chat')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === 'Chat' ? 'text-[var(--color-phronesis-blue)] bg-white' : 'text-[var(--color-slate)] hover:bg-gray-100'}`}
            >
              Class Chat
              {activeTab === 'Chat' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-phronesis-blue)]" />}
            </button>
          </div>

          {/* Participants Content (Host specific) */}
          {activeTab === 'Participants' && (
            <div className="flex-1 flex flex-col">
              <div className="p-3 border-b border-gray-100 flex justify-between">
                <button className="text-xs font-semibold text-red-600 hover:underline">Mute All</button>
                <button className="text-xs font-semibold text-[var(--color-phronesis-blue)] hover:underline">Lower All Hands</button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                 {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                   <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-xs font-bold flex items-center justify-center text-gray-500">S{i}</div>
                      <p className="text-sm font-medium text-[var(--color-ink)]">Student {i}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                      <svg className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {/* Chat Content */}
          {activeTab === 'Chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-600">Student 4</span>
                    <span className="text-[10px] text-gray-400">10:15 AM</span>
                  </div>
                  <p className="text-sm text-gray-700">Sir, could you re-explain the last slide?</p>
                </div>
              </div>

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
        </div>
      </div>

      {/* Control Bar (Bottom) */}
      <div className="h-20 bg-[#0F172A] border-t border-white/10 flex items-center justify-center gap-6 shrink-0 relative z-10 px-6">
        
        <div className="flex items-center gap-4 bg-gray-800 rounded-full px-6 py-2">
          <button 
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMicOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
          >
            {isMicOn ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
            )}
          </button>

          <button 
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isVideoOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
          >
            {isVideoOn ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 16" /></svg>
            )}
          </button>
        </div>

        <button 
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-colors ${
            isScreenSharing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
        </button>

        <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 font-bold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Breakout Rooms
        </button>

        <Link href="/teacher/dashboard" className="ml-auto">
          <button className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-lg">
            End Class
          </button>
        </Link>
      </div>
    </div>
  );
}
