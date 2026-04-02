'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// COPY VARIATIONS — change activeCopy to switch
const activeCopy: 'A' | 'B' = 'A';

const copy = {
  A: {
    heading: 'The GLP-1 planning app for the phase everyone skips.',
    paragraphs: [
      'Not a clinic. Not a pharmacy. Body First is a preparation tool that helps you walk into your first GLP-1 appointment informed, confident, and ready.',
      'Answer 18 questions. Get a personalized plan with your real cost, potential results, side effect prep, and readiness tracking \u2014 all before your first dose.',
    ],
  },
  B: {
    heading: 'We built the app that should have existed before you started.',
    paragraphs: [
      'Every GLP-1 clinic wants to get you on medication as fast as possible. Nobody helps you figure out if you\u2019re actually ready. Body First does.',
      'We\u2019re a planning app \u2014 not a clinic, not a pharmacy, not a subscription box. Just the tools you need to stop guessing and start preparing.',
      'Answer 18 questions. Get a personalized plan. Know your real cost, see your potential results, prep for side effects, and track your readiness \u2014 all before your first dose.',
    ],
  },
};

const cards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 105 2H19a.3.3 0 01.3.3v3.4a.3.3 0 01-.3.3H5a.3.3 0 01-.3-.3V2.3z" fill="none"/>
        <path d="M8 6v6m0 0-3 3h14l-3-3M8 12h8"/>
        <line x1="4" y1="18" x2="4" y2="18" strokeWidth="0"/>
        <path d="M18.36 5.64a1 1 0 01-1.41 1.41" strokeWidth="0"/>
      </svg>
    ),
    fallbackIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 3"/>
        <circle cx="12" cy="12" r="10"/>
        <line x1="4" y1="4" x2="20" y2="20" stroke="#EF4444" strokeWidth="2"/>
      </svg>
    ),
    title: 'Not a clinic',
    description: "We don\u2019t prescribe. We prepare.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3"/>
        <line x1="5" y1="3" x2="19" y2="21" stroke="#EF4444" strokeWidth="2"/>
      </svg>
    ),
    title: 'Not a pharmacy',
    description: "We find you the best price. We don\u2019t sell medication.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4"/>
        <path d="M7.86 2h8.28L20 5.86v8.28L16.14 18H7.86L4 14.14V5.86L7.86 2z"/>
      </svg>
    ),
    title: 'Not another blog',
    description: 'Personalized to YOUR insurance, YOUR weight, YOUR medications.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M9 16l2 2 4-4"/>
      </svg>
    ),
    title: '100% pre-medication',
    description: 'Everything here happens before your first dose.',
  },
];

export default function WhatIsSection() {
  const { ref, isVisible } = useScrollReveal();
  const activeCopyData = copy[activeCopy];

  return (
    <section ref={ref} className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-[900px] mx-auto">
        <div className={isVisible ? 'reveal-visible' : 'reveal-hidden'}>
          <p className="text-center text-sm font-bold tracking-widest uppercase text-showcase-teal mb-3">
            What is Body First?
          </p>
          <h2 className="text-center text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            {activeCopyData.heading}
          </h2>
        </div>

        <div
          className={`mt-10 space-y-5 text-gray-600 text-base md:text-lg leading-relaxed text-center max-w-[720px] mx-auto ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
          style={{ transitionDelay: '150ms' }}
        >
          {activeCopyData.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Icon cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-gray-50 rounded-brand-card p-6 text-center ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
              style={{ transitionDelay: `${(i + 2) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-showcase-teal/10 text-showcase-teal flex items-center justify-center mx-auto mb-3">
                {card.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{card.title}</h3>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
