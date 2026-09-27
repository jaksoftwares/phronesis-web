'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api/axios';
import { useAuthStore } from '@/store/authStore';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
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
        setAccessToken(authData.accessToken);
        const meResponse = await api.get('/auth/me');
        const user = meResponse.data?.data;
        
        if (user) {
          setAuth(user, authData.accessToken);
          const primaryRole = user.roles?.[0]?.toLowerCase();
          if (primaryRole !== 'admin') {
            api.post('/auth/logout').catch(() => {});
            setAuth(null as any, null as any);
            setGlobalError(`Access denied. This portal is for Administrators, but your account is a ${primaryRole || 'Unknown Role'}.`);
            return;
          }
          
          router.push('/admin/dashboard');
        }
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to login. Please try again.';
      setGlobalError(msg);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="h2 text-phronesis-blue mb-2">Admin Portal</h2>
        <p className="text-slate-500">Sign in to manage the Phronesis platform.</p>
      </div>

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

        <div className="pt-4">
          <PrimaryButton type="submit" isLoading={isSubmitting}>
            Sign In to Admin Panel
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
