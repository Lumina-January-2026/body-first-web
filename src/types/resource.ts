export const CATEGORIES = [
  'cost-savings',
  'side-effects',
  'getting-started',
  'medication-deep-dive',
  'comparisons',
  'lifestyle-nutrition',
  'real-stories',
  'checklists-toolkits',
  'news-updates',
  'mental-emotional',
  'science-how-it-works',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CONCERNS = [
  'cost',
  'side-effects',
  'needles',
  'doctor',
  'qualification',
  'effectiveness',
  'judgment',
  'commitment',
  'general',
] as const;

export type Concern = (typeof CONCERNS)[number];

export const MEDICATIONS = [
  'ozempic',
  'wegovy',
  'mounjaro',
  'zepbound',
  'oral-semaglutide',
  'general',
] as const;

export type Medication = (typeof MEDICATIONS)[number];

export interface ResourceFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: Category;
  stage: number;
  concerns: Concern[];
  medications: Medication[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  seoKeywords: string[];
}

export interface Resource {
  frontmatter: ResourceFrontmatter;
  content: string;
  slug: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'cost-savings': 'Cost & Savings',
  'side-effects': 'Side Effects',
  'getting-started': 'Getting Started',
  'medication-deep-dive': 'Medication Deep Dive',
  'comparisons': 'Comparisons',
  'lifestyle-nutrition': 'Lifestyle & Nutrition',
  'real-stories': 'Real Stories',
  'checklists-toolkits': 'Checklists & Toolkits',
  'news-updates': 'News & Updates',
  'mental-emotional': 'Mental & Emotional',
  'science-how-it-works': 'Science & How It Works',
};

export const CONCERN_LABELS: Record<Concern, string> = {
  cost: 'Cost',
  'side-effects': 'Side Effects',
  needles: 'Needles',
  doctor: 'Doctor Visits',
  qualification: 'Qualification',
  effectiveness: 'Effectiveness',
  judgment: 'Judgment',
  commitment: 'Commitment',
  general: 'General',
};

export const MEDICATION_LABELS: Record<Medication, string> = {
  ozempic: 'Ozempic',
  wegovy: 'Wegovy',
  mounjaro: 'Mounjaro',
  zepbound: 'Zepbound',
  'oral-semaglutide': 'Oral Semaglutide',
  general: 'General',
};
