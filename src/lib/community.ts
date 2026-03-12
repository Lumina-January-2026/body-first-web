import { supabase } from './supabase';
import type { CommunityPost } from '@/types/community';

interface FetchPostsOptions {
  category?: string;
  medication?: string;
  limit?: number;
  offset?: number;
}

export async function fetchPosts({
  category,
  medication,
  limit = 20,
  offset = 0,
}: FetchPostsOptions = {}): Promise<CommunityPost[]> {
  let query = supabase
    .from('community_posts')
    .select('*, profile:community_profiles(*)')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq('category', category);
  }
  if (medication) {
    query = query.contains('medications', [medication]);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return data as CommunityPost[];
}

export async function fetchPostById(id: string): Promise<CommunityPost | null> {
  const { data, error } = await supabase
    .from('community_posts')
    .select('*, profile:community_profiles(*)')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data as CommunityPost;
}

export async function createPost(
  profileId: string,
  title: string,
  body: string,
  category: string,
  medications: string[],
): Promise<CommunityPost | null> {
  const { data, error } = await supabase
    .from('community_posts')
    .insert({ profile_id: profileId, title, body, category, medications })
    .select('*, profile:community_profiles(*)')
    .single();

  if (error || !data) return null;
  return data as CommunityPost;
}
