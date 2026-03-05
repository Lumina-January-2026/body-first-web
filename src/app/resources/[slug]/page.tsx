import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllResources, getAllResourceSlugs, getResourceBySlug } from '@/lib/content';
import { formatDate, getCategoryLabel, getMedicationLabel } from '@/lib/utils';
import { CATEGORIES, CATEGORY_LABELS } from '@/types/resource';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import InArticleCTA from '@/components/cta/InArticleCTA';
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

      {/* Article Header — peach gradient */}
      <section className="bg-gradient-to-b from-peach-start to-peach-end pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap gap-2 items-center mb-6 text-sm">
            <Link href="/" className="text-gray-500 font-medium hover:text-teal-primary transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/resources" className="text-gray-500 font-medium hover:text-teal-primary transition-colors">Resources</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{getCategoryLabel(frontmatter.category)}</span>
          </nav>

          {/* Badge */}
          <Badge className="mb-6">{getCategoryLabel(frontmatter.category)}</Badge>

          {/* Title & Meta */}
          <div className="flex flex-col gap-6 max-w-4xl">
            <h1 className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-primary to-teal-dark flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {frontmatter.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span>{frontmatter.author}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <time dateTime={frontmatter.publishedAt}>{formatDate(frontmatter.publishedAt)}</time>
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span>{frontmatter.readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Layout: Two Columns */}
      <div className="-mt-10 md:-mt-16 z-10 relative px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Article Content */}
          <article className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow-card p-6 md:p-12">
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-teal-primary hover:prose-a:text-teal-dark prose-strong:text-gray-900 prose-li:text-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* In-article CTA */}
            <InArticleCTA category={frontmatter.category} />
          </article>

          {/* RIGHT: Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Related Resources */}
              {related.length > 0 && (
                <div className="bg-peach-end/80 p-6 rounded-xl border border-peach-start">
                  <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-coral"><path d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"/></svg>
                    Related Resources
                  </h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r.frontmatter.slug}
                        href={`/resources/${r.frontmatter.slug}`}
                        className="group block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:translate-x-1"
                      >
                        <h4 className="font-semibold text-gray-800 group-hover:text-teal-primary transition-colors text-sm mb-1">
                          {r.frontmatter.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-400 gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          {r.frontmatter.readingTime} min read
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Download App */}
              <div className="bg-nav-dark rounded-xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                    <svg width="32" height="32" fill="white" viewBox="0 0 48 48">
                      <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Track Your Journey</h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    Log your doses, track weight changes, and get personalized tips on the Body First app.
                  </p>
                  <Button href="/get-started" size="sm" fullWidth>
                    Download the App
                  </Button>
                </div>
              </div>

              {/* Browse by Topic */}
              <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100">
                <h3 className="text-gray-900 font-bold text-lg mb-3">Browse by Topic</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      href="/resources"
                      className="text-xs bg-gray-100 hover:bg-teal-50 hover:text-teal-primary text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {CATEGORY_LABELS[cat]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
