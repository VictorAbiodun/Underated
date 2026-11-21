-- Migration to insert and update all collection products to match the new shop design
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/hmxltymfcrdhpgnenwhk/sql)

-- 1. Insert Comic Burst Graphic Tee (Slide 6 model photo)
insert into products (handle, title, price_ngn, details, collection, images, sizes)
values (
  'comic-burst-tee',
  'Comic Burst Graphic Tee',
  48000,
  'Heavyweight 250 GSM premium cotton tee featuring high-density explosive comic UNDERATED graphics on chest. Drop shoulder oversized streetwear fit with reinforced ribbed collar.',
  'tees',
  array['/slide-6.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
)
on conflict (handle) do update set
  title = excluded.title,
  price_ngn = excluded.price_ngn,
  details = excluded.details,
  collection = excluded.collection,
  images = excluded.images,
  sizes = excluded.sizes;

-- 2. Insert Camo Boxy Tee (Slide 7 model photo)
insert into products (handle, title, price_ngn, details, collection, images, sizes)
values (
  'camo-logo-tee',
  'Camo Boxy Tee',
  45000,
  'Heavyweight 240 GSM combed cotton featuring vintage woodland camo UNDERATED lettering across chest. Relaxed boxy silhouette tailored for everyday streetwear wear.',
  'tees',
  array['/slide-7.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
)
on conflict (handle) do update set
  title = excluded.title,
  price_ngn = excluded.price_ngn,
  details = excluded.details,
  collection = excluded.collection,
  images = excluded.images,
  sizes = excluded.sizes;

-- 3. Insert Pink Camo Boxy Tee (Slide 8 model photo)
insert into products (handle, title, price_ngn, details, collection, images, sizes)
values (
  'pink-camo-tee',
  'Pink Camo Boxy Tee',
  45000,
  'Clean optic white tee with razor-sharp pink camo UNDERATED chest print. Signature boxy cut with reinforced collar and twin-needle hem stitching.',
  'tees',
  array['/slide-8.webp'],
  '{"XS":5,"S":5,"M":5,"L":5,"XL":5,"XXL":0}'::jsonb
)
on conflict (handle) do update set
  title = excluded.title,
  price_ngn = excluded.price_ngn,
  details = excluded.details,
  collection = excluded.collection,
  images = excluded.images,
  sizes = excluded.sizes;

-- 4. Ensure cargo-pants has image and proper collection
update products set 
  images = array['/editorial-streetwear.jpg'],
  collection = 'bottoms'
where handle = 'cargo-pants';

-- 5. Update hoodie collection
update products set 
  collection = 'hoodies'
where handle = 'acid-wash-hoodie';

-- 6. Update Star Burn Graphic Tee collection
update products set 
  collection = 'tees'
where handle = 'star-burn-tee';

-- 7. Update Core Logo Tee collection
update products set 
  collection = 'tees'
where handle = 'core-logo-tee';
