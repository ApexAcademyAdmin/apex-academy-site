-- ═══════════════════════════════════════
-- Dashboard & Profile Schema Updates
-- Run after initial schema.sql
-- ═══════════════════════════════════════
-- NOTE: teams.status keeps its existing values ('pending', 'active',
-- 'rejected') — the admin team-management UI and registration flow depend
-- on them. This migration is purely additive.

-- Add team bio and social fields
alter table public.teams add column if not exists team_bio text;
alter table public.teams add column if not exists team_photo_url text;
alter table public.teams add column if not exists social_instagram text;
alter table public.teams add column if not exists social_twitter text;
alter table public.teams add column if not exists social_website text;

-- User profiles — stores role and display info for all users
create table if not exists public.user_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid unique references auth.users(id) on delete cascade,
  role text not null default 'applicant' check (role in ('admin', 'commissioner', 'coach', 'player', 'family', 'applicant')),
  display_name text,
  email text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Player profiles — for Apex Academy players
create table if not exists public.player_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid unique references auth.users(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'approved', 'published')),

  -- Personal
  first_name text,
  last_name text,
  photo_url text,
  graduation_year text,
  school text,
  city text,
  state text default 'MA',
  date_of_birth date,

  -- Baseball
  primary_position text,
  secondary_position text,
  bats text check (bats in ('R', 'L', 'S')),
  throws text check (throws in ('R', 'L')),
  height text,
  weight text,
  jersey_number text,

  -- Metrics
  exit_velocity text,
  pitching_velocity text,
  sixty_yard text,
  pop_time text,
  infield_velocity text,
  outfield_velocity text,

  -- Media
  highlight_url text,
  social_instagram text,
  social_twitter text,

  -- Academic
  gpa text,
  sat_score text,
  act_score text,

  -- Recruiting
  recruiting_status text check (recruiting_status in ('uncommitted', 'committed', 'signed')),
  committed_school text,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS for user_profiles
alter table public.user_profiles enable row level security;

create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = user_id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = user_id);

create policy "Users can insert their own profile"
  on public.user_profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

-- RLS for player_profiles
alter table public.player_profiles enable row level security;

create policy "Published player profiles are public"
  on public.player_profiles for select
  using (status = 'published');

create policy "Players can view their own profile"
  on public.player_profiles for select
  using (auth.uid() = user_id);

create policy "Players can update their own profile"
  on public.player_profiles for update
  using (auth.uid() = user_id);

create policy "Players can insert their own profile"
  on public.player_profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Triggers
create trigger user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.update_updated_at();

create trigger player_profiles_updated_at
  before update on public.player_profiles
  for each row execute function public.update_updated_at();

-- Indexes
create index if not exists idx_player_profiles_user_id on public.player_profiles(user_id);
create index if not exists idx_player_profiles_team_id on public.player_profiles(team_id);
create index if not exists idx_player_profiles_status on public.player_profiles(status);
create index if not exists idx_user_profiles_user_id on public.user_profiles(user_id);
create index if not exists idx_user_profiles_role on public.user_profiles(role);
