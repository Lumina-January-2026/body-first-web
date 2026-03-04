'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase.from('website_leads').insert({
        name: '',
        email,
        source: 'newsletter',
      });

      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-sm text-teal-primary font-medium">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-teal-primary">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
        You&apos;re subscribed! We&apos;ll keep you in the loop.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-primary/50 focus:border-transparent transition-all duration-200"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-teal-primary hover:bg-teal-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'submitting' ? '...' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-400 mt-1">Something went wrong.</p>
      )}
    </form>
  );
}
