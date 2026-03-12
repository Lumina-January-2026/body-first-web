'use client';

import Link from 'next/link';
import { COMMUNITY_NAV } from '@/types/resource';

type ActiveFilter = {
  type: 'medication' | 'category';
  value: string;
} | null;

interface CategoryNavProps {
  activeFilter: ActiveFilter;
  onFilterChange: (filter: ActiveFilter) => void;
  mode?: 'desktop' | 'mobile';
}

export default function CategoryNav({ activeFilter, onFilterChange, mode = 'desktop' }: CategoryNavProps) {
  if (mode === 'mobile') {
    return (
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 min-w-max pb-1">
          <button
            onClick={() => onFilterChange(null)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {COMMUNITY_NAV.flatMap((section) =>
            section.items
              .filter((item) => item.filter)
              .map((item) => {
                const isActive =
                  activeFilter?.type === item.filter?.type &&
                  activeFilter?.value === item.filter?.value;
                return (
                  <button
                    key={item.label}
                    onClick={() => onFilterChange(item.filter)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    {item.label}
                  </button>
                );
              })
          )}
        </div>
      </div>
    );
  }

  return (
    <nav className="sticky top-16 space-y-6" aria-label="Community categories">
      {/* Home */}
      <button
        onClick={() => onFilterChange(null)}
        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === null
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Home
      </button>

      {COMMUNITY_NAV.map((section) => (
        <div key={section.heading}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            {section.heading}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              if (item.href) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <span className="text-base">{item.emoji}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isActive =
                activeFilter?.type === item.filter?.type &&
                activeFilter?.value === item.filter?.value;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => onFilterChange(item.filter)}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-base">{item.emoji}</span>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Online indicator */}
      <div className="px-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          47 people online
        </div>
      </div>

      <div className="px-3 text-xs text-gray-400 space-y-1">
        <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
        <span className="mx-1">&middot;</span>
        <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
      </div>
    </nav>
  );
}
