-- ═══════════════════════════════════════
-- Email delivery log
-- Run after 003_registrations.sql
-- ═══════════════════════════════════════
-- Audit trail of every transactional email send attempt. Written by the
-- service role from lib/email.ts (best-effort — failures here never break a
-- send). Open/click/bounce tracking would be added later via Resend webhooks.

create table if not exists public.email_logs (
  id uuid default gen_random_uuid() primary key,
  to_email text not null,
  subject text,
  template text,
  status text not null default 'sent' check (status in ('sent', 'failed', 'skipped')),
  provider_id text,        -- Resend message id
  error text,
  created_at timestamptz default now()
);

-- Locked down: only the service role (which bypasses RLS) reads/writes.
alter table public.email_logs enable row level security;

create index if not exists idx_email_logs_created_at on public.email_logs(created_at desc);
create index if not exists idx_email_logs_to on public.email_logs(to_email);
create index if not exists idx_email_logs_status on public.email_logs(status);
