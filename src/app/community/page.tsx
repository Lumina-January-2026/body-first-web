'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ThreadView from '@/components/community/ThreadView';

function CommunityPageInner() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('post');

  if (!postId) {
    // Redirect to home feed if no post ID
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  return <ThreadView postId={postId} />;
}

export default function CommunityPage() {
  return (
    <Suspense fallback={
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
    }>
      <CommunityPageInner />
    </Suspense>
  );
}
