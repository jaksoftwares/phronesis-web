'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api/axios';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeachers: 0,
    totalLearners: 0,
    pendingApplications: 0,
    totalRevenue: 0,
    activeClasses: 0,
    activeSubscriptions: 0,
    pendingReports: 0,
  });

  useEffect(() => {
    setMounted(true);
    if (user) {
      const primaryRole = user.roles?.[0]?.toLowerCase();
      if (primaryRole !== 'admin') {
        router.push('/admin/login');
      } else {
        fetchStats();
      }
    } else {
      const timer = setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        if (!currentUser) router.push('/admin/login');
        else fetchStats();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  const fetchStats = async () => {
    try {
      const [usersRes, appsRes, analyticsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/teacher-applications'),
        api.get('/admin/analytics/overview')
      ]);

      const allUsers = usersRes.data?.data || [];
      const apps = appsRes.data?.data || [];
      const analytics = analyticsRes.data?.data || {};
      
      setStats({
        totalUsers: analytics.TotalUsers || allUsers.length,
        totalTeachers: allUsers.filter((u: any) => u.roles?.includes('Teacher')).length,
        totalLearners: allUsers.filter((u: any) => u.roles?.includes('Learner')).length,
        pendingApplications: apps.filter((a: any) => a.status === 1 || a.status === 2).length,
        totalRevenue: analytics.TotalRevenue || 0,
        activeClasses: analytics.ActiveClasses || 0,
        activeSubscriptions: analytics.ActiveSubscriptions || 0,
        pendingReports: analytics.PendingReports || 0,
      });
    } catch (err) {
      console.error('Failed to fetch dashboard stats', err);
    }
  };

  if (!mounted || !user) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-phronesis-blue mb-6">Welcome back, Administrator {user?.firstName}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-phronesis-blue">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.activeSubscriptions}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Active Classes</h3>
          <p className="text-3xl font-bold text-phronesis-teal">{stats.activeClasses}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Pending Teacher Apps</h3>
          <p className="text-3xl font-bold text-phronesis-gold">{stats.pendingApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Pending Reports</h3>
          <p className="text-3xl font-bold text-red-600">{stats.pendingReports}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Teachers</h3>
          <p className="text-3xl font-bold text-phronesis-teal">{stats.totalTeachers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Learners</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalLearners}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button onClick={() => router.push('/admin/teachers/applications')} className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-phronesis-blue hover:bg-slate-50 transition-colors">
              <h4 className="font-semibold text-slate-900">Review Applications</h4>
              <p className="text-sm text-slate-500">You have {stats.pendingApplications} applications needing review.</p>
            </button>
            <button onClick={() => router.push('/admin/users')} className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-phronesis-blue hover:bg-slate-50 transition-colors">
              <h4 className="font-semibold text-slate-900">Manage Users</h4>
              <p className="text-sm text-slate-500">View and manage all {stats.totalUsers} platform users.</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">System Health</h2>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <p className="font-medium text-slate-700">All systems are fully operational</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">API Uptime</span>
                <span className="font-medium text-slate-900">99.9%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Database Uptime</span>
                <span className="font-medium text-slate-900">100%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
