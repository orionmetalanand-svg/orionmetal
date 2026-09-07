-- Run in Supabase SQL Editor if products already seeded with old kiosk images
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
WHERE slug = 'digital-kiosk-housing';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80'
WHERE slug = 'kiosk-pylon';
