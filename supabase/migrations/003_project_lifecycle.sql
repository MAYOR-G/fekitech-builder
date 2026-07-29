-- Track active, failed, and deleted project lifecycle states so plan limits
-- count only projects a user can still manage.

alter table public.projects
  add column if not exists status text not null default 'ready',
  add column if not exists deleted_at timestamptz,
  add constraint projects_status_check check (status in ('creating', 'ready', 'failed', 'deleted'));

create index if not exists projects_active_user_updated_idx
  on public.projects(user_id, updated_at desc)
  where deleted_at is null and status = 'ready';

drop policy if exists "Public can view published projects" on public.projects;
create policy "Public can view published projects"
  on public.projects for select
  using (is_published = true and deleted_at is null and status = 'ready');
