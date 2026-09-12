-- ============================================================
-- Orion Metal Industries — Supabase Schema
-- Run this entire script in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ────────────────────────────────────────────────────────────
-- PRODUCTS (update regularly via Supabase Table Editor or CMS)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  application TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- BLOG POSTS (SEO content — publish when ready)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author TEXT DEFAULT 'Orion Metal Industries',
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- TRUSTED CUSTOMERS (replace placeholder data with real logos)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trusted_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  logo_url TEXT,
  website_url TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- GOOGLE REVIEWS (add real review_url + include_in_schema when live)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS google_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  review_date DATE,
  google_review_url TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  include_in_schema BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGER
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (public read for published content)
-- ────────────────────────────────────────────────────────────
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE trusted_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published products" ON products;
CREATE POLICY "Public read published products"
  ON products FOR SELECT
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Public read published blog posts" ON blog_posts;
CREATE POLICY "Public read published blog posts"
  ON blog_posts FOR SELECT
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Public read published customers" ON trusted_customers;
CREATE POLICY "Public read published customers"
  ON trusted_customers FOR SELECT
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Public read published reviews" ON google_reviews;
CREATE POLICY "Public read published reviews"
  ON google_reviews FOR SELECT
  USING (is_published = TRUE);

-- ────────────────────────────────────────────────────────────
-- API GRANTS (required for anon key / website reads)
-- ────────────────────────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;
GRANT SELECT ON blog_posts TO anon, authenticated;
GRANT SELECT ON trusted_customers TO anon, authenticated;
GRANT SELECT ON google_reviews TO anon, authenticated;

-- ────────────────────────────────────────────────────────────
-- SEED: PRODUCTS
-- ────────────────────────────────────────────────────────────
INSERT INTO products (slug, name, description, application, image_url, category, sort_order, meta_title, meta_description) VALUES
(
  'digital-kiosk-housing',
  'Digital Kiosk Housing',
  'Custom-fabricated metal housings for digital wayfinding and information kiosks. Precision-cut panels with powder-coated finishes and integrated screen mounting.',
  'Commercial buildings, retail centres, public spaces',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
  'Commercial Enclosures',
  1,
  'Digital Kiosk Housing | Custom Metal Fabrication Melbourne',
  'Custom digital kiosk and wayfinding housings fabricated by Orion Metal Industries in Moorabbin, Melbourne.'
),
(
  'electronic-enclosure',
  'Electronic Enclosure Assembly',
  'Fully assembled metal enclosures with integrated power distribution, cable routing, and hinged access panels for commercial equipment.',
  'Industrial and commercial electronics',
  '/images/products/electronic-enclosure-assembly.jpeg',
  'Industrial Enclosures',
  2,
  'Electronic Enclosure Assembly | Sheet Metal Fabrication Melbourne',
  'Custom electronic enclosure assembly and metal fabrication services in Moorabbin, Victoria.'
),
(
  'architectural-lighting',
  'Architectural Lighting Enclosure',
  'Precision laser-cut and powder-coated channel housings for architectural lighting applications with custom oval cutouts and mounting features.',
  'Commercial and architectural lighting',
  '/images/products/architectural-lighting-enclosure.jpeg',
  'Architectural Metalwork',
  3,
  'Architectural Lighting Enclosures | Laser Cutting Melbourne',
  'Precision laser-cut architectural lighting enclosures from Orion Metal Industries, Moorabbin.'
),
(
  'custom-cabinet',
  'Custom Metal Cabinet',
  'Fabricated metal cabinets with laser-cut decorative door panels, powder-coated finish, and integrated hardware.',
  'Commercial storage and display',
  '/images/products/custom-cabinet-laser-cut-doors.jpeg',
  'Custom Fabrication',
  4,
  'Custom Metal Cabinets | Fabrication Moorabbin',
  'Custom metal cabinets with laser-cut panels and powder coating in Melbourne.'
),
(
  'fabricated-trough',
  'Custom Fabricated Trough',
  'Heavy-duty fabricated metal trough with precision laser-cut ventilation slots and interlocking tab-and-slot assembly.',
  'Industrial and commercial applications',
  '/images/products/custom-fabricated-trough.jpeg',
  'Industrial Fabrication',
  5,
  'Custom Fabricated Trough | Industrial Metal Fabrication',
  'Heavy-duty custom metal trough fabrication with laser cutting in Moorabbin, Melbourne.'
),
(
  'kiosk-pylon',
  'Wayfinding Pylon',
  'Slim-profile metal pylon housing for digital wayfinding displays with angled top design and professional powder-coated finish.',
  'Shopping centres, commercial precincts',
  '/images/products/wayfinding-pylon.jpeg',
  'Commercial Enclosures',
  6,
  'Wayfinding Pylon | Commercial Metal Fabrication Melbourne',
  'Custom wayfinding pylon housings for commercial and retail applications in Victoria.'
)
ON CONFLICT (slug) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- SEED: BLOG POSTS (published for SEO — edit content anytime)
-- ────────────────────────────────────────────────────────────
INSERT INTO blog_posts (slug, title, excerpt, content, cover_image_url, tags, meta_title, meta_description, is_published, published_at) VALUES
(
  'sheet-metal-fabrication-moorabbin-guide',
  'Sheet Metal Fabrication in Moorabbin: A Guide for Commercial Buyers',
  'What to look for when choosing a sheet metal fabrication partner in Moorabbin and Melbourne for commercial and industrial projects.',
  E'Choosing the right sheet metal fabrication partner is critical for commercial and industrial projects. Whether you need laser cutting, bending, powder coating, or full assembly, the quality of your fabricator directly affects project timelines, fit, and finish.\n\n## Location Matters for Melbourne Projects\n\nA Moorabbin-based fabricator offers convenient access for Melbourne and south-east Victoria clients. Local production reduces freight costs and simplifies site visits, drawing reviews, and quality inspections.\n\n## Key Capabilities to Evaluate\n\nWhen assessing a fabrication partner, consider:\n\n- **Laser cutting precision** — Can they handle your material thickness and tolerances?\n- **Bending and forming** — Press brake capacity for your profile requirements\n- **Powder coating** — In-house finishing for consistent, durable results\n- **Assembly** — Can they deliver finished, install-ready products?\n\n## Preparing Your Enquiry\n\nProvide clear drawings (PDF, DWG, DXF, or STEP), material specifications, quantities, and finish requirements. The more detail you provide upfront, the faster and more accurate your quote will be.\n\n## Orion Metal Industries\n\nBased at 1A Bibby Ct, Moorabbin VIC 3189, Orion Metal Industries provides precision laser cutting, sheet metal bending, fabrication, powder coating, and custom assembly for commercial and industrial clients across Melbourne and Victoria.',
  '/images/blog/sheet-metal-fabrication-moorabbin.jpeg',
  ARRAY['sheet metal fabrication', 'Moorabbin', 'Melbourne', 'commercial fabrication'],
  'Sheet Metal Fabrication Moorabbin Guide | Orion Metal Industries',
  'Guide to choosing sheet metal fabrication in Moorabbin and Melbourne. Laser cutting, bending, powder coating and assembly for commercial projects.',
  TRUE,
  NOW() - INTERVAL '14 days'
),
(
  'laser-cutting-melbourne-industrial-applications',
  'Laser Cutting in Melbourne: Industrial Applications and Benefits',
  'How precision laser cutting supports commercial and industrial manufacturing — applications, benefits, and when to use it.',
  E'Precision laser cutting has become essential for modern sheet metal fabrication. For commercial and industrial clients in Melbourne, laser cutting delivers accuracy, repeatability, and the ability to produce complex geometries efficiently.\n\n## Common Industrial Applications\n\n- Component profiles, brackets, and mounting plates\n- Ventilation panels and access cutouts\n- Enclosure panels with precise openings\n- Decorative and architectural screens\n- Signage and branding elements\n\n## Benefits of CNC Laser Cutting\n\nLaser cutting offers clean edge quality, minimal heat-affected zones on thin materials, and efficient nesting for batch production. Complex shapes that would require multiple operations with traditional methods can often be completed in a single pass.\n\n## Material Considerations\n\nLaser cutting handles a wide range of metals and thicknesses. Share your material specification and tolerance requirements when requesting a quote so your fabricator can confirm capability and recommend the best approach.\n\n## Getting a Quote\n\nContact Orion Metal Industries with your drawings and specifications. We provide precision laser cutting as part of our full fabrication service in Moorabbin, Melbourne.',
  '/images/services/laser-cutting-precision.jpeg',
  ARRAY['laser cutting', 'Melbourne', 'industrial', 'CNC cutting'],
  'Laser Cutting Melbourne | Industrial Applications | Orion Metal Industries',
  'Precision laser cutting for industrial and commercial applications in Melbourne. Benefits, applications and how to get a quote.',
  TRUE,
  NOW() - INTERVAL '7 days'
),
(
  'powder-coating-commercial-metal-fabrication',
  'Powder Coating for Commercial Metal Fabrication: What You Need to Know',
  'Why powder coating is the preferred finish for commercial metal fabrication — durability, appearance, and production efficiency.',
  E'Powder coating provides a durable, professional finish for fabricated metal components. For commercial and industrial applications, it protects against corrosion, improves appearance, and supports consistent batch production.\n\n## Why Choose Powder Coating\n\nUnlike wet paint, powder coating creates a uniform, tough finish that resists chipping, scratching, and fading. It is widely used for enclosures, frames, architectural metalwork, and industrial equipment panels.\n\n## Colour and Finish Options\n\nPowder coating is available in a wide range of colours and finishes — from matte to gloss, textured to smooth. Specify your colour code (e.g. Dulux or RAL reference) when ordering for accurate matching.\n\n## Integrated Fabrication Workflow\n\nChoosing a fabricator with in-house powder coating simplifies your supply chain. Components move from cutting and forming directly to finishing without external handling — reducing lead times and quality risks.\n\n## Orion Metal Industries\n\nOur Moorabbin facility provides integrated fabrication and powder coating for commercial and industrial clients across Melbourne and Victoria. Contact us to discuss your project requirements.',
  '/images/services/powder-coating-booth.jpeg',
  ARRAY['powder coating', 'Melbourne', 'metal fabrication', 'commercial'],
  'Powder Coating Melbourne | Commercial Metal Fabrication',
  'Powder coating for commercial metal fabrication in Melbourne. Durability, colour options and integrated fabrication at Orion Metal Industries.',
  TRUE,
  NOW() - INTERVAL '3 days'
)
ON CONFLICT (slug) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- SEED: TRUSTED CUSTOMERS (placeholder — replace with real data)
-- ────────────────────────────────────────────────────────────
INSERT INTO trusted_customers (name, industry, logo_url, website_url, sort_order) VALUES
('Metro Commercial Fit-Outs', 'Commercial Construction', NULL, NULL, 1),
('Victoria Industrial Group', 'Industrial Manufacturing', NULL, NULL, 2),
('South East Engineering Co.', 'Engineering', NULL, NULL, 3),
('Melbourne Retail Displays', 'Retail & Commercial', NULL, NULL, 4),
('Bay Side Electrical Services', 'Electrical & Enclosures', NULL, NULL, 5),
('Precision Build Victoria', 'Construction', NULL, NULL, 6);

-- ────────────────────────────────────────────────────────────
-- SEED: GOOGLE REVIEWS (placeholder — add google_review_url later)
-- Set include_in_schema = TRUE only when linking real Google reviews
-- ────────────────────────────────────────────────────────────
INSERT INTO google_reviews (reviewer_name, rating, review_text, review_date, google_review_url, include_in_schema, sort_order) VALUES
(
  'James M.',
  5,
  'Excellent quality on our custom metal enclosures. Precision was spot-on and delivery was on schedule. Highly recommend for commercial fabrication work.',
  '2025-11-15',
  NULL,
  FALSE,
  1
),
(
  'Sarah T.',
  5,
  'Orion handled our laser cutting and powder coating requirements professionally. Good communication throughout and competitive pricing for the quality delivered.',
  '2025-12-02',
  NULL,
  FALSE,
  2
),
(
  'David K.',
  5,
  'Used Orion for a custom fabrication project in Moorabbin. The team understood our specifications and delivered exactly what we needed. Will use again.',
  '2026-01-20',
  NULL,
  FALSE,
  3
),
(
  'Priya R.',
  4,
  'Good workmanship on our sheet metal bending and assembly job. Responsive service and fair turnaround time for our industrial project.',
  '2026-02-08',
  NULL,
  FALSE,
  4
),
(
  'Michael B.',
  5,
  'Professional fabrication shop. They processed our drawings quickly and the finished product met our commercial standards. Recommended for Melbourne industrial work.',
  '2026-03-01',
  NULL,
  FALSE,
  5
);

-- ────────────────────────────────────────────────────────────
-- INDEXES (performance for public queries)
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_published_sort ON products (is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_blog_published_date ON blog_posts (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_customers_published_sort ON trusted_customers (is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_reviews_published_sort ON google_reviews (is_published, sort_order);
