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

export default function TeacherLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
        setAccessToken(authData.accessToken);
        const meResponse = await api.get('/auth/me');
        const user = meResponse.data?.data;
        
        if (user) {
          setAuth(user, authData.accessToken);
          const primaryRole = user.roles?.[0]?.toLowerCase();
          if (primaryRole !== 'teacher') {
            api.post('/auth/logout').catch(() => {});
            setAuth(null as any, null as any);
            setGlobalError(`Access denied. This portal is for Teachers, but your account is a ${primaryRole || 'Unknown Role'}. Please use the Portal Switcher to select the correct portal.`);
            return;
          }
          
          router.push('/teacher/dashboard');
        }
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to login. Please try again.';
      if (msg.toLowerCase().includes('verified')) {
        setUnverifiedEmail(data.email);
        setNeedsVerification(true);
      } else {
        setGlobalError(msg);
      }
    }
  };

  const handleResend = async () => {
    setResendStatus('loading');
    try {
      await api.post('/auth/resend-email-verification', { email: unverifiedEmail });
      setResendStatus('success');
    } catch (error) {
      setResendStatus('error');
    }
  };

  if (needsVerification) {
    return (
      <div className="w-full text-center py-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="h2 text-phronesis-blue mb-2">Check Your Email</h2>
        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
          You need to verify your email address before you can sign in to the Teacher Portal.
        </p>
        
        {resendStatus === 'success' ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-xl mb-6">
            A new verification link has been sent to <strong>{unverifiedEmail}</strong>.
          </div>
        ) : (
          <PrimaryButton onClick={handleResend} isLoading={resendStatus === 'loading'}>
            Resend Verification Link
          </PrimaryButton>
        )}
        
        <div className="mt-6">
          <button onClick={() => setNeedsVerification(false)} className="text-phronesis-blue hover:underline text-sm font-medium">
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="h2 text-phronesis-blue mb-2">Teacher Portal</h2>
        <p className="text-slate-500">Sign in to access your classes and teaching resources.</p>
      </div>

      <PortalSwitcher currentPortal="teacher" type="login" />

      {globalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-input)] text-red-600 text-sm">
          {globalError}
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
            Sign In as Teacher
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-8 text-center text-slate-500 text-sm">
        Interested in teaching at Phronesis?{' '}
        <Link href="/teacher/apply" className="text-phronesis-blue hover:text-phronesis-gold font-semibold transition-colors">
          Apply Now
        </Link>
      </div>
    </div>
  );
}
