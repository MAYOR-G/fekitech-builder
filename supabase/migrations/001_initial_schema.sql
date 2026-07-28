-- FekiTech Builder — Supabase initial migration
-- This migration creates all tables, indexes, constraints, and RLS policies
-- required to replace Prisma/better-auth with Supabase Auth + Postgres.
--
-- Run via: Supabase Dashboard → SQL Editor → paste & run
-- Or via:  supabase db push (if using Supabase CLI locally)

-- ═══════════════════════════════════════════════════════════
-- 1. EXTENSIONS
-- ═══════════════════════════════════════════════════════════
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ═══════════════════════════════════════════════════════════
-- 2. PROFILES (linked to auth.users via trigger)
-- ═══════════════════════════════════════════════════════════
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  name         text not null default '',
  avatar_url   text,
  role         text not null default 'user' check (role in ('user', 'admin')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create unique index profiles_email_idx on public.profiles(email);
create index profiles_role_idx on public.profiles(role);

-- Auto-create profile row when a user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', null)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ═══════════════════════════════════════════════════════════
-- 3. PROJECTS
-- ═══════════════════════════════════════════════════════════
create table public.projects (
  id                                  text primary key default gen_random_uuid()::text,
  name                                text not null,
  user_id                             uuid not null references public.profiles(id) on delete cascade,
  template_id                         text not null,
  subdomain                           text unique,
  custom_domain                       text unique,
  custom_domain_verified_at           timestamptz,
  custom_domain_verification_token_hash text,
  is_published                        boolean not null default false,
  published_at                        timestamptz,
  editable_data                       jsonb not null default '{}'::jsonb,
  data_version                        int not null default 1,
  published_version_id                text unique,
  created_at                          timestamptz not null default now(),
  updated_at                          timestamptz not null default now()
);

create index projects_user_id_updated_idx on public.projects(user_id, updated_at desc);
create index projects_published_subdomain_idx on public.projects(is_published, subdomain) where is_published = true;
create index projects_published_custom_domain_idx on public.projects(is_published, custom_domain) where is_published = true;

-- ═══════════════════════════════════════════════════════════
-- 4. TEMPLATE VERSIONS (save history & publish snapshots)
-- ═══════════════════════════════════════════════════════════
create table public.template_versions (
  id                 text primary key default gen_random_uuid()::text,
  project_id         text not null references public.projects(id) on delete cascade,
  version_name       text not null,
  editable_data      jsonb not null,
  data_version       int not null default 1,
  is_publish_snapshot boolean not null default false,
  created_at         timestamptz not null default now(),
  published_at       timestamptz
);

create index template_versions_project_created_idx on public.template_versions(project_id, created_at desc);
create index template_versions_project_snapshot_idx on public.template_versions(project_id, is_publish_snapshot, created_at desc);

-- Add FK from projects.published_version_id → template_versions.id
alter table public.projects
  add constraint projects_published_version_fk
  foreign key (published_version_id)
  references public.template_versions(id)
  on delete set null;

-- ═══════════════════════════════════════════════════════════
-- 5. SUBSCRIPTIONS
-- ═══════════════════════════════════════════════════════════
create table public.subscriptions (
  id                         text primary key default gen_random_uuid()::text,
  user_id                    uuid not null references public.profiles(id) on delete cascade,
  plan_id                    text not null,
  status                     text not null,
  source                     text not null default 'payment',
  provider                   text,
  provider_customer_id       text,
  provider_subscription_id   text unique,
  current_period_end         timestamptz,
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now(),
  unique (user_id, source)
);

create index subscriptions_user_status_idx on public.subscriptions(user_id, status, current_period_end);

-- ═══════════════════════════════════════════════════════════
-- 6. PAYMENTS
-- ═══════════════════════════════════════════════════════════
create table public.payments (
  id                  text primary key default gen_random_uuid()::text,
  user_id             uuid not null references public.profiles(id) on delete cascade,
  amount_minor        int not null,
  currency            text not null,
  status              text not null,
  provider            text not null,
  provider_payment_id text unique,
  idempotency_key     text unique,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index payments_user_created_idx on public.payments(user_id, created_at desc);
create index payments_status_created_idx on public.payments(status, created_at desc);

-- ═══════════════════════════════════════════════════════════
-- 7. ASSETS
-- ═══════════════════════════════════════════════════════════
create table public.assets (
  id            text primary key default gen_random_uuid()::text,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  project_id    text not null references public.projects(id) on delete cascade,
  storage_key   text unique not null,
  original_name text not null,
  mime_type     text not null,
  byte_size     int not null,
  width         int,
  height        int,
  created_at    timestamptz not null default now(),
  deleted_at    timestamptz
);

create index assets_user_created_idx on public.assets(user_id, created_at desc);
create index assets_project_created_idx on public.assets(project_id, created_at desc);

-- ═══════════════════════════════════════════════════════════
-- 8. SUBDOMAIN RESERVATIONS
-- ═══════════════════════════════════════════════════════════
create table public.subdomain_reservations (
  subdomain   text primary key,
  user_id     uuid,
  project_id  text,
  reserved_at timestamptz not null default now(),
  released_at timestamptz
);

create index subdomain_reservations_project_idx on public.subdomain_reservations(project_id);
create index subdomain_reservations_released_idx on public.subdomain_reservations(released_at);

-- ═══════════════════════════════════════════════════════════
-- 9. ACTIVITY LOGS
-- ═══════════════════════════════════════════════════════════
create table public.activity_logs (
  id         text primary key default gen_random_uuid()::text,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  action     text not null,
  details    text,
  created_at timestamptz not null default now()
);

create index activity_logs_user_created_idx on public.activity_logs(user_id, created_at desc);
create index activity_logs_action_created_idx on public.activity_logs(action, created_at desc);

-- ═══════════════════════════════════════════════════════════
-- 10. RATE LIMITS (application-level, server-side only)
-- ═══════════════════════════════════════════════════════════
create table public.rate_limits (
  id           text primary key default gen_random_uuid()::text,
  key          text unique not null,
  count        int not null default 0,
  last_request bigint not null
);

create index rate_limits_last_request_idx on public.rate_limits(last_request);

-- ═══════════════════════════════════════════════════════════
-- 11. UPDATED_AT TRIGGER FUNCTION
-- ═══════════════════════════════════════════════════════════
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply auto-update trigger to all tables with updated_at
create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger set_projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();
create trigger set_subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();
create trigger set_payments_updated_at before update on public.payments
  for each row execute function public.set_updated_at();

-- ═══════════════════════════════════════════════════════════
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ═══════════════════════════════════════════════════════════

-- --- Profiles ---
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- --- Projects ---
alter table public.projects enable row level security;

create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can create own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- Public read access for published projects (for live sites)
create policy "Public can view published projects"
  on public.projects for select
  using (is_published = true);

-- --- Template Versions ---
alter table public.template_versions enable row level security;

create policy "Users can manage own project versions"
  on public.template_versions for all
  using (
    exists (
      select 1 from public.projects
      where projects.id = template_versions.project_id
        and projects.user_id = auth.uid()
    )
  );

-- Public read for published version snapshots
create policy "Public can view published snapshots"
  on public.template_versions for select
  using (
    is_publish_snapshot = true
    and exists (
      select 1 from public.projects
      where projects.published_version_id = template_versions.id
        and projects.is_published = true
    )
  );

-- --- Subscriptions ---
alter table public.subscriptions enable row level security;

create policy "Users can view own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only server (service_role) can insert/update/delete subscriptions

-- --- Payments ---
alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

-- Only server (service_role) can insert/update/delete payments

-- --- Assets ---
alter table public.assets enable row level security;

create policy "Users can view own assets"
  on public.assets for select
  using (auth.uid() = user_id);

create policy "Users can create own assets"
  on public.assets for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own assets"
  on public.assets for delete
  using (auth.uid() = user_id);

-- Public read for assets in published projects
create policy "Public can view published assets"
  on public.assets for select
  using (
    exists (
      select 1 from public.projects
      where projects.id = assets.project_id
        and projects.is_published = true
    )
  );

-- --- Subdomain Reservations ---
alter table public.subdomain_reservations enable row level security;

create policy "Users can view own reservations"
  on public.subdomain_reservations for select
  using (auth.uid() = user_id);

-- Only server (service_role) manages reservations

-- --- Activity Logs ---
alter table public.activity_logs enable row level security;

create policy "Users can view own activity"
  on public.activity_logs for select
  using (auth.uid() = user_id);

-- Only server (service_role) can insert activity logs

-- --- Rate Limits ---
alter table public.rate_limits enable row level security;
-- Rate limits are server-only, no user access needed
