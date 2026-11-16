alter table orders add column if not exists state text, add column if not exists shipping_ngn integer not null default 0;
create table if not exists events (id serial primary key, title text not null, city text not null, date date not null, url text);
create table if not exists archives (id serial primary key, title text not null, year int not null, images text[] not null default '{}');
alter table events enable row level security; alter table archives enable row level security;
create policy "public read events" on events for select using (true);
create policy "public read archives" on archives for select using (true);
create or replace function decrement_stock(p_handle text, p_size text, p_qty int) returns void language sql as $$
  update products set sizes = jsonb_set(sizes, array[p_size], to_jsonb(greatest(coalesce((sizes->>p_size)::int,0) - p_qty, 0))) where handle = p_handle;
$$;
revoke execute on function decrement_stock(text,text,int) from public, anon, authenticated;
