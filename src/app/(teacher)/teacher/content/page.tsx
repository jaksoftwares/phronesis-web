'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/api/axios';

export default function ContentManagerPage() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [contentList, setContentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/content/me');
        setContentList(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredContent = contentList.filter(c => {
    const matchesFilter = filter === 'All' || c.type.includes(filter) || (filter === 'Assessments' && (c.type === 'Quiz' || c.type === 'Assignment'));
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]" />
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-7xl mx-auto space-y-8 pb-12 pt-6"
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Content Manager</h1>
          <p className="text-[var(--color-slate)] text-lg max-w-2xl">
            Create, upload, and organize your teaching materials and assessments.
          </p>
        </div>
        <Link href="/teacher/content/new">
          <button className="px-6 py-3 bg-[var(--color-phronesis-blue)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create New Content
          </button>
        </Link>
      </motion.div>

      {/* Analytics Summary */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[var(--color-mist)] shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
          <div><p className="text-sm text-[var(--color-slate)] font-semibold">Total Items</p><p className="text-xl font-bold text-[var(--color-ink)]">42</p></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--color-mist)] shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></div>
          <div><p className="text-sm text-[var(--color-slate)] font-semibold">Total Views</p><p className="text-xl font-bold text-[var(--color-ink)]">1,204</p></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--color-mist)] shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg></div>
          <div><p className="text-sm text-[var(--color-slate)] font-semibold">Active Quizzes</p><p className="text-xl font-bold text-[var(--color-ink)]">8</p></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[var(--color-mist)] shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
          <div><p className="text-sm text-[var(--color-slate)] font-semibold">Drafts</p><p className="text-xl font-bold text-[var(--color-ink)]">3</p></div>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-[var(--color-mist)]">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Video', 'Document', 'Assessments'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${filter === f ? 'bg-[#163A5F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search content..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-phronesis-blue)] focus:ring-1 focus:ring-[var(--color-phronesis-blue)]"
          />
        </div>
      </motion.div>

      {/* Content Table */}
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F7F9] border-b border-[var(--color-mist)] text-xs uppercase tracking-wider text-[var(--color-slate)] font-bold">
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Views/Plays</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-mist)]">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-[var(--color-ink)]">{item.title}</div>
                    <div className="text-xs text-[var(--color-slate)] mt-1">Uploaded {item.date}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                      item.type === 'Video' ? 'bg-red-50 text-red-700' :
                      item.type.includes('Document') ? 'bg-blue-50 text-blue-700' :
                      'bg-purple-50 text-purple-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-[var(--color-slate)]">{item.subject}</span>
                  </td>
                  <td className="p-4 text-[var(--color-ink)] font-semibold">
                    {item.views}
                  </td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold uppercase ${item.status === 'Published' ? 'text-green-600' : 'text-orange-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${item.status === 'Published' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[var(--color-phronesis-blue)] hover:text-[#112a45] font-medium text-sm mr-4">Edit</button>
                    <button className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                  </td>
                </tr>
              ))}
              {filteredContent.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-[var(--color-slate)]">
                    No content found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
