create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  email text not null, name text not null, phone text not null, address text not null,
  items jsonb not null,
  total_ngn integer not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
-- RLS on with no policies: only the server (service role key) can read or write orders.
alter table orders enable row level security;
