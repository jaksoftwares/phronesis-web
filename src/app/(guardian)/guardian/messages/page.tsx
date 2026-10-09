'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api/axios';

export default function GuardianMessagesPage() {
  const [activeChat, setActiveChat] = useState('1');
  const [contacts, setContacts] = useState<any[]>([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/communication/guardian/inbox');
        const data = res.data?.data || [];
        setContacts(data);
        if (data.length > 0) setActiveChat(data[0].id);
      } catch (err) {
        console.error('Failed to fetch inbox', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!activeChat) return;
      setLoadingChat(true);
      try {
        const res = await api.get(`/communication/messages/${activeChat}`);
        setChatHistory(res.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch chat history', err);
      } finally {
        setLoadingChat(false);
      }
    };
    fetchChatHistory();
  }, [activeChat]);

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChat) return;
    setSending(true);
    try {
      await api.post('/communication/messages', {
        receiverId: activeChat,
        content: message
      });
      // Locally append the message for instant feedback
      setChatHistory(prev => [...prev, {
        id: Date.now(),
        senderId: 'me',
        content: message,
        timestamp: 'Just now',
        isSender: true
      }]);
      setMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
      alert('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

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
            {loading ? (
              <p className="p-4 text-center text-sm text-gray-500">Loading inbox...</p>
            ) : contacts.length === 0 ? (
              <p className="p-4 text-center text-sm text-gray-500">No messages found.</p>
            ) : (
              contacts.map(contact => (
                <div 
                  key={contact.id} 
                  onClick={() => setActiveChat(contact.id)}
                  className={`p-4 border-b border-[var(--color-mist)] cursor-pointer transition-colors flex gap-3 ${activeChat === contact.id ? 'bg-white border-l-4 border-l-[var(--color-phronesis-blue)]' : 'hover:bg-gray-100'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                    {contact.name?.charAt(0) || 'U'}
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
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-[var(--color-mist)] flex items-center justify-between shadow-sm z-10">
            {contacts.find(c => c.id === activeChat) ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-sm uppercase">
                  {contacts.find(c => c.id === activeChat)?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-ink)]">{contacts.find(c => c.id === activeChat)?.name}</h3>
                  <p className="text-xs text-[var(--color-slate)] font-semibold">{contacts.find(c => c.id === activeChat)?.role}</p>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-400">Select a conversation</div>
            )}
            <button className="p-2 text-gray-400 hover:text-[var(--color-phronesis-blue)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
            {loadingChat ? (
              <p className="text-center text-sm text-gray-500 py-4">Loading messages...</p>
            ) : chatHistory.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-4">No messages yet. Say hi!</p>
            ) : (
              chatHistory.map((msg: any) => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.isSender ? 'flex-row-reverse' : ''}`}>
                  {!msg.isSender && (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-phronesis-blue)] text-white flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                      {contacts.find(c => c.id === activeChat)?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl shadow-sm max-w-[75%] ${msg.isSender ? 'bg-[var(--color-phronesis-teal)] text-white rounded-tr-none' : 'bg-white border border-[var(--color-mist)] rounded-tl-none'}`}>
                    <p className={`text-sm ${!msg.isSender ? 'text-[var(--color-ink)]' : ''}`}>{msg.content}</p>
                    <p className={`text-[10px] text-right mt-1 ${msg.isSender ? 'text-white/70' : 'text-gray-400'}`}>{msg.timestamp}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[var(--color-mist)] bg-white">
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-[var(--color-phronesis-blue)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              </button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..." 
                className="flex-1 py-2.5 px-4 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-phronesis-blue)] text-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={sending || !message.trim()}
                className="p-2.5 bg-[var(--color-phronesis-blue)] text-white rounded-full hover:bg-opacity-90 transition-transform hover:scale-105 shadow-md disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
