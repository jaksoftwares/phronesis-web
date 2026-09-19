'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api/axios';
import { useAuthStore } from '@/store/authStore';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { PortalSwitcher } from '@/components/auth/PortalSwitcher';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LearnerLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setGlobalError(null);
    try {
      const response = await api.post('/auth/login', data);
      const authData = response.data?.data;
      
      if (authData?.accessToken) {
        // Fix: Set the token in the store immediately so the axios interceptor uses it
        setAccessToken(authData.accessToken);
        const meResponse = await api.get('/auth/me');
        const user = meResponse.data?.data;
        
        if (user) {
          setAuth(user, authData.accessToken);
          const primaryRole = user.roles?.[0]?.toLowerCase();
          if (primaryRole !== 'learner') {
            api.post('/auth/logout').catch(() => {});
            setAuth(null as any, null as any); // Clear store if needed, or just let it be overwritten
            setGlobalError(`Access denied. This portal is for Learners, but your account is a ${primaryRole || 'Unknown Role'}. Please use the Portal Switcher to select the correct portal.`);
            return;
          }
          
          router.push('/learner/dashboard');
        }
      }
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="h2 text-phronesis-blue mb-2">Welcome Back</h2>
        <p className="text-slate-500">Sign in to your Learner Portal to continue your journey.</p>
      </div>

      <PortalSwitcher currentPortal="learner" type="login" />

      {globalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-input)] text-red-600 text-sm">
          {globalError}
          {globalError.toLowerCase().includes('verified') && (
            <div className="mt-2">
              <Link href="/shared/resend-verification" className="font-semibold underline hover:text-red-800">
                Resend verification link
              </Link>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <FloatingLabelInput
          label="Email Address"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <FloatingLabelInput
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex justify-end pt-1 pb-3">
           <Link href="/shared/forgot-password" className="text-sm text-phronesis-blue hover:text-phronesis-gold transition-colors font-medium">
             Forgot password?
           </Link>
        </div>

        <div className="pt-4">
          <PrimaryButton type="submit" isLoading={isSubmitting}>
            Sign In
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-8 text-center text-slate-500 text-sm">
        Don't have an account?{' '}
        <Link href="/learner/register" className="text-phronesis-blue hover:text-phronesis-gold font-semibold transition-colors">
          Register here
        </Link>
      </div>
    </div>
  );
}
