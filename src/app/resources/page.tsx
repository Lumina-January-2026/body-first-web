import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllResources } from '@/lib/content';
import { getCategoryLabel, getCategoryEmoji } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Resources — Body First',
  description:
    'Browse our library of GLP-1 medication resources. Guides, tips, and expert information to support your journey.',
};

export default function ResourcesPage() {
  const resources = getAllResources().map((r) => r.frontmatter);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Resources</h1>
      <p className="text-gray-500 mb-8">Guides, tips, and expert information to support your journey.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Link
            key={resource.slug}
            href={`/resources/${resource.slug}`}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>{getCategoryEmoji(resource.category)}</span>
              <span>{getCategoryLabel(resource.category)}</span>
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-teal-primary transition-colors leading-snug mb-2">
              {resource.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 mb-3">{resource.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{resource.author}</span>
              <span>{resource.readingTime} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
