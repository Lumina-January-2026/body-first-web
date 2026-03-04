import Button from '@/components/common/Button';
import type { Category } from '@/types/resource';

interface InArticleCTAProps {
  category: Category;
}

const categoryConfig: Record<string, { accent: string; bg: string; headline: string; description: string }> = {
  'cost-savings': {
    accent: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    headline: 'Find More Savings',
    description: 'Explore our full library of cost-saving guides, savings cards, and financial planning tools for your GLP-1 journey.',
  },
  'side-effects': {
    accent: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    headline: 'Managing Side Effects?',
    description: 'Get practical tips and evidence-based strategies to handle common side effects with confidence.',
  },
  'getting-started': {
    accent: 'from-sky-500 to-blue-500',
    bg: 'bg-sky-50',
    headline: 'Ready to Take the Next Step?',
    description: 'Download the Body First app for personalized guidance, savings tools, and community support.',
  },
  'medication-deep-dive': {
    accent: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    headline: 'Dive Deeper',
    description: 'Explore detailed medication profiles, clinical research summaries, and expert analysis.',
  },
  'comparisons': {
    accent: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-50',
    headline: 'Compare Your Options',
    description: 'Side-by-side medication comparisons to help you and your provider make informed decisions.',
  },
  'lifestyle-nutrition': {
    accent: 'from-lime-500 to-green-500',
    bg: 'bg-lime-50',
    headline: 'Fuel Your Journey',
    description: 'Meal plans, nutrition tips, and lifestyle guidance designed for your GLP-1 medication journey.',
  },
  'real-stories': {
    accent: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    headline: 'You\'re Not Alone',
    description: 'Real experiences from people on the same journey. No judgment, just honest stories.',
  },
  'checklists-toolkits': {
    accent: 'from-cyan-500 to-teal-500',
    bg: 'bg-cyan-50',
    headline: 'Get Organized',
    description: 'Downloadable checklists, appointment prep guides, and planning tools to keep you on track.',
  },
  'news-updates': {
    accent: 'from-slate-500 to-gray-500',
    bg: 'bg-slate-50',
    headline: 'Stay Informed',
    description: 'The latest news, FDA updates, and developments in the GLP-1 medication space.',
  },
  'mental-emotional': {
    accent: 'from-fuchsia-500 to-pink-500',
    bg: 'bg-fuchsia-50',
    headline: 'Your Well-Being Matters',
    description: 'Emotional support, mindset tools, and strategies for the mental side of your journey.',
  },
  'science-how-it-works': {
    accent: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-50',
    headline: 'Understand the Science',
    description: 'Clear, accessible explanations of how GLP-1 medications work in your body.',
  },
};

const defaultConfig = {
  accent: 'from-teal-primary to-teal-dark',
  bg: 'bg-teal-50',
  headline: 'Continue Your Journey',
  description: 'Explore our full resource library for more expert guidance on your GLP-1 medication journey.',
};

export default function InArticleCTA({ category }: InArticleCTAProps) {
  const config = categoryConfig[category] || defaultConfig;

  return (
    <div className={`rounded-2xl ${config.bg} p-6 md:p-8 border border-white`}>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.accent} flex items-center justify-center mb-4`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{config.headline}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">{config.description}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button href="/resources" size="sm">
          Browse Resources
        </Button>
        <Button href="/get-started" variant="outline" size="sm">
          Get the App
        </Button>
      </div>
    </div>
  );
}
