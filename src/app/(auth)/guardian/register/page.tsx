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
import { PortalSwitcher } from '@/components/auth/PortalSwitcher';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  learnerRegistrationNumber: z.string().optional(),
  relationshipType: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function GuardianRegister() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormValues) => {
    setGlobalError(null);
    try {
      // Map to backend DTO
      const payload = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        learnerRegistrationNumber: data.learnerRegistrationNumber || undefined,
        relationshipType: data.relationshipType ? parseInt(data.relationshipType) : undefined
      };
      await api.post('/guardians/register', payload);
      router.push('/shared/verify-email');
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="h2 text-phronesis-blue mb-2">Guardian Registration</h2>
        <p className="text-slate-500">Create an account to track your dependents' learning progress.</p>
      </div>

      <PortalSwitcher currentPortal="guardian" type="register" />

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

        <FloatingLabelInput
          label="Phone Number"
          type="tel"
          autoComplete="tel"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />

        <div className="pt-2 pb-2 border-t border-[var(--color-mist)] mt-4">
          <p className="text-sm font-medium text-[var(--color-ink)] mb-3">Link Learner (Optional)</p>
          <div className="flex gap-4 mb-2">
            <div className="flex-1">
              <FloatingLabelInput
                label="Learner Registration ID (e.g. PHR-L-ABC123)"
                error={errors.learnerRegistrationNumber?.message}
                {...register('learnerRegistrationNumber')}
              />
            </div>
            <div className="flex-1">
              <div className="relative">
                <select
                  className={`block w-full px-4 py-3 bg-[var(--color-cloud)] border ${errors.relationshipType ? 'border-red-500 focus:border-red-500' : 'border-[var(--color-mist)] focus:border-[var(--color-phronesis-blue)]'} rounded-[var(--radius-input)] text-[var(--color-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--color-phronesis-blue)] transition-colors appearance-none`}
                  {...register('relationshipType')}
                  defaultValue=""
                >
                  <option value="" disabled>Relationship to Learner</option>
                  <option value="0">Parent</option>
                  <option value="1">Guardian</option>
                  <option value="2">Sponsor</option>
                  <option value="3">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

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
          <PrimaryButton type="submit" isLoading={isSubmitting} variant="secondary">
            Create Guardian Account
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-8 text-center text-slate-500 text-sm">
        Already have an account?{' '}
        <Link href="/guardian/login" className="text-phronesis-blue hover:text-phronesis-gold font-semibold transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
