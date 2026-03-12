-- Community Schema for Body First
-- Run in Supabase SQL Editor

-- ── Profiles ──
create table if not exists community_profiles (
  id uuid primary key default gen_random_uuid(),
  anonymous_id text unique not null,
  nickname text not null,
  color text not null default '#14B8A6',
  platform text not null default 'web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Posts ──
create table if not exists community_posts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references community_profiles(id) on delete cascade,
  title text not null,
  body text not null,
  category text not null,
  medications text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Indexes ──
create index if not exists idx_posts_created_at on community_posts(created_at desc);
create index if not exists idx_posts_category on community_posts(category);
create index if not exists idx_posts_profile_id on community_posts(profile_id);
create index if not exists idx_profiles_anonymous_id on community_profiles(anonymous_id);

-- ── Updated-at triggers ──
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger trg_profiles_updated_at
  before update on community_profiles
  for each row execute function update_updated_at();

create or replace trigger trg_posts_updated_at
  before update on community_posts
  for each row execute function update_updated_at();

-- ── RLS ──
alter table community_profiles enable row level security;
alter table community_posts enable row level security;

-- Permissive policies for MVP (anon key, no auth)
create policy "profiles_select" on community_profiles for select using (true);
create policy "profiles_insert" on community_profiles for insert with check (true);
create policy "profiles_update" on community_profiles for update using (true);

create policy "posts_select" on community_posts for select using (true);
create policy "posts_insert" on community_posts for insert with check (true);
