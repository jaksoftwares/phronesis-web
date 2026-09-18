import React from 'react';
import { DashboardHeader } from '@/components/layout/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/layout/dashboard/DashboardSidebar';

export default function LearnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-cloud)] flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden relative">
        <DashboardSidebar />
        <main className="flex-1 relative overflow-y-auto focus:outline-none md:ml-64 w-full">
          <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
