'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api/axios';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email'); // Can pass email in url for initial check, but token alone might not have it. Usually backend verifies token alone or token+email. Based on our DTO it needs email too.
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('pending');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (token && email) {
      verifyToken(email, token);
    } else if (token && !email) {
      // If our DTO absolutely requires email, and the link didn't have it, we might prompt the user to enter their email.
      // For simplicity in this demo, we assume the link provided both `?email=x&token=y`.
      setStatus('error');
      setErrorMessage('Invalid verification link. Missing email parameter.');
    }
  }, [token, email]);

  const verifyToken = async (emailToVerify: string, verificationToken: string) => {
    setStatus('loading');
    try {
      await api.post('/auth/verify-email', {
        email: emailToVerify,
        token: verificationToken,
      });
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Verification failed. The link may have expired.');
    }
  };

  if (!token) {
    return (
      <div className="w-full text-center">
        <h2 className="h2 text-phronesis-blue mb-2">Verify Your Email</h2>
        <p className="text-slate-500 mb-6">
          We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
        </p>
        <div className="text-sm text-slate-500">
          Didn't receive an email?{' '}
          <Link href="/shared/resend-verification" className="text-phronesis-blue font-semibold hover:text-phronesis-gold transition-colors">
            Resend Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-center">
      {status === 'loading' && (
        <div>
          <div className="w-12 h-12 border-4 border-slate-200 border-t-phronesis-blue rounded-full animate-spin mx-auto mb-4" />
          <h2 className="h3 text-phronesis-blue">Verifying...</h2>
        </div>
      )}

      {status === 'success' && (
        <div>
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="h2 text-phronesis-blue mb-2">Email Verified!</h2>
          <p className="text-slate-500 mb-6">
            Your account is now fully active. You can log in to access the platform.
          </p>
          <Link href="/learner/login" className="inline-block bg-phronesis-blue text-white px-8 py-3 rounded-[var(--radius-input)] font-semibold transition-colors hover:bg-[#112a45]">
            Sign In Now
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div>
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="h3 text-red-600 mb-2">Verification Failed</h2>
          <p className="text-slate-500 mb-6">{errorMessage}</p>
          <Link href="/shared/resend-verification" className="text-phronesis-blue font-semibold hover:text-phronesis-gold">
            Request a new verification link
          </Link>
        </div>
      )}
    </div>
  );
}
