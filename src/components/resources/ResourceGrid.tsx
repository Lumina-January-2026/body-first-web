import ResourceCard from './ResourceCard';
import type { ResourceFrontmatter } from '@/types/resource';

interface ResourceGridProps {
  resources: ResourceFrontmatter[];
}

export default function ResourceGrid({ resources }: ResourceGridProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-gray-500 text-sm">No resources found matching your filters.</p>
        <p className="text-gray-400 text-xs mt-1">Try adjusting your selection above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.slug} resource={resource} />
      ))}
    </div>
  );
}
