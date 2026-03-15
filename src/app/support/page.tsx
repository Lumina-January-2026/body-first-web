import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/cta/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Support',
  description: 'Get in touch with the Body First team. We\'re here to help with any questions about the app, your account, or GLP-1 resources.',
};

export default function SupportPage() {
  return (
    <div className="py-10 md:py-14 px-6">
      {/* Breadcrumbs */}
      <nav className="max-w-xl mx-auto flex items-center gap-2 text-sm text-brand-muted mb-8">
        <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-brand-gray">Support</span>
      </nav>

      <div className="max-w-xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">We&apos;re here to help</h1>
        <p className="text-gray-500 text-lg">
          Have a question or need support? Drop us a message and we&apos;ll get back to you quickly.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}
