'use client';
import React from 'react';
import { useLearnerDashboard } from '@/hooks/api/useLearnerDashboard';
import { WelcomeWidget } from '@/components/learner/dashboard/WelcomeWidget';
import { UpcomingClassesList } from '@/components/learner/dashboard/UpcomingClassesList';
import { ContinueLearningCard } from '@/components/learner/dashboard/ContinueLearningCard';
import { RecentActivityFeed } from '@/components/learner/dashboard/RecentActivityFeed';
import { motion } from 'framer-motion';

export default function LearnerDashboard() {
  const { dashboard, upcomingClasses, continueLearning, recentResources } = useLearnerDashboard();
  
  if (dashboard.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[var(--color-phronesis-blue)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const userObj = dashboard.data?.user ? {
    firstName: dashboard.data.user.firstName,
    lastName: dashboard.data.user.lastName
  } : undefined;

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
        <WelcomeWidget 
          user={userObj} 
          learningStreak={dashboard.data?.learningStreak || 0} 
        />
      </motion.div>

      {/* Middle Section: Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on large screens) */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <ContinueLearningCard resource={continueLearning.data} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <RecentActivityFeed resources={recentResources.data} />
          </motion.div>
        </div>

        {/* Right Column (1/3 width on large screens) */}
        <div className="xl:col-span-1">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="h-full">
            <UpcomingClassesList classes={upcomingClasses.data} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
