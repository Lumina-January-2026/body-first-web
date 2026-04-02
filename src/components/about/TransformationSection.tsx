'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const without = [
  'Another month of Googling',
  "Comparing prices you can't trust",
  'Reading side effect horror stories',
  "Telling yourself you'll start Monday",
  'Monday never comes',
];

const withBF = [
  'Your actual cost in 2 minutes',
  'Your personalized side effects report',
  'A conversation script for your doctor',
  '3-minute daily tasks that add up',
  'A Ready Score that hits 100%',
];

export default function TransformationSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className={isVisible ? 'reveal-visible' : 'reveal-hidden'}>
          <h2 className="text-center text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            From research spiral to ready in&nbsp;weeks.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* WITHOUT */}
          <div
            className={`bg-gray-50 rounded-brand-card p-8 border border-gray-200 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6">Without Body First</p>
            <ul className="space-y-4">
              {without.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                  <span className="text-gray-600 text-[15px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WITH */}
          <div
            className={`bg-white rounded-brand-card p-8 border-2 border-showcase-teal shadow-card ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-sm font-bold tracking-widest uppercase text-showcase-teal mb-6">With Body First</p>
            <ul className="space-y-4">
              {withBF.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-showcase-teal flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-gray-900 text-[15px] leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className={`text-center text-gray-600 text-lg mt-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
          style={{ transitionDelay: '450ms' }}
        >
          Most users hit 100% Ready Score in <strong className="text-gray-900">4&ndash;6 weeks</strong>.
        </p>
      </div>
    </section>
  );
}
