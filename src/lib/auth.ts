/**
 * Authentication functions for Body First website.
 *
 * Supports three auth methods (matching the mobile app):
 * 1. Google OAuth — redirects to Google, back to /auth/callback
 * 2. Apple OAuth — redirects to Apple, back to /auth/callback
 * 3. Email/Password — sign up with email confirmation (OTP), sign in with password
 *
 * All methods use the same Supabase project as the mobile app, so the same
 * auth.users identity works across both platforms.
 */

import { supabase } from './supabase';
import type { Session, User } from '@supabase/supabase-js';

// ── OAuth Providers ──

export async function signInWithGoogle(): Promise<AuthResult> {
  const redirectTo = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : undefined;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function signInWithApple(): Promise<AuthResult> {
  const redirectTo = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : undefined;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: { redirectTo },
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ── Email/Password Auth ──

export interface AuthResult {
  success: boolean;
  error?: string;
  /** True when email confirmation is required before the user can sign in */
  needsEmailConfirmation?: boolean;
}

/**
 * Sign up with email and password.
 * Supabase sends a confirmation email (OTP code or link depending on template).
 * The user must verify before they can sign in.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // If user was created but no session, email confirmation is required.
  // Supabase returns a user object with identities=[] if the email is already
  // registered — treat as "already exists" error.
  if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const needsConfirmation = !!data.user && !data.session;
  return { success: true, needsEmailConfirmation: needsConfirmation };
}

/**
 * Sign in with email and password.
 * Only works after the user has confirmed their email.
 */
export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Verify OTP code from email confirmation.
 * Used after signUpWithEmail when Supabase sends a 6-digit code.
 */
export async function verifyOTP(
  email: string,
  token: string,
): Promise<AuthResult> {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ── Session Management ──

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
