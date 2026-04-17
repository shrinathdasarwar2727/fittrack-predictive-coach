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

create table if not exists public.fittrack_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  age integer not null default 0,
  height_cm numeric not null default 0,
  current_weight numeric not null default 0,
  gender text not null default 'male',
  goal_weight numeric not null default 0,
  weekly_workout_target integer not null default 0,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.fittrack_workouts (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  date text not null,
  type text not null,
  amount numeric not null default 0,
  sets integer not null default 1,
  unit text not null default 'min',
  duration_min numeric not null default 0,
  calories_burned numeric not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.fittrack_food_logs (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  date text not null,
  meal text not null,
  calories_consumed numeric not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.fittrack_weight_history (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  date text not null,
  weight numeric not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.fittrack_user_data enable row level security;
alter table public.fittrack_profiles enable row level security;
alter table public.fittrack_workouts enable row level security;
alter table public.fittrack_food_logs enable row level security;
alter table public.fittrack_weight_history enable row level security;

drop policy if exists users_can_select_own_data on public.fittrack_user_data;
drop policy if exists users_can_insert_own_data on public.fittrack_user_data;
drop policy if exists users_can_update_own_data on public.fittrack_user_data;

drop policy if exists users_can_select_own_profiles on public.fittrack_profiles;
drop policy if exists users_can_upsert_own_profiles on public.fittrack_profiles;

drop policy if exists users_can_select_own_workouts on public.fittrack_workouts;
drop policy if exists users_can_insert_own_workouts on public.fittrack_workouts;
drop policy if exists users_can_update_own_workouts on public.fittrack_workouts;
drop policy if exists users_can_delete_own_workouts on public.fittrack_workouts;

drop policy if exists users_can_select_own_food_logs on public.fittrack_food_logs;
drop policy if exists users_can_insert_own_food_logs on public.fittrack_food_logs;
drop policy if exists users_can_update_own_food_logs on public.fittrack_food_logs;
drop policy if exists users_can_delete_own_food_logs on public.fittrack_food_logs;

drop policy if exists users_can_select_own_weight_history on public.fittrack_weight_history;
drop policy if exists users_can_insert_own_weight_history on public.fittrack_weight_history;
drop policy if exists users_can_update_own_weight_history on public.fittrack_weight_history;
drop policy if exists users_can_delete_own_weight_history on public.fittrack_weight_history;

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

create policy "users_can_select_own_profiles"
on public.fittrack_profiles
for select
using (auth.uid() = user_id);

create policy "users_can_upsert_own_profiles"
on public.fittrack_profiles
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_can_select_own_workouts"
on public.fittrack_workouts
for select
using (auth.uid() = user_id);

create policy "users_can_insert_own_workouts"
on public.fittrack_workouts
for insert
with check (auth.uid() = user_id);

create policy "users_can_update_own_workouts"
on public.fittrack_workouts
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_can_delete_own_workouts"
on public.fittrack_workouts
for delete
using (auth.uid() = user_id);

create policy "users_can_select_own_food_logs"
on public.fittrack_food_logs
for select
using (auth.uid() = user_id);

create policy "users_can_insert_own_food_logs"
on public.fittrack_food_logs
for insert
with check (auth.uid() = user_id);

create policy "users_can_update_own_food_logs"
on public.fittrack_food_logs
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_can_delete_own_food_logs"
on public.fittrack_food_logs
for delete
using (auth.uid() = user_id);

create policy "users_can_select_own_weight_history"
on public.fittrack_weight_history
for select
using (auth.uid() = user_id);

create policy "users_can_insert_own_weight_history"
on public.fittrack_weight_history
for insert
with check (auth.uid() = user_id);

create policy "users_can_update_own_weight_history"
on public.fittrack_weight_history
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_can_delete_own_weight_history"
on public.fittrack_weight_history
for delete
using (auth.uid() = user_id);

grant usage on schema public to authenticated;
grant select, insert, update on public.fittrack_user_data to authenticated;
grant select, insert, update on public.fittrack_profiles to authenticated;
grant select, insert, update, delete on public.fittrack_workouts to authenticated;
grant select, insert, update, delete on public.fittrack_food_logs to authenticated;
grant select, insert, update, delete on public.fittrack_weight_history to authenticated;
```

## 4) Enable Email Auth
- Go to Authentication > Providers.
- Enable Email provider.
- If you want instant testing, disable "Confirm email" in Auth settings.

## 5) Use in App
- Open Settings > Account & Cloud Sync.
- Sign up or sign in with email + password.
- After login, all profile, workouts, food logs, and weight data sync to database.
- You can view row-by-row data in:
  - `public.fittrack_profiles`
  - `public.fittrack_workouts`
  - `public.fittrack_food_logs`
  - `public.fittrack_weight_history`
