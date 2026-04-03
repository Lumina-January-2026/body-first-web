import { CATEGORY_LABELS, CONCERN_LABELS, MEDICATION_LABELS } from '@/types/resource';
import type { Category, Concern, Medication } from '@/types/resource';

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getCategoryLabel(category: Category): string {
  return CATEGORY_LABELS[category] || category;
}

export function getConcernLabel(concern: Concern): string {
  return CONCERN_LABELS[concern] || concern;
}

export function getMedicationLabel(medication: Medication): string {
  return MEDICATION_LABELS[medication] || medication;
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  return `${Math.floor(months / 12)} year${Math.floor(months / 12) === 1 ? '' : 's'} ago`;
}

const CATEGORY_EMOJIS: Record<Category, string> = {
  'cost-savings': '\u{1F4B0}',
  'side-effects': '\u{1F915}',
  'getting-started': '\u{1F680}',
  'medication-deep-dive': '\u{1F52C}',
  'comparisons': '\u{2696}\u{FE0F}',
  'lifestyle-nutrition': '\u{1F957}',
  'real-stories': '\u{1F389}',
  'checklists-toolkits': '\u{2705}',
  'news-updates': '\u{1F4F0}',
  'mental-emotional': '\u{1F9E0}',
  'science-how-it-works': '\u{1F9EA}',
};

const MEDICATION_EMOJIS: Record<Medication, string> = {
  'ozempic': '\u{1F48A}',
  'wegovy': '\u{1F489}',
  'mounjaro': '\u{1F52C}',
  'zepbound': '\u{26A1}',
  'saxenda': '\u{1F4A7}',
  'rybelsus': '\u{1F48A}',
  'oral-semaglutide': '\u{1F48A}',
  'general': '\u{1F30D}',
};

export function getCategoryEmoji(category: Category): string {
  return CATEGORY_EMOJIS[category] || '\u{1F4CB}';
}

export function getMedicationEmoji(medication: Medication): string {
  return MEDICATION_EMOJIS[medication] || '\u{1F48A}';
}

/**
 * Deterministic badge for team-sourced posts.
 * Shows "Body First Team" on ~50% of team posts, matching the mobile app logic.
 */
export function shouldShowTeamBadge(post: { id: string; source?: string }): boolean {
  if (post.source !== 'team') return false;
  const suffix = post.id.replace(/-/g, '').slice(-4);
  return parseInt(suffix, 16) % 2 === 0;
}
