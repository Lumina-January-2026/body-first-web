-- Community Schema for Body First (unified — mobile + web)
-- This is the REFERENCE schema. The canonical migration is 006_unify_community_schema.sql.
-- Run migrations in order, not this file directly.

-- ── Profiles ──
-- Links community display info (nickname/color) to auth.users identity.
-- user_id is nullable: existing anonymous profiles don't have one.
create table if not exists community_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  anonymous_id text unique,
  nickname text not null,
  color text not null default '#14B8A6',
  platform text not null default 'web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Posts ──
-- user_id is the primary author key (matches mobile app schema).
-- profile_id is legacy (old website posts) and nullable.
create table if not exists community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  profile_id uuid references community_profiles(id) on delete cascade,
  title text not null,
  body text not null,
  category text not null,
  topic text,
  medications text[] not null default '{}',
  image_url text,
  likes_count integer not null default 0,
  comments_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Indexes ──
create index if not exists idx_posts_created_at on community_posts(created_at desc);
create index if not exists idx_posts_category on community_posts(category);
create index if not exists idx_posts_user_id on community_posts(user_id);
create index if not exists idx_profiles_user_id on community_profiles(user_id) where user_id is not null;

-- ── Views ──
-- community_posts_public: mobile app view (strips user_id for anonymity)
-- community_posts_with_profiles: website view (joins profile display info)

-- ── RLS ──
alter table community_profiles enable row level security;
alter table community_posts enable row level security;

-- Everyone can read
create policy "profiles_select" on community_profiles for select using (true);
create policy "posts_select" on community_posts for select using (true);

-- Authenticated users manage their own data
create policy "profiles_insert_authenticated" on community_profiles
  for insert to authenticated with check (auth.uid() = user_id);
create policy "profiles_update_authenticated" on community_profiles
  for update to authenticated using (auth.uid() = user_id);
create policy "posts_insert_authenticated" on community_posts
  for insert to authenticated with check (auth.uid() = user_id);
create policy "posts_update_authenticated" on community_posts
  for update to authenticated using (auth.uid() = user_id);
create policy "posts_delete_authenticated" on community_posts
  for delete to authenticated using (auth.uid() = user_id);
