'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api/axios';

export default function TeacherProfilePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const res = await api.get('/teachers/' + user.id + '/profile');
        setProfile(res.data?.data);
        setBio(res.data?.data?.qualifications?.join(', ') || 'Passionate educator ready to teach.');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8 pb-12 pt-6">
      <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">My Profile</h1>
      <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-[#163A5F] text-white rounded-full flex items-center justify-center font-bold text-3xl">
            {user?.firstName?.[0] || 'T'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-ink)]">{user?.firstName} {user?.lastName}</h2>
            <p className="text-[var(--color-slate)]">Instructor • {profile?.subjects?.join(', ')}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-slate)] mb-1">Bio / Qualifications</label>
            <textarea 
              className="w-full border border-[var(--color-mist)] rounded-[var(--radius-input)] p-3 resize-none h-32 focus:border-[var(--color-phronesis-blue)] focus:ring-1 focus:ring-[var(--color-phronesis-blue)] outline-none transition-colors" 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button className="px-6 py-2.5 bg-[var(--color-phronesis-blue)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}
