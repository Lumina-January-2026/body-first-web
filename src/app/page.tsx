import Link from 'next/link';
import { getAllResources } from '@/lib/content';
import ResourceGrid from '@/components/resources/ResourceGrid';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import StructuredData from '@/components/seo/StructuredData';

const trustStats = [
  { label: 'Resources', stat: '50+ Expert' },
  { label: 'Frequency', stat: 'Weekly Updates' },
  { label: 'Cost', stat: '100% Free' },
  { label: 'Disclaimer', stat: 'No Med Advice' },
];

const valueProps = [
  {
    icon: 'savings',
    title: 'Cost-Saving Tools',
    description: 'Use our calculators to estimate your monthly spend and find hidden savings opportunities.',
  },
  {
    icon: 'medical_services',
    title: 'Side Effect Support',
    description: 'Access a library of doctor-reviewed tips to manage your body\'s reaction to treatment.',
  },
  {
    icon: 'forum',
    title: 'Community Stories',
    description: 'Read real stories from people on the same journey. You are not alone in this process.',
  },
];

export default function Home() {
  const allResources = getAllResources();
  const featured = allResources
    .filter((r) => r.frontmatter.featured)
    .slice(0, 3)
    .map((r) => r.frontmatter);
  const displayResources = featured.length > 0 ? featured : allResources.slice(0, 3).map((r) => r.frontmatter);

  return (
    <>
      <StructuredData type="WebSite" name="Body First" url="https://bodyfirst.app" />

      {/* Hero Section */}
      <section className="bg-brand-bg py-16 md:py-24 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <h1 className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Your GLP-1 Journey Starts Here
            </h1>
            <p className="text-brand-gray text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Navigate your wellness path with confidence using our comprehensive guides,
              expert-reviewed comparisons, and supportive community tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button href="/resources" size="lg">
                Explore Resources
              </Button>
              <Button href="/get-started" variant="outline" size="lg">
                Get Started Free
              </Button>
            </div>
          </div>
          {/* Hero Visual */}
          <div className="w-full relative group hidden lg:block">
            <Card className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-brand-card bg-brand-blue flex items-center justify-center">
                  <svg width="40" height="40" fill="white" viewBox="0 0 48 48">
                    <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900">Body First</p>
                <p className="text-brand-muted mt-1">Your GLP-1 Companion</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-brand-divider py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-brand-divider">
            {trustStats.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-1">
                <p className="text-brand-muted text-sm font-medium uppercase tracking-wider">{item.label}</p>
                <p className="text-gray-900 text-2xl md:text-3xl font-black">{item.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="bg-brand-bg py-20 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-brand-divider pb-6">
            <div>
              <h2 className="text-gray-900 text-3xl font-bold leading-tight tracking-tight">Popular Resources</h2>
              <p className="text-brand-gray mt-2">Essential reading for your journey.</p>
            </div>
            <Link
              href="/resources"
              className="text-brand-blue font-bold hover:underline flex items-center gap-1"
            >
              View all articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <ResourceGrid resources={displayResources} />
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((item) => (
              <Card key={item.title} hover className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center text-brand-blue">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    {item.icon === 'savings' && <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>}
                    {item.icon === 'medical_services' && <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>}
                    {item.icon === 'forum' && <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8zM7 8V6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2h-2"/>}
                  </svg>
                </div>
                <h3 className="text-gray-900 text-xl font-bold">{item.title}</h3>
                <p className="text-brand-gray leading-relaxed max-w-xs">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner — brand blue */}
      <section className="bg-brand-blue py-20 px-6 rounded-t-brand-card overflow-hidden relative">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute bottom-4 left-8 w-24 h-24 rounded-full bg-white/[0.04]" />
          <div className="absolute top-1/2 right-1/4 w-32 h-6 rounded-full bg-white/[0.03] rotate-12" />
        </div>
        <div className="relative max-w-[960px] mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
            Ready to take the first step towards a healthier you?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl">
            Join thousands of others who are navigating their GLP-1 journey with clarity and confidence.
          </p>
          <Button href="/get-started" size="lg" className="!bg-white !text-brand-dark hover:!bg-gray-100">
            Join Body First Today
          </Button>
        </div>
      </section>
    </>
  );
}
