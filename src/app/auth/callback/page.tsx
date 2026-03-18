/**
 * OAuth callback handler — processes redirects from Google, Apple, or email link.
 *
 * Uses implicit flow: Supabase returns tokens in the URL hash fragment
 * (#access_token=...&refresh_token=...). The client auto-detects them via
 * detectSessionInUrl: true and fires onAuthStateChange. This page waits for
 * that event, then redirects to /community.
 */

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // The Supabase client with detectSessionInUrl: true will automatically
    // pick up tokens from the hash fragment. Listen for the session event.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        window.location.href = '/community';
      }
    });

    // Fallback: if no auth event fires within 5s, check for an existing session
    // (tokens may have already been processed before the listener was set up)
    const timeout = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.href = '/community';
      } else {
        setError('No authentication credentials found. Please try signing in again.');
      }
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md text-center">
          <p className="text-red-500 font-semibold mb-2">Sign-in failed</p>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <a
            href="/auth"
            className="inline-block bg-teal-primary hover:bg-teal-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Try again
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-teal-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Signing you in...</p>
      </div>
    </div>
  );
}
