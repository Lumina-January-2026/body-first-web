'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { CommunityPost } from '@/types/community';
import { fetchPostById, fetchPosts } from '@/lib/community';
import { getCategoryLabel, timeAgo, shouldShowTeamBadge } from '@/lib/utils';
import type { Category } from '@/types/resource';
import { getInitial } from '@/lib/profile';

function Avatar({ nickname, color, size = 'md' }: { nickname: string; color: string; size?: 'sm' | 'md' }) {
  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: color }}
    >
      {getInitial(nickname)}
    </div>
  );
}

interface ThreadViewProps {
  postId: string;
}

export default function ThreadView({ postId }: ThreadViewProps) {
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/community?post=${postId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title ?? 'Community Post', url });
        return;
      } catch { /* user cancelled */ }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchPostById(postId).then((p) => {
      if (cancelled) return;
      setPost(p);
      setLoading(false);

      if (p) {
        fetchPosts({ category: p.category, limit: 3 }).then((related) => {
          if (cancelled) return;
          setRelatedPosts(related.filter((r) => r.id !== p.id).slice(0, 3));
        });
      }
    });

    return () => { cancelled = true; };
  }, [postId]);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="bg-white rounded-2xl p-8 space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-6 text-center">
        <p className="text-gray-500 text-lg">Post not found</p>
        <Link href="/" className="text-teal-primary hover:text-teal-dark font-semibold mt-4 inline-block">
          Back to community
        </Link>
      </div>
    );
  }

  const nickname = post.author_nickname ?? 'Anonymous';
  const color = post.author_color ?? '#9CA3AF';
  const categoryLabel = getCategoryLabel(post.category as Category);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-6"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span className="text-sm font-medium">Back</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Main thread */}
        <div>
          <article className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            {/* Meta */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>{categoryLabel}</span>
              <span className="text-gray-300">&middot;</span>
              <time dateTime={post.created_at}>{timeAgo(post.created_at)}</time>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-5">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-6">
              <Avatar nickname={nickname} color={color} />
              <span className="font-semibold text-gray-900">{nickname}</span>
              {shouldShowTeamBadge(post) && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
                  Body First Team
                </span>
              )}
            </div>

            {/* Body */}
            <div className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-wrap mb-6">
              {post.body}
            </div>

            {/* Medication tags */}
            {post.medications.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {post.medications.map((med) => (
                  <span
                    key={med}
                    className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium"
                  >
                    {med}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button onClick={handleShare} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          </article>

          {/* Comments placeholder */}
          <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-gray-400 text-sm">Comments coming soon</p>
          </div>
        </div>

        {/* Right sidebar — related posts */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Related Posts</h3>
            {relatedPosts.length > 0 ? (
              <div className="space-y-3">
                {relatedPosts.map((related) => {
                  const rNickname = related.author_nickname ?? 'Anonymous';
                  const rColor = related.author_color ?? '#9CA3AF';
                  return (
                    <Link
                      key={related.id}
                      href={`/community?post=${related.id}`}
                      className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all group"
                    >
                      <h4 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-teal-primary transition-colors mb-1.5">
                        {related.title}
                      </h4>
                      <p className="text-gray-500 text-xs line-clamp-2 mb-2">{related.body}</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: rColor }}
                        >
                          {getInitial(rNickname)}
                        </div>
                        <span className="text-xs text-gray-400">{rNickname}</span>
                        {shouldShowTeamBadge(related) && (
                          <span className="inline-flex items-center px-1 py-0.5 rounded text-[9px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
                            Team
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No related posts yet</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
