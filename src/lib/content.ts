import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { ResourceFrontmatter, Resource } from '@/types/resource';

const contentDirectory = path.join(process.cwd(), 'content');

function getContentDir(type: string): string {
  return path.join(contentDirectory, type);
}

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

// ── Resources ──

export function getAllResources(): Resource[] {
  const dir = getContentDir('resources');
  const files = getMarkdownFiles(dir);

  return files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      const frontmatter = data as ResourceFrontmatter;
      return {
        frontmatter,
        content,
        slug: frontmatter.slug || filename.replace(/\.md$/, ''),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const resources = getAllResources();
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) return null;
  const htmlContent = await markdownToHtml(resource.content);
  return { ...resource, content: htmlContent };
}

export function getAllResourceSlugs(): string[] {
  return getAllResources().map((r) => r.slug);
}

// ── Guides ──

export function getAllGuides(): Resource[] {
  const dir = getContentDir('guides');
  const files = getMarkdownFiles(dir);

  return files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as ResourceFrontmatter;
    return {
      frontmatter,
      content,
      slug: frontmatter.slug || filename.replace(/\.md$/, ''),
    };
  });
}

export async function getGuideBySlug(slug: string): Promise<Resource | null> {
  const guides = getAllGuides();
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return null;
  const htmlContent = await markdownToHtml(guide.content);
  return { ...guide, content: htmlContent };
}

export function getAllGuideSlugs(): string[] {
  return getAllGuides().map((g) => g.slug);
}

// ── Blog ──

export function getAllBlogPosts(): Resource[] {
  const dir = getContentDir('blog');
  const files = getMarkdownFiles(dir);

  return files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as ResourceFrontmatter;
    return {
      frontmatter,
      content,
      slug: frontmatter.slug || filename.replace(/\.md$/, ''),
    };
  });
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}

// ── Comparisons ──

export function getAllComparisons(): Resource[] {
  const dir = getContentDir('comparisons');
  const files = getMarkdownFiles(dir);

  return files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as ResourceFrontmatter;
    return {
      frontmatter,
      content,
      slug: frontmatter.slug || filename.replace(/\.md$/, ''),
    };
  });
}

export function getAllComparisonSlugs(): string[] {
  return getAllComparisons().map((c) => c.slug);
}
