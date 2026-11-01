-- Publish: Sheet metal fabrication Dandenong / south-east Melbourne blog.
-- Safe to re-run: ON CONFLICT (slug) DO UPDATE.

INSERT INTO blog_posts (
  slug, title, excerpt, content, cover_image_url,
  tags, meta_title, meta_description, is_published, published_at
)
VALUES (
  'sheet-metal-fabrication-dandenong-south-east-melbourne',
  'Sheet Metal Fabrication for Dandenong, Keysborough and Melbourne''s South-East',
  'Dandenong, Keysborough, Carrum Downs and Braeside manufacturers looking for laser cutting, bending and powder coating — how a Moorabbin full-service workshop covers the south-east corridor.',
  $post$If you search metal fabrication Dandenong or laser cutting Dandenong, you usually want cutting, bending and finishing close to the job.

Orion Metal Industries fabricates at 1A Bibby Ct, Moorabbin VIC 3189 — south-east Melbourne, a short run to Dandenong, Keysborough, Springvale, Braeside, Carrum Downs, Clayton and Cheltenham.

![Workshop](/images/blog/industrial-workshop-interior-metal.webp)

## Full-service under one roof

Laser cutting, press brake bending, welding, in-house powder coating and custom enclosures. Send DXF, DWG, STEP or PDF for a quote within 24 hours.

Related: [sheet metal fabrication near me](/blog/sheet-metal-fabrication-near-me-moorabbin) · [laser cutting Melbourne](/blog/laser-cutting-melbourne-guide).

**Orion Metal Industries Pty Ltd · 1A Bibby Ct, Moorabbin VIC 3189**$post$,
  '/images/blog/industrial-workshop-interior-metal.webp',
  ARRAY['metal fabrication Dandenong','laser cutting Dandenong','sheet metal fabrication south east Melbourne','sheet metal fabrication Keysborough'],
  'Sheet Metal Fabrication Dandenong | South-East Melbourne Moorabbin',
  'Sheet metal fabrication for Dandenong, Keysborough, Carrum Downs and Braeside — laser cutting, bending and powder coating from our Moorabbin workshop. Quotes within 24 hours.',
  TRUE,
  '2026-11-01T00:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, content=EXCLUDED.content,
  cover_image_url=EXCLUDED.cover_image_url, tags=EXCLUDED.tags,
  meta_title=EXCLUDED.meta_title, meta_description=EXCLUDED.meta_description,
  is_published=EXCLUDED.is_published, published_at=EXCLUDED.published_at;
