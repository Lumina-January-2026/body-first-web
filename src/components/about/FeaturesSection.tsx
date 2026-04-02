'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import PhoneMockup from './PhoneMockup';

// COPY VARIATIONS — change activeCopy to switch
const activeCopy: 'A' | 'B' = 'A';

interface FeatureCopy {
  badge?: string;
  headline: string;
  description: string;
}

const copyA: Record<string, FeatureCopy> = {
  cost: {
    badge: 'AI-powered, real-time pricing',
    headline: "Find out what YOU'd actually pay.",
    description:
      "Not the list price. Not the 'up to' price. YOUR price — based on your insurance, your state, and every savings card and manufacturer discount that exists right now. Some users find options under $25/month.",
  },
  sideEffects: {
    badge: 'Personalized for you',
    headline: 'Stop reading horror stories. Read YOUR report.',
    description:
      "Based on your age, weight, health conditions, and current medications — not some stranger's Reddit post. We show you what's likely, what's rare, and what to do about each one. 94% of people like you complete the adjustment period.",
  },
  readyScore: {
    headline: 'Know exactly when you\u2019re ready.',
    description:
      'Your Ready Score tracks how prepared you actually are — from 0 to 100%. It starts building the moment you open the app and grows every day as you complete micro-tasks personalized to your situation. No ambiguity. A clear number.',
  },
  dailySteps: {
    headline: 'One tiny task per day. Under 5 minutes.',
    description: 'Small moves that add up to full readiness — without overwhelming you.',
  },
  visualizer: {
    badge: 'Most popular feature',
    headline: 'See what you could look like.',
    description:
      'Upload a photo. Our AI shows you a realistic preview of your body at 3, 6, 9, and 12 months on GLP-1 medication — based on clinical weight loss data for your specific medication.',
  },
  community: {
    badge: 'Always free',
    headline: "You're not the only one overthinking this.",
    description:
      "Connect with hundreds of people in the exact same spot — researching, weighing options, and trying to decide. No names. No judgment. Just honest conversations from people who actually get it.",
  },
};

const copyB: Record<string, FeatureCopy> = {
  cost: {
    headline: 'Your insurance. Your state. Your actual price.',
    description:
      'We check manufacturer coupons, savings cards, prior authorization options, and pharmacy pricing for your exact situation. Not a generic price range — your price.',
  },
  sideEffects: {
    headline: 'What will actually happen to your body.',
    description:
      "We generate a personalized side effects report based on your health profile. You'll know what's common, what's rare, and exactly how to manage each one — before you feel a thing.",
  },
  readyScore: {
    headline: 'A number that tells you the truth.',
    description:
      "Your Ready Score goes from 0 to 100. It tracks whether you've done the research, made the calls, and checked the boxes. When it's high enough, you'll know you're ready. No second-guessing.",
  },
  dailySteps: {
    headline: "Five minutes a day. That's it.",
    description:
      'Each day we give you one small task — save a coupon link, research a supplement, draft a question for your doctor. Tiny moves that compound into full confidence.',
  },
  visualizer: {
    headline: 'Upload a photo. See your future.',
    description:
      "Our AI generates realistic transformation previews at 3, 6, 9, and 12 months based on clinical data for your medication. Not a filter. Not a gimmick. A science-backed projection.",
  },
  community: {
    headline: 'Talk to people who are exactly where you are.',
    description:
      "Anonymous. No profiles. No followers. Just real people researching GLP-1 medications, sharing what they've learned, asking the questions nobody else will answer.",
  },
};

const copyMap = { A: copyA, B: copyB };

// --- Ready Score visual (no screenshot — progress ring card) ---

function ReadyScoreVisual() {
  const percentage = 72;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full max-w-[300px] mx-auto bg-white rounded-brand-card shadow-card p-8 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Your Ready Score</p>
      <div className="relative w-36 h-36 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#F3F4F6" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#0D9488"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-black text-gray-900">{percentage}%</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">Almost ready for your appointment</p>
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
        <span>12 tasks done</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>5 remaining</span>
      </div>
    </div>
  );
}

// --- Daily Steps task list (no phone mockup) ---

const dailyTasks = [
  { text: 'Save a manufacturer savings card link', done: true },
  { text: 'Research ginger supplements for nausea', done: true },
  { text: 'Write down your top 3 questions for your doctor', done: false },
];

function DailyStepsVisual() {
  return (
    <div className="w-full max-w-[300px] mx-auto bg-white rounded-brand-card shadow-card p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Today&apos;s tasks</p>
      <ul className="space-y-4">
        {dailyTasks.map((task, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className={`shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center ${
                task.done ? 'bg-showcase-teal border-showcase-teal' : 'border-gray-300 bg-white'
              }`}
            >
              {task.done && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className={`text-sm leading-relaxed ${task.done ? 'text-gray-400 line-through' : 'text-gray-900 font-medium'}`}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-showcase-teal" />
        <span className="text-xs text-gray-500">3 min estimated</span>
      </div>
    </div>
  );
}

// --- Community visual (no unique screenshot — card-based) ---

function CommunityVisual() {
  const posts = [
    { text: 'Just got my insurance to cover Wegovy. Happy to share how if anyone needs help.', time: '2h ago', replies: 12 },
    { text: 'Day 3 of researching side effects. This app calmed me down more than Reddit ever did.', time: '5h ago', replies: 8 },
    { text: 'Hit 85% ready score today. Booking my appointment this week!', time: '1d ago', replies: 23 },
  ];

  return (
    <div className="w-full max-w-[300px] mx-auto space-y-3">
      {posts.map((post, i) => (
        <div key={i} className="bg-white rounded-brand-lg shadow-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <span className="text-xs text-gray-400">Anonymous &middot; {post.time}</span>
          </div>
          <p className="text-sm text-gray-900 leading-relaxed">{post.text}</p>
          <p className="text-xs text-gray-400 mt-2">{post.replies} replies</p>
        </div>
      ))}
    </div>
  );
}

// --- Feature block ---

function FeatureBlock({
  featureKey,
  index,
  visual,
}: {
  featureKey: string;
  index: number;
  visual: React.ReactNode;
}) {
  const { ref, isVisible } = useScrollReveal();
  const isEven = index % 2 === 0;
  const feature = copyMap[activeCopy][featureKey];

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 py-12 md:py-20 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
    >
      {/* Visual */}
      <div className="flex-1 flex justify-center">{visual}</div>

      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        {feature.badge && (
          <span className="inline-block bg-orange-50 text-coral text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            {feature.badge}
          </span>
        )}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
          {feature.headline}
        </h3>
        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed max-w-[480px] mx-auto md:mx-0">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

// --- Main section ---

export default function FeaturesSection() {
  return (
    <section className="bg-white px-6">
      <div className="max-w-[1200px] mx-auto divide-y divide-gray-100">
        {/* 1. Cost — cost-calculator.png */}
        <FeatureBlock
          featureKey="cost"
          index={0}
          visual={
            <PhoneMockup
              src="/screenshots/cost-calculator.png"
              alt="Cost Calculator showing personalized medication pricing with insurance and savings cards"
            />
          }
        />

        {/* 2. Side Effects — side-effects.png */}
        <FeatureBlock
          featureKey="sideEffects"
          index={1}
          visual={
            <PhoneMockup
              src="/screenshots/side-effects.png"
              alt="Side Effects Report showing personalized likelihood badges and management tips"
            />
          }
        />

        {/* 3. Ready Score — progress ring visual (no duplicate screenshot) */}
        <FeatureBlock
          featureKey="readyScore"
          index={2}
          visual={<ReadyScoreVisual />}
        />

        {/* 4. Daily Steps — task list visual (no screenshot) */}
        <FeatureBlock
          featureKey="dailySteps"
          index={3}
          visual={<DailyStepsVisual />}
        />

        {/* 5. Visualizer — visualizer.png */}
        <FeatureBlock
          featureKey="visualizer"
          index={4}
          visual={
            <PhoneMockup
              src="/screenshots/visualizer.png"
              alt="Weight Loss Visualizer showing before and after transformation preview with timeline slider"
            />
          }
        />

        {/* 6. Community — card visual (no duplicate screenshot) */}
        <FeatureBlock
          featureKey="community"
          index={5}
          visual={<CommunityVisual />}
        />
      </div>
    </section>
  );
}
