'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { CommunityPost } from '@/types/community';
import { fetchPosts } from '@/lib/community';

type ActiveFilter = {
  type: 'medication' | 'category';
  value: string;
} | null;

const PAGE_SIZE = 20;

export function useCommunityFeed(filter: ActiveFilter) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);

  const load = useCallback(
    async (reset: boolean) => {
      setLoading(true);
      const newOffset = reset ? 0 : offsetRef.current;
      const data = await fetchPosts({
        category: filter?.type === 'category' ? filter.value : undefined,
        medication: filter?.type === 'medication' ? filter.value : undefined,
        limit: PAGE_SIZE,
        offset: newOffset,
      });
      if (reset) {
        setPosts(data);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === PAGE_SIZE);
      offsetRef.current = newOffset + data.length;
      setLoading(false);
    },
    [filter],
  );

  // Reset on filter change
  useEffect(() => {
    offsetRef.current = 0;
    setHasMore(true);
    setPosts([]);
    load(true);
  }, [load]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) load(false);
  }, [loading, hasMore, load]);

  // Listen for post-created events from Header's CreatePostModal
  useEffect(() => {
    const handler = () => load(true);
    window.addEventListener('community:post-created', handler);
    return () => window.removeEventListener('community:post-created', handler);
  }, [load]);

  return { posts, loading, hasMore, loadMore, refresh: () => load(true) };
}
