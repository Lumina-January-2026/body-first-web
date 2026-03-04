import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/content';
import ResourceGrid from '@/components/resources/ResourceGrid';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'The latest insights, updates, and stories from the Body First team about GLP-1 medications and wellness.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts().map((p) => p.frontmatter);

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Insights, updates, and stories from our team about GLP-1 medications and wellness.
          </p>
        </div>
      </section>

      <section className="pb-16">
        {posts.length > 0 ? (
          <ResourceGrid resources={posts} />
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" strokeLinecap="round">
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm mb-1">New blog posts are coming soon.</p>
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
