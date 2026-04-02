import type { Metadata } from 'next';
import HeroSection from '@/components/about/HeroSection';
import WhatIsSection from '@/components/about/WhatIsSection';
import ProblemSection from '@/components/about/ProblemSection';
import FeaturesSection from '@/components/about/FeaturesSection';
import TransformationSection from '@/components/about/TransformationSection';
import SocialProofSection from '@/components/about/SocialProofSection';
import HowItWorksSection from '@/components/about/HowItWorksSection';
import PricingSection from '@/components/about/PricingSection';
import FinalCTASection from '@/components/about/FinalCTASection';

export const metadata: Metadata = {
  title: 'Body First — The GLP-1 Planning App for the Phase Everyone Skips',
  description:
    'Turn months of GLP-1 research into a personalized action plan. See your cost, understand side effects, and track your readiness — before your first dose.',
  openGraph: {
    title: 'Body First — The GLP-1 Planning App',
    description:
      'Turn months of GLP-1 research into a personalized action plan before your first dose.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <WhatIsSection />
      <ProblemSection />
      <FeaturesSection />
      <TransformationSection />
      <SocialProofSection />
      <HowItWorksSection />
      <PricingSection />
      <FinalCTASection />
    </>
  );
}
