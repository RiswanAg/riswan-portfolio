-- Guestbook for the portfolio contact section.
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query).
-- The site talks to Supabase only from the server (app/api/guestbook/route.ts)
-- with the service role key, so the table is locked to everyone else.

create table if not exists public.guestbook_entries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 40),
  message     text not null check (char_length(message) between 1 and 500),
  avatar_url  text,
  hidden      boolean not null default false,  -- set true to hide a comment
  created_at  timestamptz not null default now()
);

create index if not exists guestbook_entries_created_at_idx
  on public.guestbook_entries (created_at desc);

-- Row Level Security on, with no policies: the anon/public keys can't read
-- or write. The service role used by the API route bypasses RLS.
alter table public.guestbook_entries enable row level security;

-- Public bucket for optional profile photos (1 MB, images only).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('guestbook-avatars', 'guestbook-avatars', true, 1048576, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
