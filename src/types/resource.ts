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

export interface CommunityNavItem {
  emoji: string;
  label: string;
  filter: { type: 'medication' | 'category'; value: string } | null;
  href?: string;
}

export interface CommunityNavSection {
  heading: string;
  items: CommunityNavItem[];
}

export const COMMUNITY_NAV: CommunityNavSection[] = [
  {
    heading: 'COMMUNITIES',
    items: [
      { emoji: '\u{1F48A}', label: 'Ozempic', filter: { type: 'medication', value: 'ozempic' } },
      { emoji: '\u{1F489}', label: 'Wegovy', filter: { type: 'medication', value: 'wegovy' } },
      { emoji: '\u{1F52C}', label: 'Mounjaro', filter: { type: 'medication', value: 'mounjaro' } },
      { emoji: '\u{26A1}', label: 'Zepbound', filter: { type: 'medication', value: 'zepbound' } },
      { emoji: '\u{1F48A}', label: 'Oral Semaglutide', filter: { type: 'medication', value: 'oral-semaglutide' } },
    ],
  },
  {
    heading: 'TOPICS',
    items: [
      { emoji: '\u{1F389}', label: 'Wins', filter: { type: 'category', value: 'Wins' } },
      { emoji: '\u{1F915}', label: 'Side Effects', filter: { type: 'category', value: 'Side Effects' } },
      { emoji: '\u{1F4B0}', label: 'Cost & Insurance', filter: { type: 'category', value: 'Cost & Insurance' } },
      { emoji: '\u{1F4A1}', label: 'Tips', filter: { type: 'category', value: 'Tips' } },
      { emoji: '\u{2753}', label: 'Questions', filter: { type: 'category', value: 'Questions' } },
      { emoji: '\u{1F4AC}', label: 'General', filter: { type: 'category', value: 'General' } },
    ],
  },
  {
    heading: 'SUPPORT',
    items: [
      { emoji: '\u{1F4DA}', label: 'Resources', filter: null, href: '/resources' },
      { emoji: '\u{1F4D6}', label: 'Guides', filter: null, href: '/guides' },
    ],
  },
];

/** Categories used by community posts (matches agent system). */
export const COMMUNITY_CATEGORIES = [
  'Wins',
  'Side Effects',
  'Cost & Insurance',
  'Tips',
  'Questions',
  'General',
] as const;

export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number];
