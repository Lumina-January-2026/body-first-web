import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CATEGORIES, CONCERNS, MEDICATIONS } from '../src/types/resource';

const contentDirs = ['resources', 'guides', 'blog', 'comparisons'];
const contentBase = path.join(process.cwd(), 'content');

let errors = 0;
let validated = 0;

function validateFrontmatter(filePath: string, data: Record<string, unknown>): string[] {
  const issues: string[] = [];

  if (!data.title || typeof data.title !== 'string') issues.push('Missing or invalid title');
  if (!data.slug || typeof data.slug !== 'string') issues.push('Missing or invalid slug');
  if (!data.description || typeof data.description !== 'string') issues.push('Missing or invalid description');

  if (typeof data.title === 'string' && data.title.length > 60) {
    issues.push(`Title too long (${data.title.length} chars, max 60)`);
  }
  if (typeof data.description === 'string' && data.description.length > 155) {
    issues.push(`Description too long (${data.description.length} chars, max 155)`);
  }

  if (!data.category || !CATEGORIES.includes(data.category as typeof CATEGORIES[number])) {
    issues.push(`Invalid category: "${data.category}". Must be one of: ${CATEGORIES.join(', ')}`);
  }

  if (typeof data.stage !== 'number' || data.stage < 1 || data.stage > 5) {
    issues.push(`Invalid stage: "${data.stage}". Must be 1-5`);
  }

  if (!Array.isArray(data.concerns) || data.concerns.length === 0) {
    issues.push('Missing or empty concerns array');
  } else {
    for (const concern of data.concerns) {
      if (!CONCERNS.includes(concern as typeof CONCERNS[number])) {
        issues.push(`Invalid concern: "${concern}"`);
      }
    }
  }

  if (!Array.isArray(data.medications) || data.medications.length === 0) {
    issues.push('Missing or empty medications array');
  } else {
    for (const med of data.medications) {
      if (!MEDICATIONS.includes(med as typeof MEDICATIONS[number])) {
        issues.push(`Invalid medication: "${med}"`);
      }
    }
  }

  if (!data.publishedAt) issues.push('Missing publishedAt date');
  if (typeof data.readingTime !== 'number') issues.push('Missing or invalid readingTime');
  if (!Array.isArray(data.seoKeywords)) issues.push('Missing seoKeywords array');

  return issues;
}

for (const dir of contentDirs) {
  const dirPath = path.join(contentBase, dir);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContents);

    const issues = validateFrontmatter(filePath, data);
    validated++;

    if (issues.length > 0) {
      console.error(`\n❌ ${dir}/${file}:`);
      for (const issue of issues) {
        console.error(`   - ${issue}`);
      }
      errors += issues.length;
    } else {
      console.log(`✅ ${dir}/${file}`);
    }
  }
}

console.log(`\n${validated} files validated, ${errors} issues found.`);

if (errors > 0) {
  process.exit(1);
}
