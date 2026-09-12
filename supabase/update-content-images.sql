-- Run in Supabase SQL Editor after deploying new images to the site.
-- Updates product and blog cover URLs when content is loaded from Supabase.

UPDATE products
SET image_url = '/images/products/wayfinding-pylon.jpeg'
WHERE slug = 'kiosk-pylon';

UPDATE blog_posts
SET cover_image_url = '/images/blog/sheet-metal-fabrication-moorabbin.jpeg'
WHERE slug = 'sheet-metal-fabrication-moorabbin-guide';

UPDATE blog_posts
SET cover_image_url = '/images/services/powder-coating-booth.jpeg'
WHERE slug = 'powder-coating-commercial-metal-fabrication';
