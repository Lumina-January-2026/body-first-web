import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/content';
import ResourceGrid from '@/components/resources/ResourceGrid';

export const metadata: Metadata = {
  title: 'GLP-1 Guides',
  description: 'In-depth guides to help you navigate GLP-1 medications, from getting started to managing your journey.',
};

export default function GuidesPage() {
  const guides = getAllGuides().map((g) => g.frontmatter);

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Guides</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            In-depth guides for every stage of your GLP-1 journey. Comprehensive walkthroughs and how-tos from our team.
          </p>
        </div>
      </section>

      <section className="pb-16">
        {guides.length > 0 ? (
          <ResourceGrid resources={guides} />
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" strokeLinecap="round">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm mb-1">Guides are coming soon.</p>
            <p className="text-gray-400 text-sm">
              Explore our{' '}
              <Link href="/resources" className="text-teal-primary hover:text-teal-dark font-medium transition-colors">
                resource library
              </Link>{' '}
              in the meantime.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
