import { supabase } from './supabase';
import type { Session, User } from '@supabase/supabase-js';

export async function signInWithGoogle(): Promise<void> {
  const redirectTo = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : undefined;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });

  if (error) {
    console.error('Google sign-in error:', error.message);
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign-out error:', error.message);
  }
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}

export function onAuthStateChange(
  callback: (session: Session | null, user: User | null) => void,
) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session, session?.user ?? null);
  });
  return data.subscription;
}
