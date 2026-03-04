import type { Metadata } from 'next';
import { getAllResources } from '@/lib/content';
import ResourceFilters from '@/components/resources/ResourceFilters';

export const metadata: Metadata = {
  title: 'GLP-1 Resources & Guides',
  description:
    'Browse our library of trusted GLP-1 medication resources. Filter by category, medication, or concern to find exactly what you need.',
};

export default function ResourcesPage() {
  const resources = getAllResources().map((r) => r.frontmatter);

  return (
    <>
      {/* Page Header — peach gradient */}
      <section className="bg-gradient-to-br from-peach-start to-peach-end px-6 py-16 md:py-24">
        <div className="max-w-[960px] mx-auto text-center flex flex-col items-center gap-6">
          <h1 className="text-gray-900 text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Resource Library
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl">
            Expert guidance, clinical tools, and real stories to support your GLP-1 journey towards better health.
          </p>
          {/* Search bar placeholder */}
          <div className="w-full max-w-xl mt-4 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for guides, tools, or topics..."
              className="block w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-xl shadow-gray-200/50 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-primary focus:outline-none text-base transition-all"
            />
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-8 pb-16 bg-peach-end/30">
        <div className="max-w-[1440px] mx-auto px-6">
          <ResourceFilters resources={resources} />
        </div>
      </section>
    </>
  );
}
