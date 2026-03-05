import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Boolean Bliss LLC terms of service for the Body First app and website — rules and guidelines for using our services.',
};

export default function TermsPage() {
  return (
    <article className="py-10 md:py-14 px-6">
      {/* Breadcrumbs */}
      <nav className="max-w-3xl mx-auto flex items-center gap-2 text-sm text-brand-muted mb-8">
        <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-brand-gray">Terms of Service</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-brand-card shadow-card p-6 md:p-10">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-brand-gray prose-p:leading-relaxed prose-a:text-brand-blue prose-li:text-brand-gray">
            <p><em>Effective Date: March 4, 2026</em></p>

            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Body First mobile
              application (the &quot;App&quot;) and the Body First website at bodyfirst.app (the &quot;Website,&quot;
              collectively the &quot;Services&quot;), operated by Boolean Bliss LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
              a Delaware limited liability company.
            </p>

            <p>
              <strong>By accessing or using our Services, you agree to be bound by these Terms and
              our <a href="/privacy">Privacy Policy</a>. If you do not agree, do not use our Services.</strong>
            </p>

            {/* Section 1 */}
            <h2>1. Eligibility</h2>
            <p>
              Our Services are intended for adults aged 18 and older. By using the Services, you represent and
              warrant that you are at least 18 years of age. If you are under 18, you may not use the Services.
            </p>

            {/* Section 2 */}
            <h2>2. Description of Services</h2>
            <p>
              Body First is a GLP-1 medication planning companion that provides educational content, medication
              comparisons, cost-saving tools, and community support resources to help users navigate their wellness journey.
            </p>
            <p><strong>Body First does NOT:</strong></p>
            <ul>
              <li>Prescribe, dispense, or sell any medication</li>
              <li>Provide medical advice, diagnosis, or treatment</li>
              <li>Create a doctor-patient or healthcare provider relationship</li>
              <li>Replace consultation with a licensed healthcare professional</li>
              <li>Function as a medical device</li>
            </ul>

            {/* Section 3 */}
            <h2>3. No Medical Advice</h2>
            <p>
              <strong>All content provided through the Services is for educational and informational purposes only.</strong> Nothing
              in the App or on the Website should be construed as medical advice, a medical recommendation, or a substitute
              for professional medical judgment.
            </p>
            <p>
              GLP-1 receptor agonist medications are prescription drugs that require evaluation and monitoring by a licensed
              healthcare provider. Always seek the advice of your physician or other qualified healthcare provider before
              starting, stopping, or changing any medication or treatment. Never disregard professional medical advice or
              delay seeking it because of information you accessed through our Services.
            </p>
            <p>
              <strong>If you are experiencing a medical emergency, call 911 or your local emergency number immediately.</strong>
            </p>
            <p>
              You acknowledge that any reliance on information provided through the Services is solely at your own risk.
              Boolean Bliss LLC shall not be liable for any health decisions made based on content in the App or Website.
            </p>

            {/* Section 4 */}
            <h2>4. License Grant</h2>
            <p>
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable,
              non-sublicensable, revocable license to access and use the Services on compatible Apple iOS and Google
              Android devices that you own or control, solely for your personal, non-commercial use.
            </p>
            <p>This license does not allow you to:</p>
            <ul>
              <li>Copy, modify, or create derivative works based on the Services</li>
              <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code of the App</li>
              <li>Remove, alter, or obscure any copyright, trademark, or other proprietary notices</li>
              <li>Use the Services for any commercial purpose without our written consent</li>
              <li>Transfer, sublicense, or assign your rights under these Terms to any third party</li>
            </ul>

            {/* Section 5 */}
            <h2>5. Account Registration and Security</h2>
            <p>
              To access certain features, you may be required to create an account. You agree to provide accurate,
              current, and complete information during registration and to keep your account information updated.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activities that occur under your account. You must notify us immediately at <a href="mailto:abhinay@recreateapp.com">abhinay@recreateapp.com</a> if
              you suspect any unauthorized use of your account.
            </p>

            {/* Section 6 */}
            <h2>6. Subscriptions and Billing</h2>

            <h3>Subscription Plans</h3>
            <p>
              Body First may offer subscription plans that provide access to premium features and content.
              Subscription details, including pricing and billing periods, are displayed within the App at the
              time of purchase.
            </p>

            <h3>Auto-Renewal</h3>
            <p>
              <strong>Subscriptions automatically renew unless you cancel at least 24 hours before the end of the
              current billing period.</strong> Your account will be charged for renewal within 24 hours prior to the
              end of the current period at the same price unless you have changed or canceled your subscription.
            </p>

            <h3>Free Trials</h3>
            <p>
              If we offer a free trial, the specific duration will be displayed at sign-up. Any unused portion of a
              free trial period will be forfeited when you purchase a subscription. At the end of the free trial,
              your subscription will automatically convert to a paid subscription at the stated price unless you
              cancel before the trial ends.
            </p>

            <h3>Managing and Canceling Subscriptions</h3>
            <ul>
              <li><strong>Apple (iOS):</strong> You can manage and cancel subscriptions in your Apple ID account settings (Settings &gt; Apple ID &gt; Subscriptions).</li>
              <li><strong>Google (Android):</strong> You can manage and cancel subscriptions in your Google Play account settings (Google Play &gt; Payments &amp; subscriptions &gt; Subscriptions).</li>
            </ul>
            <p>
              Cancellation takes effect at the end of the current billing period. You will continue to have access
              to premium features until the end of your paid period.
            </p>

            <h3>Refunds</h3>
            <p>
              Refund requests are handled by the platform through which you purchased your subscription.
              For Apple purchases, refer to <a href="https://support.apple.com/en-us/HT204084" target="_blank" rel="noopener noreferrer">Apple&apos;s refund policy</a>.
              For Google Play purchases, refer to <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener noreferrer">Google Play&apos;s refund policy</a>.
            </p>

            {/* Section 7 */}
            <h2>7. Account Deletion</h2>
            <p>
              You may delete your account at any time through the App settings. Account deletion is permanent
              and cannot be reversed.
            </p>
            <p>
              Upon account deletion, all associated personal data — including onboarding preferences, usage
              history, and contact information — will be permanently removed from our systems within 30 days,
              except where retention is required by law (e.g., transaction records for tax compliance).
            </p>
            <p>
              You may also request account deletion by contacting <a href="mailto:abhinay@recreateapp.com">abhinay@recreateapp.com</a>.
              If you have an active subscription, canceling your account does not automatically cancel your subscription.
              Please cancel your subscription through Apple or Google Play before deleting your account to avoid
              continued billing.
            </p>

            {/* Section 8 */}
            <h2>8. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Services for any unlawful purpose or in violation of any applicable laws</li>
              <li>Share your account credentials with any third party</li>
              <li>Attempt to gain unauthorized access to any part of the Services, other accounts, or computer systems</li>
              <li>Use automated means (bots, scrapers, crawlers) to access or collect data from the Services</li>
              <li>Interfere with or disrupt the integrity or performance of the Services</li>
              <li>Upload or transmit viruses, malware, or any other malicious code</li>
              <li>Reproduce, distribute, or publicly display any content from the Services without our written permission</li>
            </ul>

            {/* Section 9 */}
            <h2>9. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Services — including text, graphics, logos, icons,
              images, software, and the arrangement thereof — are owned by Boolean Bliss LLC and are protected by
              United States and international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              &quot;Body First&quot; and the Body First logo are trademarks of Boolean Bliss LLC. You may not use our
              trademarks without our prior written consent.
            </p>

            {/* Section 10 */}
            <h2>10. Third-Party Services</h2>
            <p>
              The Services rely on third-party infrastructure and service providers, including but not limited to
              Supabase (database and backend), RevenueCat (subscription management), and the Apple App Store and
              Google Play Store (distribution and payment processing).
            </p>
            <p>
              We are not responsible for the availability, reliability, or performance of third-party services.
              Your use of third-party services is subject to their respective terms of service and privacy policies.
            </p>
            <p>
              Our Services may contain links to third-party websites or resources. We are not responsible for the
              content, accuracy, or practices of any third-party websites and do not endorse them.
            </p>

            {/* Section 11 */}
            <h2>11. Disclaimers</h2>
            <p>
              <strong>THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</strong>
            </p>
            <p>We do not warrant that:</p>
            <ul>
              <li>The Services will be uninterrupted, secure, or error-free</li>
              <li>The content will be accurate, complete, current, or free of errors</li>
              <li>Medication information, pricing, or availability will be current — always verify with your healthcare provider or pharmacist</li>
              <li>Any defects in the Services will be corrected</li>
            </ul>

            {/* Section 12 */}
            <h2>12. Limitation of Liability</h2>
            <p>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BOOLEAN BLISS LLC AND ITS OFFICERS, DIRECTORS,
              EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF
              OR IN CONNECTION WITH YOUR USE OF THE SERVICES.</strong>
            </p>
            <p>
              In no event shall our total liability to you for all claims arising out of or related to the Services
              exceed the greater of (a) the amount you paid to us in the twelve (12) months preceding the claim, or
              (b) fifty dollars ($50.00).
            </p>
            <p>
              <strong>Without limiting the foregoing, we shall not be liable for any health decisions, medical outcomes,
              or health-related consequences resulting from your use of or reliance on content provided through the Services.</strong>
            </p>

            {/* Section 13 */}
            <h2>13. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Boolean Bliss LLC and its officers, directors,
              employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs,
              and expenses (including reasonable attorneys&apos; fees) arising out of or related to: (a) your use of
              the Services, (b) your violation of these Terms, (c) your violation of any rights of a third party,
              or (d) any medical or health decisions you make based on content from the Services.
            </p>

            {/* Section 14 */}
            <h2>14. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware,
              United States, without regard to its conflict of law provisions.
            </p>
            <p>
              Any dispute arising out of or relating to these Terms or the Services shall first be attempted to be
              resolved through good-faith informal negotiation. If the dispute cannot be resolved informally within
              30 days, either party may initiate binding arbitration administered by the American Arbitration Association
              (AAA) under its Consumer Arbitration Rules.
            </p>
            <p>
              <strong>You agree that any arbitration or legal proceeding shall be conducted on an individual basis and
              not as a class action, class arbitration, or representative action.</strong>
            </p>
            <p>
              For claims that are not subject to arbitration (as determined by applicable law), the exclusive
              jurisdiction and venue shall be the state and federal courts located in the State of Delaware.
            </p>

            {/* Section 15 */}
            <h2>15. Termination</h2>
            <p>
              We may suspend or terminate your access to the Services at any time, with or without cause, and with
              or without notice. Grounds for termination include, but are not limited to, violation of these Terms,
              abusive behavior, or fraudulent activity.
            </p>
            <p>
              Upon termination: (a) your license to use the Services will immediately cease, (b) you must stop all
              use of the Services, and (c) provisions that by their nature should survive termination (including
              Sections 3, 9, 11, 12, 13, and 14) shall continue to apply.
            </p>
            <p>
              If you have an active subscription at the time of termination for cause (your violation of these Terms),
              you will not be entitled to a refund for the remaining subscription period.
            </p>

            {/* Section 16 */}
            <h2>16. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid by a court of competent
              jurisdiction, that provision will be enforced to the maximum extent permissible, and the remaining
              provisions will continue in full force and effect.
            </p>

            {/* Section 17 */}
            <h2>17. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. When we make material changes, we will post the updated
              Terms on this page with a new effective date and, where appropriate, notify you through an in-app
              notification or email.
            </p>
            <p>
              Your continued use of the Services after any changes indicates your acceptance of the updated Terms.
              If you do not agree to the changes, you must stop using the Services and may delete your account.
            </p>

            {/* Section 18 */}
            <h2>18. Contact Us</h2>
            <p>If you have questions or concerns about these Terms, please contact us:</p>
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
