-- Publish: Custom Electrical Enclosures Melbourne blog.
-- Safe to re-run: ON CONFLICT (slug) DO UPDATE.

INSERT INTO blog_posts (
  slug, title, excerpt, content, cover_image_url,
  tags, meta_title, meta_description, is_published, published_at
)
VALUES (
  'custom-electrical-enclosures-melbourne',
  'Custom Electrical Enclosures Melbourne: Cabinets, Control Panels & Switchgear Housings',
  'How Melbourne electricians, OEMs and industrial buyers specify custom electrical enclosures — materials, apertures, cable entry, powder coating and what to send for a 24-hour quote from Moorabbin.',
  $post$Custom electrical enclosures protect switchgear, PLCs, distribution boards and site equipment. When a catalogue cabinet will not fit, you need a custom fabricated electrical enclosure built to your drawing.

Orion Metal Industries fabricates at 1A Bibby Ct, Moorabbin — south-east Melbourne — with laser cutting, bending, welding, in-house powder coating and assembly.

![Custom electrical sheet metal enclosure](/images/blog/custom-electrical-enclosure-1.webp)

## Common enclosure types

Main switchboards, PLC cabinets, motor control housings, outdoor electrical kiosks, metering enclosures and machine-mounted boxes.

## Fabrication process

Drawing review (24-hour quote), laser cutting, press brake bending, welding and hardware, in-house powder coating, dispatch across Melbourne and Victoria.

![Powder coated cabinet](/images/blog/custom-electrical-enclosure-2.jpg)

## Request a quote

[Contact us](/contact) or email info@orionmetalindustries.com.au. Related: [custom sheet metal enclosures](/blog/custom-sheet-metal-enclosures-melbourne) · [sheet metal bending Melbourne](/blog/sheet-metal-bending-pressing-melbourne-moorabbin).$post$,
  '/images/blog/custom-electrical-enclosure-1.webp',
  ARRAY['custom electrical enclosures Melbourne','electrical enclosure fabrication Melbourne','control panel enclosure Melbourne','switchboard enclosure Melbourne'],
  'Custom Electrical Enclosures Melbourne | 24-Hour Quotes',
  'Custom electrical enclosures in Moorabbin, south-east Melbourne — control panels, switchboards and cabinets laser cut, bent, welded and powder coated. Send drawings for a quote in 24 hours.',
  TRUE,
  '2026-10-17T00:00:00.000Z'
)
ON CONFLICT (slug) DO UPDATE SET
  title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, content=EXCLUDED.content,
  cover_image_url=EXCLUDED.cover_image_url, tags=EXCLUDED.tags,
  meta_title=EXCLUDED.meta_title, meta_description=EXCLUDED.meta_description,
  is_published=EXCLUDED.is_published, published_at=EXCLUDED.published_at;
