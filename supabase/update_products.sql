-- Insert the new Star Burn Graphic Tee
insert into products (handle, title, price_ngn, details, collection, images)
values (
  'star-burn-tee',
  'Star Burn Graphic Tee',
  48000,
  'Mineral wash black heavy cotton boxy tee. Features "To become a star, you must burn" celestial stipple graphic on front with signature star back print.',
  'new',
  array['/star-burn-tee.jpg']
)
on conflict (handle) do update set
  title = excluded.title,
  price_ngn = excluded.price_ngn,
  details = excluded.details,
  images = excluded.images;

-- Update images for existing products
update products set images = array['/hoodie-black.jpg'] where handle = 'acid-wash-hoodie';
update products set images = array['/graphic-tee.jpg'] where handle = 'core-logo-tee';

-- Add editorial image for homepage hero
insert into editorial (url, sort)
values ('/editorial-streetwear.jpg', 0)
on conflict do nothing;

