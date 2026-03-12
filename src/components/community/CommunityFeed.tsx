'use client';

import { useState } from 'react';
import { useCommunityFeed } from '@/hooks/useCommunityFeed';
import { useProfile } from './ProfileContext';
import CommunityPost from './CommunityPost';
import CreatePostModal from './CreatePostModal';

type ActiveFilter = {
  type: 'medication' | 'category';
  value: string;
} | null;

interface CommunityFeedProps {
  activeFilter: ActiveFilter;
}

export default function CommunityFeed({ activeFilter }: CommunityFeedProps) {
  const { posts, loading, hasMore, loadMore, refresh } = useCommunityFeed(activeFilter);
  const { profile, openProfileModal } = useProfile();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleShareClick = () => {
    if (!profile) {
      openProfileModal();
      return;
    }
    setShowCreateModal(true);
  };

  return (
    <main className="min-w-0">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          Welcome to the Body First Community
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Share experiences, ask questions, support each other
        </p>
      </div>

      {/* Share prompt */}
      <button
        onClick={handleShareClick}
        className="w-full bg-white rounded-2xl border border-gray-100 p-4 mb-4 text-left hover:border-gray-200 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <span className="text-gray-400 text-[15px]">Share your story or ask a question...</span>
        </div>
      </button>

      {/* Feed */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 px-5">
        {loading && posts.length === 0 ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="py-5 animate-pulse">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded mb-1" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <CommunityPost key={post.id} post={post} />
          ))
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-600 mb-2 font-semibold">Be the first to share your story!</p>
            <p className="text-sm text-gray-400 mb-4">
              Your experience could help someone just starting their journey.
            </p>
            <button
              onClick={handleShareClick}
              className="bg-teal-primary hover:bg-teal-dark text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Share Your Story
            </button>
          </div>
        )}
      </div>

      {/* Load more */}
      {hasMore && posts.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="text-teal-primary hover:text-teal-dark font-semibold text-sm px-6 py-2.5 rounded-full border border-teal-primary/20 hover:border-teal-primary/40 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}

      <CreatePostModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={refresh}
      />
    </main>
  );
}
