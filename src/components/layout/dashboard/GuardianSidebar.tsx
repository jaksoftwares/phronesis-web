'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

// Standard Heroicons for the Guardian Portal
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const DependentsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BillingIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export function GuardianSidebar() {
  const pathname = usePathname();
  const { role } = useAuthStore();
  const { isMobileSidebarOpen, closeMobileSidebar } = useUIStore();
  
  const basePath = role ? `/${role.toLowerCase()}` : '/guardian';

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: `${basePath}/dashboard`, icon: <DashboardIcon /> },
    { name: 'My Dependents', href: `${basePath}/dependents`, icon: <DependentsIcon /> },
    { name: 'Billing & Plans', href: `${basePath}/billing`, icon: <BillingIcon /> },
    { name: 'Settings', href: `${basePath}/settings`, icon: <SettingsIcon /> },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[var(--color-mist)] shadow-sm">
      <div className="flex-1 overflow-y-auto pt-6 pb-4">
        <nav className="px-4 space-y-1.5" aria-label="Sidebar">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileSidebar}
                className={`
                  flex items-center px-4 py-3 text-sm font-semibold rounded-[var(--radius-input)] transition-all duration-200
                  ${isActive 
                    ? 'bg-[var(--color-phronesis-blue)] text-white shadow-md' 
                    : 'text-[var(--color-slate)] hover:bg-[var(--color-cloud)] hover:text-[var(--color-ink)]'}
                `}
              >
                <div className={`mr-3 flex-shrink-0 ${isActive ? 'text-white' : 'text-[var(--color-phronesis-teal)]'}`}>
                  {item.icon}
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileSidebar}
              className="fixed inset-0 bg-[var(--color-ink)]/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-50 md:hidden"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16 z-20">
        {SidebarContent}
      </div>
    </>
  );
}
