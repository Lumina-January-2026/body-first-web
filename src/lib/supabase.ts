import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  if (typeof window === 'undefined') return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
    },
  });
  return cached;
}

// Chainable noop that returns { data: null, error: null } when awaited
const noopResult = Promise.resolve({ data: null, error: null });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noopChain: any = new Proxy(noopResult as any, {
  get(target: any, prop: string | symbol) {
    if (prop === 'then' || prop === 'catch' || prop === 'finally') {
      return target[prop].bind(target);
    }
    return () => noopChain;
  },
});

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    if (!client) {
      // auth is accessed as a property, not a function call
      if (prop === 'auth') return noopChain;
      if (prop === 'from') return () => noopChain;
      return () => noopChain;
    }
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
