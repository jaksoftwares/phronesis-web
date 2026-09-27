'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function GuardianMessagesPage() {
  const [activeChat, setActiveChat] = useState('1');

  const contacts = [
    { id: '1', name: 'Mr. Davis', role: 'Mathematics Teacher', child: 'Alex Mercer', unread: 2, lastMsg: "Alex did great on the recent algebra quiz!" },
    { id: '2', name: 'Mrs. Smith', role: 'Physics Teacher', child: 'Alex Mercer', unread: 0, lastMsg: "Please remind Alex to submit the lab report." },
    { id: '3', name: 'Ms. Johnson', role: 'Algebra I Teacher', child: 'Mia Mercer', unread: 0, lastMsg: "Thanks for checking in." },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-4 pb-12 pt-6 h-[calc(100vh-80px)] flex flex-col"
    >
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-1">Messages</h1>
        <p className="text-[var(--color-slate)] text-lg mb-4">Communicate directly with your children's instructors.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden flex min-h-[500px]">
        
        {/* Sidebar Contacts */}
        <div className="w-1/3 border-r border-[var(--color-mist)] flex flex-col bg-[#F5F7F9]">
          <div className="p-4 border-b border-[var(--color-mist)] bg-white">
            <input 
              type="text" 
              placeholder="Search teachers..." 
              className="w-full pl-4 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-phronesis-blue)] text-sm"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map(contact => (
              <div 
                key={contact.id} 
                onClick={() => setActiveChat(contact.id)}
                className={`p-4 border-b border-[var(--color-mist)] cursor-pointer transition-colors flex gap-3 ${activeChat === contact.id ? 'bg-white border-l-4 border-l-[var(--color-phronesis-blue)]' : 'hover:bg-gray-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {contact.name.charAt(4)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[var(--color-ink)] truncate">{contact.name}</h4>
                    {contact.unread > 0 && <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{contact.unread}</span>}
                  </div>
                  <p className="text-xs text-[var(--color-slate)] truncate font-semibold mb-1">{contact.role} • {contact.child}</p>
                  <p className={`text-xs truncate ${contact.unread > 0 ? 'font-bold text-[var(--color-ink)]' : 'text-gray-500'}`}>{contact.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-[var(--color-mist)] flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-sm">
                D
              </div>
              <div>
                <h3 className="font-bold text-[var(--color-ink)]">Mr. Davis</h3>
                <p className="text-xs text-[var(--color-slate)] font-semibold">Alex's Mathematics Teacher</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-[var(--color-phronesis-blue)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
            <div className="text-center text-xs font-bold text-gray-400 mb-6">Yesterday</div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-xs shrink-0">D</div>
              <div className="bg-white border border-[var(--color-mist)] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[75%]">
                <p className="text-sm text-[var(--color-ink)]">Hello! I wanted to give you a quick update. Alex did great on the recent algebra quiz. He scored a 92%.</p>
                <p className="text-[10px] text-right text-gray-400 mt-1">4:30 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="bg-[var(--color-phronesis-teal)] text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[75%]">
                <p className="text-sm">That's wonderful news! Thank you for letting me know. We worked on those equations all weekend.</p>
                <p className="text-[10px] text-right text-white/70 mt-1">5:15 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-xs shrink-0">D</div>
              <div className="bg-white border border-[var(--color-mist)] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[75%]">
                <p className="text-sm text-[var(--color-ink)]">The practice clearly paid off! Let me know if you need any additional resources for the upcoming mid-term.</p>
                <p className="text-[10px] text-right text-gray-400 mt-1">9:00 AM</p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[var(--color-mist)] bg-white">
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-[var(--color-phronesis-blue)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              </button>
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 py-2.5 px-4 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-phronesis-blue)] text-sm"
              />
              <button className="p-2.5 bg-[var(--color-phronesis-blue)] text-white rounded-full hover:bg-opacity-90 transition-transform hover:scale-105 shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
