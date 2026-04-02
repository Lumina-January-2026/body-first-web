'use client';
import Image from 'next/image';
import PhoneMockup from './PhoneMockup';

const APP_STORE_URL = 'https://apps.apple.com/us/app/body-first/id6757570268';

// HOOK VARIATIONS — change activeHook to switch
const activeHook: 'A' | 'B' | 'C' = 'A';

const hooks = {
  A: {
    headline: "You've Googled it 100 times.",
    headlineAccent: "You still haven't started.",
    subheadline:
      'Body First is the GLP-1 planning app that turns months of research into a plan you can actually follow — before your first dose.',
  },
  B: {
    headline: "You're about to spend $1,000/month",
    headlineAccent: "on something you haven't planned for.",
    subheadline:
      "Body First helps you find the real cost, understand the side effects, and walk into your doctor's office actually prepared. It's the GLP-1 planning app for the research phase.",
  },
  C: {
    headline: 'Reddit threads. Insurance calls. Conflicting advice.',
    headlineAccent: 'You deserve a better way to plan this.',
    subheadline:
      'Body First is the only app built for the phase BEFORE you start GLP-1 medication. We handle the research so you can handle the decision.',
  },
};

export default function HeroSection() {
  const hook = hooks[activeHook];

  return (
    <section className="bg-gradient-to-b from-showcase-bg to-white pt-12 pb-16 md:pt-20 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-gray-900 leading-[1.1] tracking-tight">
            {hook.headline}{' '}
            <span className="text-showcase-teal">{hook.headlineAccent}</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-[540px] mx-auto md:mx-0">
            {hook.subheadline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Image
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                alt="Download on the App Store"
                width={200}
                height={67}
                className="h-[54px] w-auto"
                priority
              />
            </a>
            <span className="text-sm text-gray-400">Free to try &middot; No credit card needed</span>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="flex-1 flex justify-center relative">
          <div className="absolute -inset-8 bg-gradient-to-br from-showcase-teal/10 via-transparent to-orange-100/30 rounded-full blur-3xl" />
          <PhoneMockup
            src="/screenshots/dashboard.png"
            alt="Body First app dashboard showing Ready Score, Daily Steps, and Community features"
            priority
          />
        </div>
      </div>
    </section>
  );
}
