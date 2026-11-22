-- =========================================================================
-- UNDERATED FULL DATABASE SYNC SCRIPT
-- Paste and run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hmxltymfcrdhpgnenwhk/sql
-- =========================================================================

-- 1. Ensure products table exists and has proper schema
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  handle text unique not null,
  title text not null,
  price_ngn integer not null,
  details text,
  collection text not null default 'tees',
  images text[] not null default '{}',
  sizes jsonb not null default '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}',
  created_at timestamptz not null default now()
);

-- 2. Ensure orders table exists and has all required fields
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  email text not null,
  name text not null,
  phone text not null,
  address text not null,
  state text not null default 'lagos',
  shipping_ngn integer not null default 3000,
  items jsonb not null,
  total_ngn integer not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- 3. Enable Row Level Security (RLS)
alter table products enable row level security;
alter table orders enable row level security;

-- Drop old policies to avoid duplicates
drop policy if exists "public read products" on products;
drop policy if exists "allow order creation" on orders;
drop policy if exists "allow read orders by service" on orders;

-- Public can read all products
create policy "public read products" on products for select using (true);

-- Allow server/anon to create orders during checkout
create policy "allow order creation" on orders for insert with check (true);

-- Allow reading orders (for admin / status check)
create policy "allow read orders by service" on orders for select using (true);

-- 4. Function to safely decrement stock when an order is paid
create or replace function decrement_stock(p_handle text, p_size text, p_qty int)
returns void as $$
begin
  update products
  set sizes = jsonb_set(
    sizes,
    array[p_size],
    to_jsonb(greatest(0, coalesce((sizes->>p_size)::int, 0) - p_qty))
  )
  where handle = p_handle;
end;
$$ language plpgsql security definer;

-- 5. Insert all 8 headline collection drop pieces
insert into products (handle, title, price_ngn, details, collection, images, sizes) values
(
  'underated-timeless-blue',
  'Timeless Tee (Blue)',
  48000,
  'Mineral wash indigo blue heavyweight 240 GSM cotton tee featuring signature airbrushed woman profile stipple graphic on chest and lower UNDERATED branding. Boxy streetwear drape.',
  'tees',
  array['/products/timeless-blue.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
),
(
  'underated-armed',
  'Armed Camo Tee',
  45000,
  'Heavyweight 240 GSM combed cotton tee in jet black featuring military woodland camouflage UNDERATED lettering across chest. Relaxed boxy streetwear fit as seen in the lookbook.',
  'tees',
  array['/products/armed-camo.webp', '/slide-7.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
),
(
  'underated-dangerous',
  'Dangerous Pink Camo Tee',
  45000,
  'Optic white heavyweight combed cotton tee with razor-sharp pink camo UNDERATED chest insignia. Signature boxy silhouette with reinforced ribbed collar as seen in the lookbook.',
  'tees',
  array['/products/dangerous-pink-camo.webp', '/slide-8.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
),
(
  'underated-state',
  'Underated State Tee',
  45000,
  'Jet black heavyweight 240 GSM cotton tee featuring distressed industrial block stencil UNDERATED lettering across chest. Clean essential streetwear staple.',
  'tees',
  array['/products/state-logo.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
),
(
  'underated-highway-piece',
  'Highway Piece Tee',
  48000,
  'Heavyweight boxy cotton tee featuring monumental architectural stipple artwork of the iconic Lekki-Ikoyi cable bridge with right sleeve RATED signature hit.',
  'tees',
  array['/products/highway-piece.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
),
(
  'underated-street-swag',
  'Street Swag Jersey',
  55000,
  'Sublimated technical mesh football jersey with knit polo collar, V-neck insert, URD badge, Lagos NG insignia, and FLY ASF / SWAG sleeve graphics.',
  'jerseys',
  array['/products/street-swag.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
),
(
  'underated-cuffs',
  'Underated Cuffs Longsleeve',
  52000,
  'Layered double-sleeve tee featuring heavy black tee body with gothic tribal UNDERATED chrome chest logo and contrast white long sleeves with full sleeve tribal graphics.',
  'longsleeves',
  array['/products/cuffs-longsleeve.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
),
(
  'underated-timeless-black',
  'Timeless Tee (Black)',
  48000,
  'Vintage washed charcoal black 240 GSM heavy combed cotton tee. Subtle acid wash patina with iconic airbrushed profile stipple graphics.',
  'tees',
  array['/products/timeless-black.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
)
on conflict (handle) do update set
  title = excluded.title,
  price_ngn = excluded.price_ngn,
  details = excluded.details,
  collection = excluded.collection,
  images = excluded.images,
  sizes = excluded.sizes;
