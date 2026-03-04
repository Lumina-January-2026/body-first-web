import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllGuideSlugs, getGuideBySlug } from '@/lib/content';
import { formatDate, getCategoryLabel } from '@/lib/utils';
import Badge from '@/components/common/Badge';
import AppDownloadCTA from '@/components/cta/AppDownloadCTA';

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  if (slugs.length === 0) return [{ slug: '_placeholder' }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return { title: 'Guide Not Found' };

  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <article className="py-10 md:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-teal-primary transition-colors">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <Link href="/guides" className="hover:text-teal-primary transition-colors">Guides</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-gray-600 truncate max-w-[200px]">{guide.frontmatter.title}</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge>{getCategoryLabel(guide.frontmatter.category)}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4 leading-tight">
            {guide.frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <time dateTime={guide.frontmatter.publishedAt}>
              {formatDate(guide.frontmatter.publishedAt)}
            </time>
            <span>&middot;</span>
            <span>{guide.frontmatter.readingTime} min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-10">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-teal-primary hover:prose-a:text-teal-dark prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
        </div>

        <div className="mt-10">
          <AppDownloadCTA />
        </div>
      </div>
    </article>
  );
}
