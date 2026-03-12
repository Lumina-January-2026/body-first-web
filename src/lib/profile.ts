import { supabase } from './supabase';
import type { CommunityProfile } from '@/types/community';

export { type CommunityProfile } from '@/types/community';

export const PROFILE_COLORS = [
  '#F97316', // coral/orange
  '#60C5F1', // sky blue
  '#F9A8D4', // pink
  '#EF4444', // red
  '#FBBF24', // amber
  '#34D399', // green
];

const PROFILE_CACHE_KEY = 'bf_community_profile';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CachedProfile {
  profile: CommunityProfile;
  cachedAt: number;
}

// Module-level dedup for in-flight fetches
let inflightFetch: Promise<CommunityProfile | null> | null = null;

export function getCachedProfile(): CommunityProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY);
    if (!raw) return null;
    const cached: CachedProfile = JSON.parse(raw);
    if (Date.now() - cached.cachedAt > CACHE_TTL_MS) return null;
    return cached.profile;
  } catch {
    return null;
  }
}

function cacheProfile(profile: CommunityProfile): void {
  if (typeof window === 'undefined') return;
  const cached: CachedProfile = { profile, cachedAt: Date.now() };
  localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(cached));
}

export function clearProfileCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_CACHE_KEY);
}

export async function fetchProfileByUserId(userId: string): Promise<CommunityProfile | null> {
  if (inflightFetch) return inflightFetch;

  inflightFetch = (async () => {
    const { data, error } = await supabase
      .from('community_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) return null;
    const profile = data as CommunityProfile;
    cacheProfile(profile);
    return profile;
  })();

  try {
    return await inflightFetch;
  } finally {
    inflightFetch = null;
  }
}

export async function upsertProfileForUser(
  userId: string,
  nickname: string,
  color: string,
): Promise<CommunityProfile | null> {
  const { data, error } = await supabase
    .from('community_profiles')
    .upsert(
      { user_id: userId, nickname, color, platform: 'web' },
      { onConflict: 'user_id' },
    )
    .select('*')
    .single();

  if (error || !data) return null;
  const profile = data as CommunityProfile;
  cacheProfile(profile);
  return profile;
}

export function getInitial(nickname: string): string {
  return (nickname[0] || '?').toUpperCase();
}

export function randomColor(): string {
  return PROFILE_COLORS[Math.floor(Math.random() * PROFILE_COLORS.length)];
}
