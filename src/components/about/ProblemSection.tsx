'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Card from '@/components/common/Card';

const painPoints = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    text: "You've compared prices on 12 different sites and still don't know what YOU'd pay",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    text: "You've read every Reddit thread about nausea and now you're more scared than before",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        <line x1="18" y1="8" x2="23" y2="13" stroke="#F97316" strokeWidth="1.5"/>
      </svg>
    ),
    text: "You want to ask your doctor but don't know what to say — or if they'll judge you",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    text: "You keep saying 'I'll start next month' but next month never comes",
  },
];

export default function ProblemSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-showcase-bg py-16 md:py-24 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className={isVisible ? 'reveal-visible' : 'reveal-hidden'}>
          <p className="text-center text-sm font-bold tracking-widest uppercase text-showcase-teal mb-3">
            Sound familiar?
          </p>
          <h2 className="text-center text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            You&apos;re not still &ldquo;researching.&rdquo; You&apos;re stuck.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className={isVisible ? 'reveal-visible' : 'reveal-hidden'}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <Card hover className="flex items-start gap-4 h-full">
                <div className="shrink-0 mt-0.5 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  {point.icon}
                </div>
                <p className="text-gray-900 font-semibold text-[15px] leading-relaxed">{point.text}</p>
              </Card>
            </div>
          ))}
        </div>

        <p
          className={`text-center text-gray-600 text-lg mt-12 max-w-[600px] mx-auto leading-relaxed ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
          style={{ transitionDelay: '500ms' }}
        >
          Body First exists because research without a plan is just procrastination.
        </p>
      </div>
    </section>
  );
}
