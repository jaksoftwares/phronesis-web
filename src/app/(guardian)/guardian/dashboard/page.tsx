'use client';
import { useAuthStore } from '@/store/authStore';

export default function GuardianDashboard() {
  const { user } = useAuthStore();
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="h1 text-phronesis-blue mb-6">Welcome back, {user?.firstName || 'Guardian'}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="h3 text-slate-800 mb-2">My Dependents</h3>
          <p className="text-slate-500">You haven't linked any learner accounts yet.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="h3 text-slate-800 mb-2">Billing & Subscriptions</h3>
          <p className="text-slate-500">No active subscriptions found.</p>
        </div>
      </div>
    </div>
  );
}
