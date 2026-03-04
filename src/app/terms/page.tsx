import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Body First terms of service — the rules and guidelines for using our website.',
};

export default function TermsPage() {
  return (
    <article className="py-10 md:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-teal-primary transition-colors">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-gray-600">Terms of Service</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-10">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-teal-primary">
            <p><em>Last updated: March 1, 2026</em></p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using the Body First website, you accept and agree to be bound by
              these terms of service. If you do not agree, please do not use our website.
            </p>

            <h2>Educational Content Only</h2>
            <p>
              All content on this website is provided for educational and informational purposes only.
              Body First does not provide medical advice, diagnosis, or treatment. Always seek the
              advice of your physician or other qualified healthcare provider with any questions you
              may have regarding a medical condition or medication.
            </p>

            <h2>No Medical Recommendations</h2>
            <p>
              Nothing on this website should be construed as a recommendation to start, stop, or
              change any medication. GLP-1 medications are prescription drugs that require evaluation
              by a licensed healthcare provider.
            </p>

            <h2>Accuracy of Information</h2>
            <p>
              We strive to keep our content accurate and up-to-date, but medication information,
              pricing, and availability can change. Always verify important details with your
              healthcare provider or pharmacist.
            </p>

            <h2>User Submissions</h2>
            <p>
              When you submit information through our contact form or newsletter signup, you agree
              that the information you provide is accurate and that you consent to our use of it
              as described in our Privacy Policy.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, and logos, is the property of
              Body First and is protected by applicable intellectual property laws.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Body First shall not be liable for any damages arising from your use of this website
              or reliance on its content. Use of this website is at your own risk.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the website after
              changes constitutes acceptance of the updated terms.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about these terms, please reach out through
              our <a href="/get-started">contact page</a>.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
