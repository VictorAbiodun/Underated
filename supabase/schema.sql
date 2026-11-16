create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  handle text unique not null,
  title text not null,
  price_ngn integer not null,
  details text,
  collection text not null default 'new',
  images text[] not null default '{}',
  sizes jsonb not null default '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}',
  created_at timestamptz not null default now()
);
create table if not exists editorial (id serial primary key, url text not null, sort int not null default 0);
alter table products enable row level security;
alter table editorial enable row level security;
create policy "public read products" on products for select using (true);
create policy "public read editorial" on editorial for select using (true);
insert into products (handle,title,price_ngn,details,collection) values
 ('core-logo-tee','Core Logo Tee',45000,'Heavyweight cotton, oversized fit.','new'),
 ('acid-wash-hoodie','Acid Wash Hoodie',78000,'Garment-dyed fleece, boxy fit.','new'),
 ('cargo-pants','Cargo Pants',65000,'Relaxed cargo cut, six pockets.','new');
-- Upload images to a public Storage bucket, then put the public URLs into products.images and editorial.url
