import type { MetadataRoute } from 'next';
import { getAllResources, getAllGuides, getAllBlogPosts, getAllComparisons } from '@/lib/content';

export const dynamic = 'force-static';

const BASE_URL = 'https://bodyfirst.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const resources = getAllResources().map((r) => ({
    url: `${BASE_URL}/resources/${r.slug}`,
    lastModified: new Date(r.frontmatter.updatedAt || r.frontmatter.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const guides = getAllGuides().map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.frontmatter.updatedAt || g.frontmatter.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPosts = getAllBlogPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.updatedAt || p.frontmatter.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const comparisons = getAllComparisons().map((c) => ({
    url: `${BASE_URL}/compare/${c.slug}`,
    lastModified: new Date(c.frontmatter.updatedAt || c.frontmatter.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/resources`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/get-started`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return [...staticPages, ...resources, ...guides, ...blogPosts, ...comparisons];
}
