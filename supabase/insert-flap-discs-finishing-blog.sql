-- Flap discs metal finishing blog.
INSERT INTO blog_posts (
  slug, title, excerpt, content, cover_image_url,
  tags, meta_title, meta_description, is_published, published_at
)
VALUES (
  'flap-discs-metal-finishing-fabrication',
  'How Industrial Flap Discs Improve Metal Finishing and Fabrication Results',
  'What flap discs do in a fabrication shop — weld blending, deburring and surface prep before powder coating — and how grit and backing affect enclosure and bracket quality.',
  $post$Industrial flap discs blend welds, remove laser burrs and prepare surfaces for powder coat. Grit and backing determine whether a door face stays flat or shows grind marks through gloss.

They sit after welding and before coating. They do not replace laser cutting or press brake accuracy.

Orion Metal Industries — Moorabbin VIC 3189. [Contact](/contact). Related: [benefits of sheet metal fabrication](/blog/benefits-of-sheet-metal-fabrication).$post$,
  '/images/services/metal-fabrication-welding.jpeg',
  ARRAY['flap discs metal finishing','metal fabrication finishing','weld blending sheet metal'],
  'Flap Discs in Metal Fabrication | Finishing Moorabbin Melbourne',
  'How industrial flap discs improve weld blending, deburring and powder-coat prep in sheet metal fabrication. Practical grit and backing notes from Orion Metal Industries, Moorabbin.',
  TRUE,
  '2026-11-06T00:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, content=EXCLUDED.content,
  cover_image_url=EXCLUDED.cover_image_url, tags=EXCLUDED.tags,
  meta_title=EXCLUDED.meta_title, meta_description=EXCLUDED.meta_description,
  is_published=EXCLUDED.is_published, published_at=EXCLUDED.published_at;
