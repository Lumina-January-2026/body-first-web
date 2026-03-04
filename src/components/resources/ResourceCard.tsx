import Link from 'next/link';
import Badge from '@/components/common/Badge';
import { getCategoryLabel } from '@/lib/utils';
import type { ResourceFrontmatter } from '@/types/resource';

interface ResourceCardProps {
  resource: ResourceFrontmatter;
}

const categoryBorderColors: Record<string, string> = {
  'cost-savings': 'border-t-teal-primary',
  'side-effects': 'border-t-coral',
  'getting-started': 'border-t-teal-primary',
  'medication-deep-dive': 'border-t-nav-dark',
  'comparisons': 'border-t-nav-dark',
  'lifestyle-nutrition': 'border-t-coral',
  'real-stories': 'border-t-nav-dark',
  'checklists-toolkits': 'border-t-teal-primary',
  'news-updates': 'border-t-gray-400',
  'mental-emotional': 'border-t-coral',
  'science-how-it-works': 'border-t-nav-dark',
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const borderColor = categoryBorderColors[resource.category] || 'border-t-gray-300';

  return (
    <article className={`group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-elevated border-t-4 ${borderColor} transition-all duration-300 flex flex-col h-full hover:-translate-y-1`}>
      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Badge>{getCategoryLabel(resource.category)}</Badge>
          {resource.featured && <Badge variant="teal">Featured</Badge>}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-teal-primary transition-colors">
          <Link href={`/resources/${resource.slug}`}>
            {resource.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
          {resource.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
          <span className="text-gray-400 text-xs flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            {resource.readingTime} min read
          </span>
          <Link
            href={`/resources/${resource.slug}`}
            className="text-teal-primary font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            Read
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
