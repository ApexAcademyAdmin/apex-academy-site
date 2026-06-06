-- ═══════════════════════════════════════
-- Apex Academy League — Database Schema
-- ═══════════════════════════════════════

-- Teams table — core of the league system
-- Status: pending (registered, not visible) | active (admin approved, visible in league)
create table if not exists public.teams (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'active', 'rejected')),

  -- Division assignment (set by admin)
  age_group text check (age_group in ('10U', '12U', '14U', '16U', '18U')),
  division text check (division in ('Premier', 'Prospect')),

  -- Team info
  team_name text not null,
  org_name text not null,
  org_email text,
  org_website text,
  logo_url text,
  primary_color text default '#000000',
  secondary_color text default '#ffffff',

  -- Contact
  contact_name text not null,
  contact_email text not null,
  contact_phone text,

  -- Location
  city text,
  state text default 'MA',
  home_field text,
  home_field_address text,

  -- Roster & staff stored as JSON
  roster jsonb default '[]'::jsonb,
  coaches jsonb default '[]'::jsonb,

  -- Preferences
  preferred_days text[] default '{}',
  travel_limit text,
  special_requests text,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admin profiles — tracks which users are league admins
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin', 'commissioner')),
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.teams enable row level security;
alter table public.admin_profiles enable row level security;

-- Teams policies
-- Anyone can read active teams (public standings, schedules, etc.)
create policy "Active teams are visible to everyone"
  on public.teams for select
  using (status = 'active');

-- Team owner can read their own team regardless of status
create policy "Team owners can view their own team"
  on public.teams for select
  using (auth.uid() = user_id);

-- Team owner can update their own team
create policy "Team owners can update their own team"
  on public.teams for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Authenticated users can insert (register a team)
create policy "Authenticated users can register a team"
  on public.teams for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Admin policies
create policy "Admins can read admin_profiles"
  on public.admin_profiles for select
  using (auth.uid() = user_id);

-- Updated_at trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger teams_updated_at
  before update on public.teams
  for each row execute function public.update_updated_at();

-- Index for fast lookups
create index if not exists idx_teams_user_id on public.teams(user_id);
create index if not exists idx_teams_status on public.teams(status);
create index if not exists idx_teams_division on public.teams(age_group, division);
