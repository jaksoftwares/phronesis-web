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
import { useAcademicGrades } from '@/hooks/api/useAcademicGrades';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  gradeLevelId: z.string().min(1, 'Please select a grade level'),
  dateOfBirth: z.string().min(1, 'Please enter your date of birth'),
  schoolName: z.string().optional(),
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

export default function LearnerRegister() {
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
  const { data: grades, isLoading: gradesLoading } = useAcademicGrades();

  const onSubmit = async (data: RegisterFormValues) => {
    setGlobalError(null);
    try {
      // Create ISO 8601 string for DateOfBirth
      const dob = new Date(data.dateOfBirth).toISOString();
      const payload = {
        ...data,
        dateOfBirth: dob
      };
      
      await api.post('/learners/register', payload);
      router.push('/shared/verify-email');
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="h2 text-phronesis-blue mb-2">Join Phronesis</h2>
        <p className="text-slate-500">Create your Learner account to access premium educational content.</p>
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

        <div className="flex gap-4">
          <div className="w-1/2 flex flex-col">
            <select 
              {...register('gradeLevelId')}
              className={`w-full h-[52px] px-4 bg-transparent border rounded-[var(--radius-input)] text-slate-800 outline-none transition-all ${
                errors.gradeLevelId ? 'border-red-500' : 'border-slate-300 focus:border-phronesis-blue focus:ring-1 focus:ring-phronesis-blue'
              }`}
              disabled={gradesLoading}
            >
              <option value="">Select Grade Level...</option>
              {grades?.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            {errors.gradeLevelId && <span className="text-red-500 text-xs mt-1">{errors.gradeLevelId.message}</span>}
          </div>
          <div className="w-1/2">
            <FloatingLabelInput
              label="Date of Birth"
              type="date"
              error={errors.dateOfBirth?.message}
              {...register('dateOfBirth')}
            />
          </div>
        </div>

        <FloatingLabelInput
          label="School Name (Optional)"
          error={errors.schoolName?.message}
          {...register('schoolName')}
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
          <PrimaryButton type="submit" isLoading={isSubmitting}>
            Create Account
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-8 text-center text-slate-500 text-sm">
        Already have an account?{' '}
        <Link href="/learner/login" className="text-phronesis-blue hover:text-phronesis-gold font-semibold transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
