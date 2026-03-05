import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  if (typeof window === 'undefined') return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  cached = createClient(url, key);
  return cached;
}

const noop = () => Promise.resolve({ data: null, error: null });

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    if (!client) {
      if (prop === 'from') return () => ({ select: noop, insert: noop, update: noop, delete: noop, upsert: noop });
      return noop;
    }
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
