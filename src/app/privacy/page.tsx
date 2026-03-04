import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Body First privacy policy — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <article className="py-10 md:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-teal-primary transition-colors">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-gray-600">Privacy Policy</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-10">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-teal-primary">
            <p><em>Last updated: March 1, 2026</em></p>

            <h2>Information We Collect</h2>
            <p>
              When you use our website, we may collect information you provide directly, such as your
              name and email address when submitting a contact form or subscribing to our newsletter.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, send you updates you&apos;ve
              requested, and improve our website and services.
            </p>

            <h2>Data Storage</h2>
            <p>
              Your data is stored securely using industry-standard encryption. We use Supabase as our
              database provider, which maintains SOC 2 Type II compliance.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We may use third-party analytics services to understand how visitors use our site. These
              services collect anonymized usage data and do not track you across other websites.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. To exercise these
              rights, please contact us through our Get Started page.
            </p>

            <h2>Medical Disclaimer</h2>
            <p>
              Body First provides educational information only. We do not collect, store, or process
              any health or medical data through this website. Our content does not constitute medical
              advice, diagnosis, or treatment.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about this privacy policy, please reach out through
              our <a href="/get-started">contact page</a>.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
