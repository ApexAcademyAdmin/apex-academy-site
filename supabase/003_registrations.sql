-- ═══════════════════════════════════════
-- Team Registration — review workflow
-- Run after 002_dashboard.sql
-- ═══════════════════════════════════════
-- Reshapes teams.status into the registration review lifecycle and adds
-- the fields the admin review dashboard needs. Idempotent.

-- 1. Registration / review fields
alter table public.teams add column if not exists notes text;          -- coach-supplied note at registration
alter table public.teams add column if not exists admin_notes text;    -- internal league notes
alter table public.teams add column if not exists approved_at timestamptz;
alter table public.teams add column if not exists published_at timestamptz;

-- 2. Status lifecycle: pending_review -> needs_info -> approved -> published (or rejected)
--    Temporarily widen the constraint so we can migrate old values safely.
alter table public.teams drop constraint if exists teams_status_check;

update public.teams set status = 'pending_review' where status in ('pending', 'submitted', 'under_review');
update public.teams set status = 'published'      where status in ('active');

alter table public.teams alter column status set default 'pending_review';
alter table public.teams add constraint teams_status_check
  check (status in ('pending_review', 'needs_info', 'approved', 'rejected', 'published'));

-- 3. Age group is a free-text label (offered list is managed in the app:
--    src/lib/constants.ts AGE_GROUPS). Drop the rigid numeric check so the
--    offered divisions (e.g. Prospects, Premier) can change without a migration.
alter table public.teams drop constraint if exists teams_age_group_check;

-- 4. Public visibility now keys on 'published' (was 'active')
drop policy if exists "Active teams are visible to everyone" on public.teams;
drop policy if exists "Published teams are visible to everyone" on public.teams;
create policy "Published teams are visible to everyone"
  on public.teams for select
  using (status = 'published');

-- 5. Index for status filtering in the admin dashboard
create index if not exists idx_teams_status on public.teams(status);
