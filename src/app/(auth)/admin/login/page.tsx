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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
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
        api.defaults.headers.common['Authorization'] = `Bearer ${authData.accessToken}`;
        const meResponse = await api.get('/auth/me');
        const user = meResponse.data?.data;
        
        // Ensure user is actually an admin before allowing login via this portal
        const roles = user?.roles || [];
        if (user && (roles.includes('Admin') || roles.includes('Staff'))) {
          setAuth(user, authData.accessToken);
          router.push('/admin/dashboard');
        } else {
          setGlobalError('Unauthorized access. This portal is for Staff and Administrators only.');
        }
      }
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="h2 text-phronesis-blue mb-2">Staff & Administration</h2>
        <p className="text-slate-500">Secure access gateway for platform administrators.</p>
      </div>

      {globalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-input)] text-red-600 text-sm">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <FloatingLabelInput
          label="Administrator Email"
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
          <PrimaryButton type="submit" isLoading={isSubmitting} className="bg-slate-800 hover:bg-slate-900 border-none">
            Secure Login
          </PrimaryButton>
        </div>
      </form>
      
      <div className="mt-8 text-center text-slate-500 text-sm">
        <Link href="/shared/forgot-password" className="text-phronesis-blue hover:text-phronesis-gold font-medium transition-colors">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
