'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecureContentPlayer } from '@/components/learner/catalog/SecureContentPlayer';

interface ContentDetails {
  id: string;
  title: string;
  description: string;
  contentType: number;
  status: number;
  isPremium: boolean;
  authorId: string;
  tags: string[];
  attachments: { id: string; fileName: string; fileUri: string; mimeType: string; isPrimary: boolean }[];
  publishedAt: string;
}

export default function ContentDetailsPage() {
  const params = useParams();
  const contentId = params?.contentId as string;
  const router = useRouter();
  const [content, setContent] = useState<ContentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [playerConfig, setPlayerConfig] = useState({ uri: '', type: '' });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get(`/catalog/${contentId}`);
        setContent(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load content details.');
      } finally {
        setLoading(false);
      }
    };
    if (contentId) fetchContent();
  }, [contentId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post(`/catalog/${contentId}/save`);
      alert("Content saved successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || 'Could not save content.');
    } finally {
      setSaving(false);
    }
  };

  const handleAccessContent = async () => {
    if (content?.isPremium) {
      try {
        const subRes = await api.get('/commerce/subscriptions/my');
        const activeSub = subRes.data?.find((s: any) => s.status === 'Active');
        if (!activeSub) {
           const wantToUpgrade = window.confirm("This is premium content. You need an active subscription to access it. Upgrade now?");
           if (wantToUpgrade) {
             router.push('/learner/subscription');
           }
           return;
        }
      } catch (err) {
        alert("Could not verify subscription status.");
        return;
      }
    }
    // Open secure player
    const primary = content?.attachments.find(a => a.isPrimary);
    if (primary?.fileUri) {
      setPlayerConfig({ 
        uri: primary.fileUri, 
        type: contentTypeLabels[content.contentType] || 'Document' 
      });
      setIsPlayerOpen(true);
    } else {
      alert("No primary attachment found.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Content Not Found</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <PrimaryButton onClick={() => router.back()}>Go Back</PrimaryButton>
      </div>
    );
  }

  const contentTypeLabels: Record<number, string> = {
    0: 'Document', 1: 'Video', 2: 'Interactive', 3: 'Audio', 4: 'Simulation'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-10 px-4 md:px-8"
    >
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold mb-8 transition-colors"
      >
        <span>←</span> Back to Catalog
      </button>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          
          {/* Main Info */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {contentTypeLabels[content.contentType] || 'Resource'}
              </span>
              {content.isPremium ? (
                <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  ⭐ Premium
                </span>
              ) : (
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-bold rounded-full uppercase tracking-wider">
                  🆓 Free
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {content.title}
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              {content.description || 'No description available for this content.'}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {content.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-lg font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Card */}
          <div className="w-full md:w-72 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col gap-4">
            <div className="text-center pb-4 border-b border-slate-200">
              <p className="text-sm text-slate-500 mb-1">Published</p>
              <p className="font-semibold text-slate-800">
                {new Date(content.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <PrimaryButton onClick={handleAccessContent} className="w-full h-12 text-lg">
              {content.contentType === 1 ? '▶ Play Video' : 'Access Content'}
            </PrimaryButton>
            
            <button 
              onClick={handleSave}
              disabled={saving}
              className="w-full h-12 rounded-[var(--radius-input)] border-2 border-slate-200 text-slate-700 font-bold hover:border-blue-600 hover:text-blue-600 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : '💾 Save for later'}
            </button>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isPlayerOpen && (
          <SecureContentPlayer 
            uri={playerConfig.uri} 
            type={playerConfig.type} 
            onClose={() => setIsPlayerOpen(false)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
