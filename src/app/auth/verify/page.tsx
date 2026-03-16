/**
 * OTP verification page — confirms email after sign-up.
 *
 * After signUpWithEmail(), Supabase sends a confirmation email with either
 * a 6-digit OTP code or a confirmation link (depending on the email template
 * configured in Supabase Dashboard → Auth → Email Templates).
 *
 * This page handles the OTP code flow: user enters the 6-digit code from
 * their email, we call verifyOtp({ type: 'signup' }), and on success
 * redirect to home.
 *
 * NOTE: If Supabase is configured with the default link-based template,
 * this page shows a "check your email" message instead. The link in the
 * email redirects to /auth/callback which handles session creation.
 */

'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProfile } from '@/components/community/ProfileContext';

function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const { verifyEmailOTP } = useProfile();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Backspace: clear current and move to previous
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || '';
    }
    setCode(newCode);
    // Focus last filled or the input after last digit
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = code.join('');
    if (token.length !== 6) return;

    setError(null);
    setLoading(true);

    const result = await verifyEmailOTP(email, token);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? 'Invalid code. Please try again.');
      return;
    }

    // Verification successful — redirect to home
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const isComplete = code.every((d) => d !== '');

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card max-w-md w-full overflow-hidden">
        <div className="p-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-6 h-6 text-teal-primary">
              <svg fill="currentColor" viewBox="0 0 48 48">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Body First</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-sm text-gray-500 mb-6">
            We sent a verification code to{' '}
            <span className="font-semibold text-gray-700">{email || 'your email'}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 6-digit code input */}
            <div className="flex justify-center gap-2" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-teal-primary/30 focus:border-teal-primary focus:outline-none transition-all"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={!isComplete || loading}
              className="w-full bg-teal-primary hover:bg-teal-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-6">
            Didn&apos;t get the code? Check your spam folder or{' '}
            <Link href="/auth" className="text-teal-primary hover:underline">
              try again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
