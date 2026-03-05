import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Boolean Bliss LLC privacy policy for the Body First app and website — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <article className="py-10 md:py-14 px-6">
      {/* Breadcrumbs */}
      <nav className="max-w-3xl mx-auto flex items-center gap-2 text-sm text-brand-muted mb-8">
        <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-brand-gray">Privacy Policy</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-brand-card shadow-card p-6 md:p-10">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-brand-gray prose-p:leading-relaxed prose-a:text-brand-blue prose-li:text-brand-gray">
            <p><em>Effective Date: March 4, 2026</em></p>

            <p>
              Boolean Bliss LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Body First mobile application
              (the &quot;App&quot;) and the Body First website at bodyfirst.app (the &quot;Website,&quot; collectively the &quot;Services&quot;).
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.
            </p>

            <p>
              By using our Services, you agree to the collection and use of information in accordance with this policy.
              If you do not agree, please do not use our Services.
            </p>

            {/* Section 1 */}
            <h2>1. Information We Collect</h2>

            <h3>Information You Provide Directly</h3>
            <ul>
              <li><strong>Onboarding Data:</strong> When you set up your profile in the App, you may provide health and wellness goals, medication interests (e.g., which GLP-1 medications you are researching), and personal concerns (e.g., cost, side effects, needles, doctor conversations, qualification, effectiveness, judgment, commitment).</li>
              <li><strong>Contact Information:</strong> If you submit a contact form or subscribe to our newsletter on the Website, you may provide your name and email address.</li>
              <li><strong>Account Information:</strong> Email address and display name used to create and manage your account.</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, and mobile network information.</li>
              <li><strong>Usage Data:</strong> Features accessed, screens viewed, session duration, and in-app interactions.</li>
              <li><strong>Log Data:</strong> IP address, browser type (for the Website), access times, and referring URLs.</li>
              <li><strong>Purchase Information:</strong> Subscription status, transaction identifiers, and billing periods are processed through our subscription management provider. We do not directly collect or store your payment card details.</li>
            </ul>

            {/* Section 2 */}
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li><strong>Provide and personalize the Services:</strong> Deliver content relevant to your medication interests and wellness goals.</li>
              <li><strong>Process subscriptions:</strong> Manage your subscription status and provide access to premium features.</li>
              <li><strong>Communicate with you:</strong> Respond to inquiries, send service-related notices, and deliver newsletter content you have requested.</li>
              <li><strong>Improve our Services:</strong> Analyze usage patterns to improve app functionality, content quality, and user experience.</li>
              <li><strong>Ensure security:</strong> Detect and prevent fraud, abuse, and technical issues.</li>
              <li><strong>Comply with legal obligations:</strong> Meet applicable legal requirements and respond to lawful requests.</li>
            </ul>
            <p>
              <strong>We do not use your health-related onboarding data for advertising, third-party data mining, or any purpose unrelated to providing the Services.</strong>
            </p>

            {/* Section 3 */}
            <h2>3. Third-Party Service Providers</h2>
            <p>We use the following third-party service providers to operate our Services. Each provider processes data only as necessary to perform their function and is contractually required to protect your information:</p>
            <ul>
              <li><strong>Supabase:</strong> Cloud database and backend infrastructure. Stores account data, onboarding preferences, and website lead submissions. Supabase maintains SOC 2 Type II compliance and encrypts data at rest and in transit.</li>
              <li><strong>RevenueCat:</strong> Subscription management and in-app purchase processing. Receives transaction identifiers and subscription status from Apple App Store and Google Play Store. RevenueCat does not receive your health data or onboarding preferences.</li>
              <li><strong>Analytics Tools:</strong> We may use anonymized analytics services to understand how users interact with the App and Website. These services collect aggregated, non-personally-identifiable usage data.</li>
            </ul>

            {/* Section 4 */}
            <h2>4. Data Sharing and Disclosure</h2>
            <ul>
              <li><strong>We do not sell your personal information</strong> to third parties.</li>
              <li><strong>We do not share your health-related data</strong> with advertisers, data brokers, or any third parties for their own marketing purposes.</li>
              <li><strong>We do not send personal data to third-party AI systems</strong> for processing. If this changes in the future, we will update this policy and obtain your explicit consent before any such sharing occurs.</li>
              <li><strong>Service Providers:</strong> We share data with the service providers listed in Section 3 solely to operate and improve the Services.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, legal process, or governmental request.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change.</li>
            </ul>

            {/* Section 5 */}
            <h2>5. Data Retention and Deletion</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide the Services.
              If you delete your account, we will permanently delete your personal data within 30 days, except where
              retention is required by law (e.g., transaction records for tax compliance).
            </p>
            <p>
              <strong>Account Deletion:</strong> You can delete your account at any time through the App settings.
              Account deletion is permanent and cannot be reversed. All associated personal data — including onboarding
              preferences, usage history, and contact information — will be permanently removed from our systems.
            </p>
            <p>
              You may also request account deletion by contacting us at <a href="mailto:abhinay@recreateapp.com">abhinay@recreateapp.com</a>.
              We will process deletion requests within 30 days.
            </p>

            {/* Section 6 */}
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> Request that we delete your personal data (see Section 5).</li>
              <li><strong>Data Portability:</strong> Request a machine-readable copy of your data.</li>
              <li><strong>Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time.</li>
              <li><strong>Opt-Out of Communications:</strong> Unsubscribe from marketing emails at any time using the link in each email.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <a href="mailto:abhinay@recreateapp.com">abhinay@recreateapp.com</a>.
              We will respond within 30 days (or sooner where required by applicable law).
            </p>

            {/* Section 7 */}
            <h2>7. California Residents (CCPA/CPRA)</h2>
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):</p>
            <ul>
              <li><strong>Right to Know:</strong> You may request details about the categories and specific pieces of personal information we have collected, the sources of collection, the purposes for collection, and the categories of third parties with whom we share it.</li>
              <li><strong>Right to Delete:</strong> You may request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong>Right to Opt-Out of Sale/Sharing:</strong> We do not sell or share your personal information for cross-context behavioral advertising. No opt-out action is required.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA/CPRA rights.</li>
            </ul>
            <p>To submit a CCPA/CPRA request, contact us at <a href="mailto:abhinay@recreateapp.com">abhinay@recreateapp.com</a>.</p>

            {/* Section 8 */}
            <h2>8. European Economic Area and United Kingdom Residents (GDPR)</h2>
            <p>If you are located in the EEA or UK, the following applies:</p>
            <ul>
              <li><strong>Legal Basis for Processing:</strong> We process your data based on: (a) your consent (onboarding preferences, newsletter), (b) contractual necessity (providing the Services you requested), and (c) legitimate interests (analytics, security, service improvement).</li>
              <li><strong>International Data Transfers:</strong> Your data may be transferred to and processed in the United States. We ensure appropriate safeguards are in place, including standard contractual clauses where required.</li>
              <li><strong>Supervisory Authority:</strong> You have the right to lodge a complaint with your local data protection authority if you believe your data has been processed unlawfully.</li>
              <li><strong>Additional Rights:</strong> In addition to the rights in Section 6, you may have the right to restrict processing and to object to processing based on legitimate interests.</li>
            </ul>

            {/* Section 9 */}
            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our Services are intended for adults aged 18 and older. We do not knowingly collect personal information
              from children under the age of 13. If we become aware that we have collected personal information from
              a child under 13, we will take immediate steps to delete that information from our servers.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us with personal information,
              please contact us at <a href="mailto:abhinay@recreateapp.com">abhinay@recreateapp.com</a> so we can take appropriate action.
            </p>

            {/* Section 10 */}
            <h2>10. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data, including:</p>
            <ul>
              <li>All data transmitted between your device and our servers is encrypted using TLS (Transport Layer Security).</li>
              <li>Data at rest is encrypted using industry-standard AES-256 encryption.</li>
              <li>Our database provider (Supabase) maintains SOC 2 Type II compliance.</li>
              <li>Access to personal data is restricted to authorized personnel on a need-to-know basis.</li>
            </ul>
            <p>
              While we strive to protect your information, no method of electronic transmission or storage is 100% secure.
              We cannot guarantee absolute security.
            </p>

            {/* Section 11 */}
            <h2>11. App Tracking and Advertising</h2>
            <p>
              Body First does not engage in cross-app tracking. We do not use your data to track you across
              other companies&apos; apps or websites for advertising purposes. We do not display third-party advertisements
              in the App or on the Website.
            </p>
            <p>
              Our analytics are limited to aggregated, anonymized usage data within our own Services.
              Apple&apos;s App Tracking Transparency (ATT) permission is not required for our current data practices.
            </p>

            {/* Section 12 */}
            <h2>12. Medical Disclaimer</h2>
            <p>
              Body First provides educational and informational content only. <strong>We are not a medical device and do
              not provide medical advice, diagnosis, or treatment.</strong> We do not collect, store, or process clinical
              health records or protected health information (PHI) as defined under HIPAA.
            </p>
            <p>
              The onboarding data we collect (health goals, medication interests, concerns) is used solely to personalize
              your educational content experience. This data does not constitute a medical record and is not shared with
              healthcare providers.
            </p>
            <p>
              Always consult your physician or other qualified healthcare provider with any questions about a medical
              condition or medication.
            </p>

            {/* Section 13 */}
            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we make material changes, we will notify you
              by posting the updated policy on this page with a new effective date and, where appropriate, through
              an in-app notification or email.
            </p>
            <p>
              Your continued use of the Services after any changes indicates your acceptance of the updated policy.
              We encourage you to review this page periodically.
            </p>

            {/* Section 14 */}
            <h2>14. Contact Us</h2>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
            <ul>
              <li><strong>Boolean Bliss LLC</strong></li>
              <li>Email: <a href="mailto:abhinay@recreateapp.com">abhinay@recreateapp.com</a></li>
              <li>Website: <a href="/get-started">bodyfirst.app/get-started</a></li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
