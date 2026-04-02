'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  {
    num: '1',
    title: 'Answer a few questions',
    time: '5 min',
    description:
      'We ask about your medication interest, insurance, health conditions, and goals. Every question powers your personalized features.',
  },
  {
    num: '2',
    title: 'Get your personalized dashboard',
    description:
      "Your cost estimate, side effects report, ready score, and body visualizer — all tailored to you. Not generic. Not templated. Yours.",
  },
  {
    num: '3',
    title: 'Start your 1-task-per-day plan',
    description:
      'Small, specific, daily. Your Ready Score climbs. Your anxiety drops. When it hits 100%, you\u2019re ready to find a provider.',
  },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className={isVisible ? 'reveal-visible' : 'reveal-hidden'}>
          <h2 className="text-center text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Ready in 5 minutes. Literally.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`text-center ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-showcase-teal text-white font-black text-lg flex items-center justify-center mx-auto">
                {step.num}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{step.title}</h3>
              {step.time && (
                <span className="inline-block mt-1 text-xs font-bold text-showcase-teal bg-showcase-teal/10 px-2 py-0.5 rounded-full">
                  {step.time}
                </span>
              )}
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
