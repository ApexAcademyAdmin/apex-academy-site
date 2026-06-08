-- ════════════════════════════════════════════════════════════════
-- Apex Academy Store — orders
-- Run in the Supabase SQL editor (project ref kssnethuvzqgunboulnd).
-- ════════════════════════════════════════════════════════════════

create table if not exists public.store_orders (
  id              uuid primary key default gen_random_uuid(),
  order_number    text unique not null,
  status          text not null default 'pending',  -- pending|paid|processing|fulfilled|shipped|delivered|cancelled|refunded
  email           text not null,
  customer_name   text not null,
  phone           text,
  items           jsonb not null,                    -- [{id,name,size,color,qty,unitCents}]
  subtotal_cents  integer not null,
  shipping_cents  integer not null default 0,
  tax_cents       integer not null default 0,
  total_cents     integer not null,
  shipping_method text not null default 'standard',
  shipping_address jsonb,                            -- {line1,line2,city,state,zip}
  paypal_order_id  text,
  paypal_capture_id text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists store_orders_status_idx on public.store_orders (status, created_at desc);
create index if not exists store_orders_email_idx  on public.store_orders (email);
create index if not exists store_orders_paypal_idx on public.store_orders (paypal_order_id);

-- RLS: locked down. The storefront writes/reads only via the service-role
-- key (server), which bypasses RLS. No public policies = no public access.
alter table public.store_orders enable row level security;

-- keep updated_at fresh
create or replace function public.touch_store_orders() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_touch_store_orders on public.store_orders;
create trigger trg_touch_store_orders before update on public.store_orders
  for each row execute function public.touch_store_orders();
