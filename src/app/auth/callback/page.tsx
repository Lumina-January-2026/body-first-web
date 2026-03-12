'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error: err }) => {
          if (err) {
            setError(err.message);
          } else {
            window.location.href = '/';
          }
        });
      return;
    }

    // PKCE flow: code is in query params
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          window.location.href = '/';
        }
      });
      return;
    }

    setError('No authentication credentials found in the URL.');
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md text-center">
          <p className="text-red-500 font-semibold mb-2">Sign-in failed</p>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <a
            href="/"
            className="inline-block bg-teal-primary hover:bg-teal-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Back to home
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
