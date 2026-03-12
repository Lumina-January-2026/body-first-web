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
import { signInWithGoogle, signOut as authSignOut, getSession, onAuthStateChange } from '@/lib/auth';

interface ProfileContextValue {
  profile: CommunityProfile | null;
  profileId: string | null;
  user: User | null;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  saveProfile: (nickname: string, color: string) => Promise<void>;
  showProfileModal: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

const ProfileCtx = createContext<ProfileContextValue>({
  profile: null,
  profileId: null,
  user: null,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
  saveProfile: async () => {},
  showProfileModal: false,
  openProfileModal: () => {},
  closeProfileModal: () => {},
});

export function useProfile() {
  return useContext(ProfileCtx);
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<CommunityProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

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
        clearProfileCache();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfileForUser = async (userId: string) => {
    // Skip fetch if cache is fresh
    const cached = getCachedProfile();
    if (cached && cached.user_id === userId) {
      setProfile(cached);
      return;
    }

    const remote = await fetchProfileByUserId(userId);
    if (remote) {
      setProfile(remote);
    }
  };

  const handleSave = useCallback(async (nickname: string, color: string) => {
    if (!user) return;
    const result = await upsertProfileForUser(user.id, nickname, color);
    if (result) {
      setProfile(result);
    }
    setShowProfileModal(false);
  }, [user]);

  const handleSignIn = useCallback(async () => {
    await signInWithGoogle();
  }, []);

  const handleSignOut = useCallback(async () => {
    await authSignOut();
    setProfile(null);
    setUser(null);
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
        saveProfile: handleSave,
        showProfileModal,
        openProfileModal: () => {
          if (!user) {
            // If not authenticated, trigger sign-in instead
            handleSignIn();
            return;
          }
          setShowProfileModal(true);
        },
        closeProfileModal: () => setShowProfileModal(false),
      }}
    >
      {children}
    </ProfileCtx.Provider>
  );
}
