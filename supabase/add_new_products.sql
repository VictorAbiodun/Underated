-- SQL Migration to insert the 8 headline items into Supabase
-- Paste and run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hmxltymfcrdhpgnenwhk/sql

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
