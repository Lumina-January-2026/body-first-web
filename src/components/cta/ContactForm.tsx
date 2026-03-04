'use client';

import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', question: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase.from('website_leads').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        question: form.question || null,
        source: 'contact-form',
      });

      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', phone: '', question: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-50 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-teal-primary">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
        <p className="text-sm text-gray-500">
          We&apos;ve received your message and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-1">Get in Touch</h3>
      <p className="text-sm text-gray-500 mb-6">We&apos;d love to hear from you. No pressure, ever.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
        <Input label="Email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
        <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(optional)" />
        <Input label="Question" name="question" multiline value={form.question} onChange={handleChange} placeholder="How can we help?" />
        <Button type="submit" disabled={status === 'submitting'} fullWidth size="lg">
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>
        {status === 'error' && (
          <p className="text-sm text-red-500 text-center">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
