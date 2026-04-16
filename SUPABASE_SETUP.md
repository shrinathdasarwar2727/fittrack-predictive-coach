# Supabase Setup for FitTrack

This app supports user login and cloud data sync using Supabase.

## 1) Create Supabase Project
- Open Supabase dashboard.
- Create a new project.
- In Project Settings > API, copy:
  - Project URL
  - anon public key

## 2) Configure Environment
Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Then restart the dev server.

## 3) Create Database Table
Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.fittrack_user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.fittrack_user_data enable row level security;

create policy "users_can_select_own_data"
on public.fittrack_user_data
for select
using (auth.uid() = user_id);

create policy "users_can_insert_own_data"
on public.fittrack_user_data
for insert
with check (auth.uid() = user_id);

create policy "users_can_update_own_data"
on public.fittrack_user_data
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

## 4) Enable Email Auth
- Go to Authentication > Providers.
- Enable Email provider.
- If you want instant testing, disable "Confirm email" in Auth settings.

## 5) Use in App
- Open Settings > Account & Cloud Sync.
- Sign up or sign in with email + password.
- After login, all profile, workouts, food logs, and weight data sync to database.
