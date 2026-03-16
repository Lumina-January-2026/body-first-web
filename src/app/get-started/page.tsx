import type { Metadata } from 'next';
import ContactForm from '@/components/cta/ContactForm';
import Button from '@/components/common/Button';

export const metadata: Metadata = {
  title: 'Get Started with Body First',
  description:
    'Download the Body First app or get in touch with our team. We\'re here to support your GLP-1 journey.',
};

const trustStats = [
  { stat: '10,000+', label: 'Active Users' },
  { stat: '4.8', label: 'Star Rating' },
  { stat: '50+', label: 'Expert Resources' },
  { stat: 'Free', label: 'To Start Today' },
];

const appFeatures = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Cost Calculator',
    description: 'Estimate your monthly expenses and find savings instantly.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: 'Side Effect Tracker',
    description: 'Log symptoms daily and get personalized management tips.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8zM7 8V6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2h-2"/>
      </svg>
    ),
    title: 'Supportive Community',
    description: 'Connect with others on the same path for motivation and advice.',
  },
];

const faqs = [
  {
    question: 'Is Body First free?',
    answer: 'Yes! The core features including resources, community access, and our cost calculator are completely free. We believe vital health information should be accessible to everyone.',
  },
  {
    question: 'Do you prescribe medication?',
    answer: 'No. Body First is an educational resource hub. We do not prescribe, dispense, or sell medication. Always consult your healthcare provider for medical decisions.',
  },
  {
    question: 'How often is content updated?',
    answer: 'Our team reviews and publishes new resources weekly. All content is fact-checked and reviewed by healthcare professionals to ensure accuracy.',
  },
  {
    question: 'Is my information private?',
    answer: 'Absolutely. We take privacy seriously. We do not sell your personal data. Your health information stays between you and your healthcare provider.',
  },
];

export default function GetStartedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-peach-start/30 to-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:flex-row md:items-center">
          <div className="flex flex-1 flex-col gap-6 md:pr-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-teal-dark">
              #1 Trusted Resource
            </span>
            <h1 className="text-gray-900 text-4xl font-black leading-[1.1] tracking-tight md:text-6xl">
              Start Your <span className="text-teal-primary">Journey</span> Today
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed md:text-xl max-w-xl">
              Your comprehensive resource for GLP-1 medication success. Track your progress,
              find support, and access expert advice all in one place.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="#contact" size="lg">
                Get Started Now
              </Button>
              <Button href="/resources" variant="outline" size="lg">
                Browse Resources
              </Button>
            </div>
          </div>
          {/* Phone Mockup */}
          <div className="flex flex-1 justify-center md:justify-end">
            <div className="relative w-full max-w-[320px]">
              <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-peach-start blur-3xl opacity-60" />
              <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-teal-primary/20 blur-3xl opacity-60" />
              <div className="relative z-10 mx-auto aspect-[9/19] w-full max-w-[280px] rounded-[3rem] border-[8px] border-nav-dark bg-nav-dark shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-nav-dark z-20" />
                <div className="h-full w-full bg-white overflow-hidden flex flex-col">
                  <div className="bg-teal-primary p-6 pt-12 text-white">
                    <h3 className="font-bold text-lg">Good Morning</h3>
                    <p className="text-sm opacity-90">Day 12 of your journey</p>
                  </div>
                  <div className="p-4 flex flex-col gap-3 bg-gray-50 flex-1">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <span className="text-xs font-bold text-gray-400 uppercase">Weight Tracker</span>
                      <div className="h-16 w-full bg-gradient-to-r from-teal-primary/10 to-teal-primary/5 rounded-lg flex items-end p-2 gap-1 mt-2">
                        <div className="w-1/5 h-[60%] bg-teal-primary/40 rounded-t" />
                        <div className="w-1/5 h-[55%] bg-teal-primary/40 rounded-t" />
                        <div className="w-1/5 h-[50%] bg-teal-primary/60 rounded-t" />
                        <div className="w-1/5 h-[45%] bg-teal-primary/80 rounded-t" />
                        <div className="w-1/5 h-[40%] bg-teal-primary rounded-t" />
                      </div>
                    </div>
                    <div className="bg-nav-dark rounded-xl p-3 text-white mt-auto">
                      <p className="text-sm font-medium">Daily Tip</p>
                      <p className="text-xs opacity-70 mt-1">Stay hydrated to manage side effects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="w-full border-y border-gray-100 bg-white py-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-8 px-6">
          {trustStats.map((item) => (
            <div key={item.label} className="flex flex-1 min-w-[200px] flex-col items-center gap-1 text-center">
              <p className="text-3xl font-bold tracking-tight text-gray-900">{item.stat}</p>
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App Promo Section */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-16 md:flex-row">
          <div className="flex flex-1 flex-col gap-8 md:pr-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-gray-900 text-3xl font-bold leading-tight md:text-4xl">Take Body First With You</h2>
              <p className="text-gray-600 text-lg">Manage your treatment journey anywhere, anytime. Our mobile app puts the tools you need right in your pocket.</p>
            </div>
            <ul className="flex flex-col gap-6">
              {appFeatures.map((feature) => (
                <li key={feature.title} className="flex items-start gap-4">
                  <div className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-teal-primary/10 text-teal-dark">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-500">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="#contact" size="lg" className="!bg-nav-dark !text-white hover:!bg-gray-800">
                App Store &mdash; Coming Soon
              </Button>
              <Button href="#contact" size="lg" className="!bg-nav-dark !text-white hover:!bg-gray-800">
                Google Play &mdash; Coming Soon
              </Button>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md aspect-[3/4] bg-gradient-to-br from-peach-start to-peach-end rounded-3xl shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-primary to-teal-dark flex items-center justify-center shadow-lg">
                  <svg width="40" height="40" fill="white" viewBox="0 0 48 48">
                    <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
                  </svg>
                </div>
                <p className="text-xl font-bold text-gray-900">Body First App</p>
                <p className="text-gray-500 mt-1">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="relative bg-peach-start/30 py-20 px-6">
        <div className="mx-auto max-w-[800px]">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="border-b border-gray-100 bg-white p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
              <p className="mt-2 text-gray-500">Have questions? We&apos;re here to help.</p>
            </div>
            <div className="p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-peach-start/30 pb-20 px-6">
        <div className="mx-auto max-w-[800px]">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl bg-white shadow-sm ring-1 ring-gray-200 open:ring-teal-primary/50">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-open:rotate-180">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
