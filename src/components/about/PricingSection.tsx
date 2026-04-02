'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const APP_STORE_URL = 'https://apps.apple.com/us/app/body-first/id6757570268';

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-showcase-bg py-16 md:py-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className={isVisible ? 'reveal-visible' : 'reveal-hidden'}>
          <h2 className="text-center text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Less than one month of the medication you&apos;re researching.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
          {/* Annual — Featured */}
          <div
            className={`bg-white rounded-brand-card p-8 border-2 border-showcase-teal shadow-card relative ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <span className="absolute -top-3 left-6 bg-coral text-white text-xs font-bold px-3 py-1 rounded-full">
              Best Value
            </span>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Annual</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-900">$29.99</span>
              <span className="text-gray-400 text-sm">/year</span>
            </div>
            <p className="text-showcase-teal font-semibold text-sm mt-1">$2.50/month &middot; Save 75%</p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 bg-showcase-teal hover:bg-showcase-teal-dark text-white text-center font-bold py-3 rounded-brand-pill transition-colors"
            >
              Start 7-Day Free Trial
            </a>
          </div>

          {/* Monthly */}
          <div
            className={`bg-white rounded-brand-card p-8 border border-gray-200 shadow-card ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Monthly</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-900">$9.99</span>
              <span className="text-gray-400 text-sm">/month</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Cancel anytime</p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 bg-gray-900 hover:bg-gray-800 text-white text-center font-bold py-3 rounded-brand-pill transition-colors"
            >
              Start 7-Day Free Trial
            </a>
          </div>
        </div>

        <p
          className={`text-center text-gray-500 text-sm mt-8 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
          style={{ transitionDelay: '400ms' }}
        >
          Community is always free. 7-day free trial on all plans. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
