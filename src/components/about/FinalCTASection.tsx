'use client';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const APP_STORE_URL = 'https://apps.apple.com/us/app/body-first/id6757570268';

export default function FinalCTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-gradient-to-b from-white to-showcase-bg py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <div className={`flex flex-col md:flex-row items-center gap-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          {/* Splash image left */}
          <div className="hidden md:block flex-1">
            <div className="relative w-[220px] mx-auto rounded-3xl overflow-hidden shadow-elevated">
              <Image
                src="/screenshots/splash-options.png"
                alt="Make sense of your options"
                width={440}
                height={880}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Center CTA */}
          <div className="flex-1 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Ready to stop researching{' '}
              <span className="text-showcase-teal">and start preparing?</span>
            </h2>
            <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-[500px] mx-auto">
              18 questions. A personalized plan. Everything you need before your first dose.
            </p>
            <div className="mt-8 flex justify-center">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Image
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                  alt="Download on the App Store"
                  width={220}
                  height={73}
                  className="h-[60px] w-auto"
                />
              </a>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Free to try. No credit card needed. No prescription required.
            </p>
          </div>

          {/* Splash image right */}
          <div className="hidden md:block flex-1">
            <div className="relative w-[220px] mx-auto rounded-3xl overflow-hidden shadow-elevated">
              <Image
                src="/screenshots/splash-alone.png"
                alt="Don't figure this out alone"
                width={440}
                height={880}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
