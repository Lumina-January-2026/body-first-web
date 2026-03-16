/**
 * Community post queries.
 *
 * Reads from the `community_posts_with_profiles` VIEW which joins posts with
 * author profile data (nickname/color) via user_id or profile_id fallback.
 *
 * Writes go to the `community_posts` TABLE with both `user_id` and
 * `profile_id` set for cross-platform compatibility and RLS compliance.
 */

import { supabase } from './supabase';
import type { CommunityPost } from '@/types/community';

interface FetchPostsOptions {
  category?: string;
  medication?: string;
  topic?: string;
  limit?: number;
  offset?: number;
}

/**
 * Fetch posts from the VIEW (includes flat author_nickname/author_color).
 */
export async function fetchPosts({
  category,
  medication,
  topic,
  limit = 20,
  offset = 0,
}: FetchPostsOptions = {}): Promise<CommunityPost[]> {
  let query = supabase
    .from('community_posts_with_profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq('category', category);
  }
  if (medication) {
    query = query.contains('medications', [medication]);
  }
  if (topic) {
    query = query.eq('topic', topic);
  }

  const { data, error } = await query;
  if (error) {
    console.error('fetchPosts error:', error.message);
    return [];
  }
  return (data ?? []) as CommunityPost[];
}

/**
 * Fetch a single post by ID from the VIEW.
 */
export async function fetchPostById(id: string): Promise<CommunityPost | null> {
  const { data, error } = await supabase
    .from('community_posts_with_profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('fetchPostById error:', error?.message);
    return null;
  }
  return data as CommunityPost;
}

/**
 * Create a new community post.
 *
 * Inserts into the `community_posts` TABLE (not the VIEW).
 * Sets both `user_id` (for RLS: auth.uid() = user_id) and `profile_id`
 * (for legacy compatibility / profile display).
 */
export async function createPost(
  userId: string,
  profileId: string,
  title: string,
  body: string,
  category: string,
  medications: string[],
): Promise<CommunityPost | null> {
  const { data, error } = await supabase
    .from('community_posts')
    .insert({
      user_id: userId,
      profile_id: profileId,
      title,
      body,
      category,
      medications,
    })
    .select('*')
    .single();

  if (error) {
    console.error('createPost error:', error.message);
    return null;
  }
  return data as CommunityPost;
}
