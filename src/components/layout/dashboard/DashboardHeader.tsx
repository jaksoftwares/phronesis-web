'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { Logo } from '@/components/ui/Logo';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios';

export function DashboardHeader() {
  const { user, logout } = useAuthStore();
  const { toggleMobileSidebar } = useUIStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error('Logout failed on backend, logging out locally');
    } finally {
      logout();
      router.push('/learner/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-[var(--color-mist)] shadow-sm h-16">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden p-2 -ml-2 text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:bg-[var(--color-cloud)] rounded-md transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <Link href="/" className="flex-shrink-0">
            <Logo variant="horizontal" color="full-color" width={140} height={40} />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm hidden sm:block text-right">
            {user ? (
              <>
                <div className="font-semibold text-[var(--color-ink)]">{user.firstName} {user.lastName}</div>
                <div className="text-[var(--color-slate)] text-xs">{user.roles?.[0] || 'Learner'} Account</div>
              </>
            ) : (
              <div className="flex flex-col items-end gap-1.5">
                <div className="h-4 w-24 bg-[var(--color-mist)] rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-[var(--color-mist)] rounded animate-pulse"></div>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
