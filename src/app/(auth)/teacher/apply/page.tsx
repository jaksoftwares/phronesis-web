'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api/axios';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { PasswordStrengthMeter } from '@/components/ui/PasswordStrengthMeter';

const applySchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ApplyFormValues = z.infer<typeof applySchema>;

export default function TeacherApply() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
  });

  const password = watch('password');

  const onSubmit = async (data: ApplyFormValues) => {
    setGlobalError(null);
    try {
      // Teachers register process usually places them in an 'applicant' state
      await api.post('/auth/register', data);
      router.push('/shared/verify-email');
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="h2 text-phronesis-blue mb-2">Apply to Teach</h2>
        <p className="text-slate-500">Join our network of elite educators.</p>
      </div>

      {globalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-input)] text-red-600 text-sm">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-4">
          <FloatingLabelInput
            label="First Name"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <FloatingLabelInput
            label="Last Name"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <FloatingLabelInput
          label="Email Address"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="mb-2">
          <FloatingLabelInput
            label="Password"
            type="password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordStrengthMeter password={password} />
        </div>

        <FloatingLabelInput
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div className="pt-6">
          <PrimaryButton type="submit" isLoading={isSubmitting} variant="outline">
            Start Application
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-8 text-center text-slate-500 text-sm">
        Already a teacher?{' '}
        <Link href="/teacher/login" className="text-phronesis-blue hover:text-phronesis-gold font-semibold transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
