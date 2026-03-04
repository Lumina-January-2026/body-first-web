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
