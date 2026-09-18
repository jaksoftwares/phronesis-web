'use client';
import { useAuthStore } from '@/store/authStore';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="h1 text-phronesis-blue mb-6">Welcome back, Administrator {user?.firstName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="h3 text-slate-800 mb-2">Total Users</h3>
          <p className="text-slate-500">System analytics currently unavailable.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="h3 text-slate-800 mb-2">Active Courses</h3>
          <p className="text-slate-500">Curriculum metrics currently unavailable.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="h3 text-slate-800 mb-2">System Health</h3>
          <p className="text-slate-500 text-green-600 font-medium">All systems operational.</p>
        </div>
      </div>
    </div>
  );
}
