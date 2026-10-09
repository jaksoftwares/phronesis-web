'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api/axios';
import { ContentCard } from '@/components/learner/catalog/ContentCard';
import { useRouter } from 'next/navigation';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBookmarks = async () => {
    try {
      const res = await api.get('/me/bookmarks');
      setBookmarks(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load bookmarks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemove = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/me/bookmarks/${id}`);
      setBookmarks(prev => prev.filter(b => b.educationalContentId !== id));
    } catch (err) {
      alert('Failed to remove bookmark');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-6 pb-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Bookmarks</h1>
        <p className="text-slate-500 text-lg">Quickly access the resources you saved for later.</p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200">
          <div className="text-6xl mb-4 select-none">🔖</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Bookmarks Yet</h3>
          <p className="text-slate-500 max-w-sm text-center mb-6">
            You haven't saved any resources. Go explore the catalog to find materials you want to keep handy.
          </p>
          <button 
            onClick={() => router.push('/learner/catalog')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
          >
            Browse Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {bookmarks.map((b) => (
            <div key={b.educationalContentId} className="relative group">
              <ContentCard 
                item={{
                  id: b.educationalContentId,
                  title: b.title,
                  contentType: b.contentType,
                  isPremium: b.isPremium,
                  tags: b.tags,
                  primaryAttachmentUrl: b.primaryAttachmentUrl
                } as any} 
                onClick={() => router.push(`/learner/catalog/${b.educationalContentId}`)} 
              />
              <button 
                onClick={(e) => handleRemove(b.educationalContentId, e)}
                className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 shadow-sm"
                title="Remove Bookmark"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
