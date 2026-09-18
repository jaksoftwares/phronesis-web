'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api/axios';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setGlobalError(null);
    try {
      await api.post('/auth/request-password-reset', data);
      setSuccess(true);
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="h2 text-phronesis-blue mb-2">Check your email</h2>
          <p className="text-slate-500">
            If an account exists with that email, we've sent password reset instructions.
          </p>
        </div>
        <Link href="/learner/login" className="text-phronesis-blue hover:text-phronesis-gold font-semibold transition-colors">
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="h2 text-phronesis-blue mb-2">Reset Password</h2>
        <p className="text-slate-500">Enter your email address and we'll send you a link to reset your password.</p>
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
            Send Reset Link
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-8 text-center text-slate-500 text-sm">
        Remember your password?{' '}
        <Link href="/learner/login" className="text-phronesis-blue hover:text-phronesis-gold font-semibold transition-colors">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
