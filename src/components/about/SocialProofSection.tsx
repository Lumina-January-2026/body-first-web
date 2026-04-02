'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const testimonials = [
  {
    quote: "I spent 6 months Googling Ozempic prices. Body First showed me I'd pay $47/month with my insurance — in 2 minutes.",
    name: 'Sarah M.',
    context: 'Considering Ozempic',
  },
  {
    quote: 'The Side Effects Report calmed me down more than any Reddit thread ever did. I actually know what to expect now.',
    name: 'Jennifer K.',
    context: 'Started Mounjaro',
  },
  {
    quote: "The daily steps are so small I actually do them. I'm at 78% ready.",
    name: 'Amanda R.',
    context: 'Researching options',
  },
  {
    quote: "The Visualizer made it real. Seeing myself at 6 months... I booked my doctor's appointment that day.",
    name: 'Lisa T.',
    context: 'Started Wegovy',
  },
];

export default function SocialProofSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-showcase-bg py-16 md:py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className={isVisible ? 'reveal-visible' : 'reveal-hidden'}>
          <h2 className="text-center text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            People who stopped researching<br className="hidden md:block" /> and started preparing
          </h2>
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-4 lg:overflow-visible pb-4 lg:pb-0">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`snap-center min-w-[300px] lg:min-w-0 bg-white rounded-brand-card p-6 shadow-card flex flex-col ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-900 text-[15px] leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{t.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
