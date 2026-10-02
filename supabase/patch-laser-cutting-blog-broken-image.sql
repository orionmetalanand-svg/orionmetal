-- Fix broken Unsplash URL (404) in laser-cutting-melbourne-guide body.
-- Run in Supabase SQL Editor after deploy if live post content came from DB.

UPDATE blog_posts
SET content = REPLACE(
  content,
  'https://images.unsplash.com/photo-1764115424793-063c2a8b61f8?auto=format&fit=crop&w=1600&q=80',
  '/images/services/laser-cutting-steel-flanges.jpeg'
)
WHERE slug = 'laser-cutting-melbourne-guide'
  AND content LIKE '%1764115424793%';
