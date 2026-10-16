-- Publish: Sheet Metal Bending & Pressing Melbourne blog.
-- Safe to re-run: ON CONFLICT (slug) DO UPDATE.

INSERT INTO blog_posts (
  slug, title, excerpt, content, cover_image_url,
  tags, meta_title, meta_description, is_published, published_at
)
VALUES (
  'sheet-metal-bending-pressing-melbourne-moorabbin',
  'Sheet Metal Bending & Pressing Melbourne: Press Brake Work in Moorabbin',
  'Press brake bending and sheet metal pressing for brackets, enclosures and channels — tolerances, materials and how to get a quote from our Moorabbin workshop.',
  $post$Sheet metal bending (pressing or folding) turns flat laser-cut blanks into brackets, enclosure bodies, channels and frames.

Orion Metal Industries — 1A Bibby Ct, Moorabbin VIC 3189 — press brake work integrated with laser cutting, welding and powder coating.

![Press brake bending](/images/blog/press-brake-sheet-metal1.jpg)

## Typical parts

Brackets, enclosure bodies, channels, kiosk frames and folded signage blanks.

![Press brake forming sheet metal](/images/blog/press-brake-sheet-metal2.jpg)

## Quote in 24 hours

Send DXF, DWG, STEP or PDF with material, thickness and quantity via [contact](/contact).

Related: [custom electrical enclosures](/blog/custom-electrical-enclosures-melbourne) · [laser cutting Melbourne](/blog/laser-cutting-melbourne-guide).$post$,
  '/images/blog/press-brake-sheet-metal1.jpg',
  ARRAY['sheet metal bending Melbourne','metal pressing Melbourne','press brake Moorabbin','sheet metal folding Melbourne'],
  'Sheet Metal Bending Melbourne | Press Brake Moorabbin',
  'Sheet metal bending and pressing in Moorabbin, south-east Melbourne — press brake work for brackets, enclosures and channels. Laser cutting and powder coating on site. 24-hour quotes.',
  TRUE,
  '2026-10-17T00:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, content=EXCLUDED.content,
  cover_image_url=EXCLUDED.cover_image_url, tags=EXCLUDED.tags,
  meta_title=EXCLUDED.meta_title, meta_description=EXCLUDED.meta_description,
  is_published=EXCLUDED.is_published, published_at=EXCLUDED.published_at;
