-- Run in Supabase SQL Editor if products already seeded with old kiosk images
UPDATE products SET image_url = '/images/products/metalbody.png'
WHERE slug = 'digital-kiosk-housing';

UPDATE products SET image_url = '/images/products/metalbody.png'
WHERE slug = 'kiosk-pylon';
