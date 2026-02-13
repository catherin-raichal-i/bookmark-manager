-- Create the bookmarks table
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table bookmarks enable row level security;

-- Policy: Users can view their own bookmarks
create policy "Users can view their own bookmarks"
  on bookmarks for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own bookmarks
create policy "Users can insert their own bookmarks"
  on bookmarks for insert
  with check (auth.uid() = user_id);

-- Policy: Users can delete their own bookmarks
create policy "Users can delete their own bookmarks"
  on bookmarks for delete
  using (auth.uid() = user_id);

-- Enable Realtime for the bookmarks table
-- This is crucial for the real-time subscriptions to work
alter publication supabase_realtime add table bookmarks;
