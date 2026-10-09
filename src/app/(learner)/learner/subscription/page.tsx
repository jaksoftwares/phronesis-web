'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api/axios';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useRouter } from 'next/navigation';

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [provisioning, setProvisioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/commerce/plans');
        setPlans(res.data);
      } catch (err) {
        console.error('Failed to load plans', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSubscribe = async (planCode: string) => {
    if (provisioning) return;
    setProvisioning(true);
    try {
      await api.post('/commerce/subscriptions/mock-provision', { planCode });
      alert('Subscription successful! You now have premium access.');
      router.push('/learner/dashboard');
    } catch (err: any) {
      alert(err.response?.data || 'Failed to subscribe');
    } finally {
      setProvisioning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-8 pb-12 pt-6"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Upgrade Your Learning Experience</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Get unlimited access to premium videos, interactive simulations, and mock exams by subscribing to one of our plans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => {
          const features = plan.featuresJson ? JSON.parse(plan.featuresJson) : [
            'Full Curriculum Access',
            'HD Video Lessons',
            'Practice Quizzes'
          ];
          const isPopular = idx === 1 || plan.name.toLowerCase().includes('premium');

          return (
            <motion.div 
              key={plan.id}
              whileHover={{ y: -8 }}
              className={`relative bg-white rounded-3xl p-8 shadow-sm border-2 flex flex-col ${
                isPopular ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-slate-200'
              }`}
            >
              {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-[#1cb5c5] text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-500 mb-6 h-12">{plan.description}</p>
              
              <div className="mb-6 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-slate-900">{plan.currency} {plan.price}</span>
                <span className="text-slate-500 font-medium pb-1">/{plan.interval.toLowerCase()}</span>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan.planCode)}
                disabled={provisioning}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  isPopular 
                    ? 'bg-gradient-to-r from-blue-600 to-[#1cb5c5] text-white hover:opacity-90 shadow-md'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                } disabled:opacity-50`}
              >
                {provisioning ? 'Processing...' : 'Subscribe Now'}
              </button>
            </motion.div>
          );
        })}

        {plans.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-200">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Plans Available</h3>
            <p className="text-slate-500">Check back later for exciting new subscription packages!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
