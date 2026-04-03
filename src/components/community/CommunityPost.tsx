'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CommunityPost as CommunityPostType } from '@/types/community';
import { getCategoryLabel, timeAgo, shouldShowTeamBadge } from '@/lib/utils';
import { getMedicationLabel } from '@/lib/utils';
import { getInitial } from '@/lib/profile';
import type { Category } from '@/types/resource';

interface CommunityPostProps {
  post: CommunityPostType;
}

export default function CommunityPost({ post }: CommunityPostProps) {
  const [copied, setCopied] = useState(false);
  const categoryLabel = getCategoryLabel(post.category as Category);
  const nickname = post.author_nickname ?? 'Anonymous';
  const color = post.author_color ?? '#9CA3AF';

  const handleShare = async () => {
    const url = `${window.location.origin}/community?post=${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
        return;
      } catch { /* user cancelled or not supported */ }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="py-5 px-1">
      <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-sm text-gray-500 mb-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {getInitial(nickname)}
        </div>
        <span className="font-semibold text-gray-700">{nickname}</span>
        {shouldShowTeamBadge(post) && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
            Body First Team
          </span>
        )}
        <span className="text-gray-300">&middot;</span>
        <span>{categoryLabel}</span>
        <span className="text-gray-300">&middot;</span>
        <time dateTime={post.created_at}>{timeAgo(post.created_at)}</time>
      </div>

      <Link href={`/community?post=${post.id}`} className="group">
        <h3 className="text-[17px] font-bold text-gray-900 group-hover:text-teal-primary transition-colors leading-snug mb-1.5">
          {post.title}
        </h3>
      </Link>

      <p className="text-gray-600 text-[15px] leading-relaxed line-clamp-3 mb-3">
        {post.body}
      </p>

      {/* Medication tags */}
      {post.medications.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.medications.map((med) => (
            <span
              key={med}
              className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium"
            >
              {getMedicationLabel(med as Parameters<typeof getMedicationLabel>[0])}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-5 text-sm text-gray-400">
        <Link
          href={`/community?post=${post.id}`}
          className="flex items-center gap-1.5 hover:text-gray-600 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          <span>View</span>
        </Link>

        <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-gray-600 transition-colors" aria-label="Share">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span>{copied ? 'Copied!' : 'Share'}</span>
        </button>

        <a
          href={`mailto:support@bodyfirst.app?subject=${encodeURIComponent(`Report: Post ${post.id}`)}`}
          className="flex items-center gap-1.5 hover:text-gray-600 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
          <span>Report</span>
        </a>
      </div>
    </article>
  );
}
