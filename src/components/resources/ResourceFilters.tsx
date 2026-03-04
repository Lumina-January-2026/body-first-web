'use client';

import { useState, useMemo } from 'react';
import ResourceGrid from './ResourceGrid';
import { CATEGORIES, MEDICATIONS, CATEGORY_LABELS, MEDICATION_LABELS } from '@/types/resource';
import type { ResourceFrontmatter, Category, Medication } from '@/types/resource';

interface ResourceFiltersProps {
  resources: ResourceFrontmatter[];
}

export default function ResourceFilters({ resources }: ResourceFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedMedication, setSelectedMedication] = useState<Medication | 'all'>('all');

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
      if (selectedMedication !== 'all' && !r.medications.includes(selectedMedication)) return false;
      return true;
    });
  }, [resources, selectedCategory, selectedMedication]);

  const pillBase =
    'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap border';
  const pillActive =
    'bg-teal-primary text-white border-teal-primary shadow-md';
  const pillInactive =
    'bg-white text-gray-600 border-gray-200 hover:border-teal-primary/30 hover:text-teal-primary';

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <button
          className={`${pillBase} ${selectedCategory === 'all' ? pillActive : pillInactive}`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${pillBase} ${selectedCategory === cat ? pillActive : pillInactive}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Medication sub-filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Medication:</span>
        <button
          className={`${pillBase} !text-xs !px-3 !py-1.5 ${selectedMedication === 'all' ? pillActive : pillInactive}`}
          onClick={() => setSelectedMedication('all')}
        >
          All
        </button>
        {MEDICATIONS.map((med) => (
          <button
            key={med}
            className={`${pillBase} !text-xs !px-3 !py-1.5 ${selectedMedication === med ? pillActive : pillInactive}`}
            onClick={() => setSelectedMedication(med)}
          >
            {MEDICATION_LABELS[med]}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing <span className="font-semibold text-gray-900">{filtered.length}</span> resource{filtered.length !== 1 ? 's' : ''}
      </p>

      <ResourceGrid resources={filtered} />
    </>
  );
}
