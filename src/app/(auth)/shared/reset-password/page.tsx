'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api/axios';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { PasswordStrengthMeter } from '@/components/ui/PasswordStrengthMeter';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof schema>;

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userRole, setUserRole] = useState<string>('learner');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const password = watch('newPassword');

  const onSubmit = async (data: FormValues) => {
    if (!token) {
      setGlobalError('Invalid or missing reset token.');
      return;
    }
    setGlobalError(null);
    try {
      const response = await api.post('/auth/reset-password', {
        email: data.email,
        token: token,
        newPassword: data.newPassword,
      });
      if (response.data?.data?.role) {
        setUserRole(response.data.data.role.toLowerCase());
      }
      setSuccess(true);
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Failed to reset password. The link may have expired.');
    }
  };

  if (!token) {
    return (
      <div className="w-full text-center">
         <h2 className="h3 text-red-600 mb-2">Invalid Request</h2>
         <p className="text-slate-500 mb-6">No reset token was provided.</p>
         <Link href="/shared/forgot-password" className="text-phronesis-blue font-semibold">
           Request a new link
         </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="h2 text-phronesis-blue mb-2">Password Reset Successful</h2>
          <p className="text-slate-500">
            Your password has been securely updated.
          </p>
        </div>
        <Link href={`/${userRole}/login`} className="inline-block mt-4 text-white bg-phronesis-blue px-6 py-3 rounded-[var(--radius-input)] font-semibold transition-colors hover:bg-[#112a45]">
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="h2 text-phronesis-blue mb-2">Create New Password</h2>
        <p className="text-slate-500">Please enter your email and choose a strong new password.</p>
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

        <div className="mb-2">
          <FloatingLabelInput
            label="New Password"
            type="password"
            autoComplete="new-password"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
          <PasswordStrengthMeter password={password} />
        </div>

        <FloatingLabelInput
          label="Confirm New Password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div className="pt-2">
          <PrimaryButton type="submit" isLoading={isSubmitting}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <React.Suspense fallback={<div className="w-full text-center py-8">Loading...</div>}>
      <ResetPasswordContent />
    </React.Suspense>
  );
}
