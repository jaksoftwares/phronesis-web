'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api/axios';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

const resendSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ResendFormValues = z.infer<typeof resendSchema>;

export default function ResendVerification() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendFormValues>({
    resolver: zodResolver(resendSchema),
  });

  const onSubmit = async (data: ResendFormValues) => {
    setGlobalError(null);
    try {
      await api.post('/auth/resend-email-verification', { email: data.email });
      setStatus('success');
    } catch (error: any) {
      // Even on failure, we often just show success to prevent email enumeration,
      // but let's show the actual error if the backend returns one for dev visibility
      setGlobalError(error.response?.data?.message || 'Failed to resend verification link.');
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-phronesis-blue/10 text-phronesis-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="h2 text-phronesis-blue mb-2">Check Your Email</h2>
        <p className="text-slate-500 mb-6">
          If an account exists for that email, we've sent a new verification link.
        </p>
        <Link href="/learner/login" className="inline-block bg-phronesis-blue text-white px-8 py-3 rounded-[var(--radius-input)] font-semibold transition-colors hover:bg-[#112a45]">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="h2 text-phronesis-blue mb-2">Resend Verification Link</h2>
        <p className="text-slate-500">
          Enter the email address you registered with to receive a new verification link.
        </p>
      </div>

      {globalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-input)] text-red-600 text-sm">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FloatingLabelInput
          label="Email Address"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="pt-2">
          <PrimaryButton type="submit" isLoading={isSubmitting}>
            Send Link
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-8 text-center text-slate-500 text-sm">
        Remembered your password?{' '}
        <Link href="/learner/login" className="text-phronesis-blue font-semibold hover:text-phronesis-gold transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
