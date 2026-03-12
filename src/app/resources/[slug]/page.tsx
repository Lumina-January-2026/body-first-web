import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllResources, getAllResourceSlugs, getResourceBySlug } from '@/lib/content';
import StructuredData from '@/components/seo/StructuredData';

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return { title: 'Resource Not Found' };

  return {
    title: resource.frontmatter.title,
    description: resource.frontmatter.description,
    openGraph: {
      title: resource.frontmatter.title,
      description: resource.frontmatter.description,
      type: 'article',
      publishedTime: resource.frontmatter.publishedAt,
      modifiedTime: resource.frontmatter.updatedAt,
    },
  };
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  const { frontmatter, content } = resource;

  const allResources = getAllResources();
  const related = allResources
    .filter((r) => r.frontmatter.category === frontmatter.category && r.frontmatter.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <StructuredData
        type="Article"
        title={frontmatter.title}
        description={frontmatter.description}
        author={frontmatter.author}
        publishedAt={frontmatter.publishedAt}
        updatedAt={frontmatter.updatedAt}
        url={`https://bodyfirst.app/resources/${slug}`}
      />
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Back link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-6"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-sm font-medium">Resources</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Main article */}
          <article className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <p className="text-gray-400 text-sm mb-3">{frontmatter.publishedAt}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-5">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-teal-primary">
                {(frontmatter.author[0] || '?').toUpperCase()}
              </div>
              <span className="font-semibold text-gray-900">{frontmatter.author}</span>
            </div>
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-teal-primary hover:prose-a:text-teal-dark prose-strong:text-gray-900 prose-li:text-gray-600"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>

          {/* Related resources */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Related Resources</h3>
              <div className="space-y-3">
                {related.map((r) => (
                  <Link
                    key={r.frontmatter.slug}
                    href={`/resources/${r.frontmatter.slug}`}
                    className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all group"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-teal-primary transition-colors mb-1.5">
                      {r.frontmatter.title}
                    </h4>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-2">{r.frontmatter.description}</p>
                    <span className="text-xs text-gray-400">{r.frontmatter.author}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
