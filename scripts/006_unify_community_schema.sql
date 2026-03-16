-- Migration 006: Unify Community Schema for Cross-Platform Sync
--
-- Context: The mobile app (Expo) and website (Next.js) share the same Supabase
-- project (zeraesvijiwuihcyrwnr). The mobile app's community_posts table uses
-- `user_id` → auth.users(id). The website's community_posts uses `profile_id`
-- → community_profiles(id). This migration aligns both schemas so posts from
-- either platform are attributed to the same auth.users identity.
--
-- What this migration does:
-- 1. Adds `user_id` column to community_profiles (links profiles to auth.users)
-- 2. Adds `user_id` column to community_posts (if missing — mobile already has it)
-- 3. Makes `profile_id` nullable on community_posts (website legacy)
-- 4. Adds `topic` and counter columns to community_posts (matching mobile schema)
-- 5. Creates/replaces community_posts_with_profiles view for website feed
-- 6. Updates RLS policies for authenticated writes
--
-- IMPORTANT: Run in Supabase SQL Editor. This is idempotent — safe to re-run.
-- Applied: 2026-03-12

-- ── Step 1: Add user_id to community_profiles ──
-- Links community profile (nickname/color) to auth.users identity.
-- Nullable because existing anonymous profiles don't have a Supabase user.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'community_profiles' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE community_profiles
      ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

    -- Unique constraint: one profile per auth user
    CREATE UNIQUE INDEX IF NOT EXISTS idx_community_profiles_user_id
      ON community_profiles(user_id) WHERE user_id IS NOT NULL;
  END IF;
END $$;

-- Make anonymous_id nullable (was NOT NULL — authenticated users won't have one)
ALTER TABLE community_profiles ALTER COLUMN anonymous_id DROP NOT NULL;

-- ── Step 2: Add user_id to community_posts (if missing) ──
-- Mobile app already has this column. Website needs it for cross-platform posts.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'community_posts' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE community_posts
      ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

    CREATE INDEX IF NOT EXISTS idx_community_posts_user_id
      ON community_posts(user_id);
  END IF;
END $$;

-- ── Step 3: Make profile_id nullable (if it exists) ──
-- Old website posts use profile_id. New posts use user_id. Both coexist.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'community_posts' AND column_name = 'profile_id'
  ) THEN
    ALTER TABLE community_posts ALTER COLUMN profile_id DROP NOT NULL;
  END IF;
END $$;

-- ── Step 4: Add mobile schema columns to community_posts (if missing) ──
-- These exist in the mobile app's schema but not the website's original schema.
DO $$
BEGIN
  -- topic column (mobile uses this for feed categories)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'community_posts' AND column_name = 'topic'
  ) THEN
    ALTER TABLE community_posts ADD COLUMN topic text;
  END IF;

  -- likes_count (mobile tracks this as a denormalized counter)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'community_posts' AND column_name = 'likes_count'
  ) THEN
    ALTER TABLE community_posts ADD COLUMN likes_count integer NOT NULL DEFAULT 0;
  END IF;

  -- comments_count
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'community_posts' AND column_name = 'comments_count'
  ) THEN
    ALTER TABLE community_posts ADD COLUMN comments_count integer NOT NULL DEFAULT 0;
  END IF;

  -- image_url (mobile supports image posts)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'community_posts' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE community_posts ADD COLUMN image_url text;
  END IF;

  -- medications (website has this, mobile doesn't — keep for website)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'community_posts' AND column_name = 'medications'
  ) THEN
    ALTER TABLE community_posts ADD COLUMN medications text[] NOT NULL DEFAULT '{}';
  END IF;
END $$;

-- ── Step 5: Backfill user_id on community_posts from community_profiles ──
-- For existing website posts that have profile_id but no user_id,
-- pull user_id from the linked community_profile (if it has one).
UPDATE community_posts cp
SET user_id = p.user_id
FROM community_profiles p
WHERE cp.profile_id = p.id
  AND cp.user_id IS NULL
  AND p.user_id IS NOT NULL;

-- ── Step 6: Create view for website feed ──
-- Joins community_posts with community_profiles to get nickname/color for display.
-- Uses user_id as the primary join key, falls back to profile_id for legacy posts.
CREATE OR REPLACE VIEW community_posts_with_profiles AS
SELECT
  cp.id,
  cp.title,
  cp.body,
  cp.category,
  cp.topic,
  cp.medications,
  cp.image_url,
  cp.likes_count,
  cp.comments_count,
  cp.created_at,
  cp.updated_at,
  cp.user_id,
  -- Profile info for display (join by user_id first, then profile_id fallback)
  COALESCE(pu.nickname, pp.nickname) AS author_nickname,
  COALESCE(pu.color, pp.color) AS author_color,
  COALESCE(pu.id, pp.id) AS profile_id
FROM community_posts cp
-- Join by user_id (preferred — cross-platform)
LEFT JOIN community_profiles pu ON cp.user_id = pu.user_id
-- Fallback join by profile_id (legacy website posts)
LEFT JOIN community_profiles pp ON cp.profile_id = pp.id AND pu.id IS NULL
ORDER BY cp.created_at DESC;

-- Grant access to the view
GRANT SELECT ON community_posts_with_profiles TO anon, authenticated;

-- ── Step 7: Update RLS policies ──
-- Drop old permissive policies and add owner-scoped ones for authenticated users.

-- community_posts: authenticated users can only insert/update/delete their own posts
DROP POLICY IF EXISTS "posts_insert" ON community_posts;
DROP POLICY IF EXISTS "posts_update" ON community_posts;
DROP POLICY IF EXISTS "posts_delete" ON community_posts;

-- Keep permissive select (everyone can read posts)
-- posts_select already exists as permissive

-- Authenticated insert: user_id must match auth.uid()
CREATE POLICY "posts_insert_authenticated" ON community_posts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authenticated update: only own posts
CREATE POLICY "posts_update_authenticated" ON community_posts
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated delete: only own posts
CREATE POLICY "posts_delete_authenticated" ON community_posts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- community_profiles: authenticated users manage their own profile
DROP POLICY IF EXISTS "profiles_insert" ON community_profiles;
DROP POLICY IF EXISTS "profiles_update" ON community_profiles;

CREATE POLICY "profiles_insert_authenticated" ON community_profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "profiles_update_authenticated" ON community_profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Keep permissive select on profiles (needed for display names)
-- profiles_select already exists
