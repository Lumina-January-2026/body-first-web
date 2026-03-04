import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getAllBlogPosts, markdownToHtml } from '@/lib/content';
import { formatDate, getCategoryLabel } from '@/lib/utils';
import Badge from '@/components/common/Badge';
import AppDownloadCTA from '@/components/cta/AppDownloadCTA';

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  if (slugs.length === 0) return [{ slug: '_placeholder' }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);

  return (
    <article className="py-10 md:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-teal-primary transition-colors">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <Link href="/blog" className="hover:text-teal-primary transition-colors">Blog</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <span className="text-gray-600 truncate max-w-[200px]">{post.frontmatter.title}</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Badge>{getCategoryLabel(post.frontmatter.category)}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4 leading-tight">
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <time dateTime={post.frontmatter.publishedAt}>
              {formatDate(post.frontmatter.publishedAt)}
            </time>
            <span>&middot;</span>
            <span>{post.frontmatter.readingTime} min read</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 md:p-10">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-teal-primary hover:prose-a:text-teal-dark prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        <div className="mt-10">
          <AppDownloadCTA />
        </div>
      </div>
    </article>
  );
}
