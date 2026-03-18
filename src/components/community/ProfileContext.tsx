/**
 * ProfileContext — auth state + community profile management.
 *
 * Provides unified auth across Google, Apple, and Email/Password sign-in.
 * All three methods use the same Supabase project as the mobile app, so the
 * same auth.users identity works on both platforms.
 *
 * Profile sync: when a user signs in (any method), we check if they have a
 * community_profiles row. If not (e.g. mobile user visiting web for first time),
 * we prompt them to create one via the JoinModal. The profile provides a
 * nickname + color for community display.
 */

'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import type { CommunityProfile } from '@/types/community';
import {
  getCachedProfile,
  fetchProfileByUserId,
  upsertProfileForUser,
  clearProfileCache,
  randomColor,
} from '@/lib/profile';
import {
  signInWithGoogle,
  signInWithApple,
  signInWithEmail,
  signUpWithEmail,
  verifyOTP,
  signOut as authSignOut,
  getSession,
  onAuthStateChange,
} from '@/lib/auth';
import type { AuthResult } from '@/lib/auth';

type AuthMethod = 'google' | 'apple' | 'email';

interface ProfileContextValue {
  profile: CommunityProfile | null;
  profileId: string | null;
  user: User | null;
  isAuthenticated: boolean;
  /** Sign in with a specific provider. Defaults to showing the auth page. */
  signIn: (method?: AuthMethod) => Promise<AuthResult | void>;
  signOut: () => Promise<void>;
  /** Email/password sign up — returns result with needsEmailConfirmation flag */
  signUpEmail: (email: string, password: string) => Promise<AuthResult>;
  /** Email/password sign in */
  signInEmail: (email: string, password: string) => Promise<AuthResult>;
  /** Verify OTP code from email confirmation */
  verifyEmailOTP: (email: string, token: string) => Promise<AuthResult>;
  saveProfile: (nickname: string, color: string) => Promise<void>;
  profileError: string | null;
  showProfileModal: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  /** True when a profile needs to be created (user is authed but has no profile) */
  needsProfile: boolean;
}

const ProfileCtx = createContext<ProfileContextValue>({
  profile: null,
  profileId: null,
  user: null,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
  signUpEmail: async () => ({ success: false }),
  signInEmail: async () => ({ success: false }),
  verifyEmailOTP: async () => ({ success: false }),
  saveProfile: async () => {},
  profileError: null,
  showProfileModal: false,
  openProfileModal: () => {},
  closeProfileModal: () => {},
  needsProfile: false,
});

export function useProfile() {
  return useContext(ProfileCtx);
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<CommunityProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Load cached profile immediately for fast UI
  useEffect(() => {
    const cached = getCachedProfile();
    if (cached) setProfile(cached);
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    // Check existing session on mount
    getSession().then((session) => {
      if (session?.user) {
        setUser(session.user);
        loadProfileForUser(session.user.id);
      }
    });

    const subscription = onAuthStateChange((session, authUser) => {
      setUser(authUser);
      if (authUser) {
        loadProfileForUser(authUser.id);
      } else {
        setProfile(null);
        setNeedsProfile(false);
        clearProfileCache();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Load community profile for an authenticated user.
   * If no profile exists (e.g. mobile user visiting web for first time),
   * sets needsProfile=true to trigger the JoinModal prompt.
   */
  const loadProfileForUser = async (userId: string) => {
    // Skip fetch if cache is fresh
    const cached = getCachedProfile();
    if (cached && cached.user_id === userId) {
      setProfile(cached);
      setNeedsProfile(false);
      return;
    }

    const remote = await fetchProfileByUserId(userId);
    if (remote) {
      setProfile(remote);
      setNeedsProfile(false);
    } else {
      // User is authenticated but has no community profile — prompt to create one.
      // This happens when a mobile user signs in on web for the first time.
      setNeedsProfile(true);
    }
  };

  const handleSave = useCallback(async (nickname: string, color: string) => {
    if (!user) return;
    setProfileError(null);
    const { profile: result, error } = await upsertProfileForUser(user.id, nickname, color);
    if (result) {
      setProfile(result);
      setNeedsProfile(false);
      setShowProfileModal(false);
    } else {
      setProfileError(error ?? 'Failed to create profile. Please try again.');
    }
  }, [user]);

  const handleSignIn = useCallback(async (method: AuthMethod = 'google'): Promise<AuthResult | void> => {
    switch (method) {
      case 'google':
        return signInWithGoogle();
      case 'apple':
        return signInWithApple();
      case 'email':
        // For email, redirect to the auth page instead of OAuth flow
        if (typeof window !== 'undefined') {
          window.location.href = '/auth';
        }
        break;
    }
  }, []);

  const handleSignUpEmail = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    return signUpWithEmail(email, password);
  }, []);

  const handleSignInEmail = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    return signInWithEmail(email, password);
  }, []);

  const handleVerifyOTP = useCallback(async (email: string, token: string): Promise<AuthResult> => {
    return verifyOTP(email, token);
  }, []);

  const handleSignOut = useCallback(async () => {
    await authSignOut();
    setProfile(null);
    setUser(null);
    setNeedsProfile(false);
    clearProfileCache();
  }, []);

  return (
    <ProfileCtx.Provider
      value={{
        profile,
        profileId: profile?.id ?? null,
        user,
        isAuthenticated: !!user,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUpEmail: handleSignUpEmail,
        signInEmail: handleSignInEmail,
        verifyEmailOTP: handleVerifyOTP,
        saveProfile: handleSave,
        profileError,
        showProfileModal,
        openProfileModal: () => {
          if (!user) {
            // If not authenticated, redirect to auth page
            if (typeof window !== 'undefined') {
              window.location.href = '/auth';
            }
            return;
          }
          setShowProfileModal(true);
        },
        closeProfileModal: () => setShowProfileModal(false),
        needsProfile,
      }}
    >
      {children}
    </ProfileCtx.Provider>
  );
}
