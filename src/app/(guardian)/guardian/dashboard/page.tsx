'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { LinkedLearnersWidget } from '@/components/guardian/dashboard/LinkedLearnersWidget';
import { LearnerActivityFeed } from '@/components/guardian/dashboard/LearnerActivityFeed';
import { SubscriptionStatusCard } from '@/components/guardian/dashboard/SubscriptionStatusCard';

export default function GuardianDashboard() {
  const { user } = useAuthStore();

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-7xl mx-auto space-y-6 pb-12"
    >
      {/* Top Section: Welcome Hero */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-sm border border-[var(--color-mist)] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 font-serif italic text-[#D5A63A]">
              Guardian Portal
            </h2>
            {user ? (
              <h1 className="text-4xl font-bold mb-4 text-[var(--color-ink)]">
                Welcome, {user.firstName}
              </h1>
            ) : (
              <div className="h-10 w-64 bg-[var(--color-mist)] rounded animate-pulse mb-4"></div>
            )}
            <p className="text-[var(--color-slate)] text-lg max-w-lg leading-relaxed">
              Monitor your dependents' learning progress and manage your subscriptions.
            </p>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[var(--color-cloud)] to-transparent rounded-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        </div>
      </motion.div>

      {/* Middle Section: Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on large screens) */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <LinkedLearnersWidget />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <LearnerActivityFeed />
          </motion.div>
        </div>

        {/* Right Column (1/3 width on large screens) */}
        <div className="xl:col-span-1">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="h-full">
            <SubscriptionStatusCard />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
