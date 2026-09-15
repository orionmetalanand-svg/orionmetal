/**
 * Canonical product image paths (kept in sync with src/data/products.js).
 * Used to override stale Supabase image_url values after deploys.
 */
import { products as fallbackProducts } from "@/data/products";

const bySlug = Object.fromEntries(fallbackProducts.map((p) => [p.id, p.image]));

/** Paths removed from the repo — never load these from Supabase. */
const REMOVED_ASSET_FRAGMENTS = ["wayfinding-pylon.jpeg"];

/**
 * Normalise DB or config paths for Next.js <Image /> (must be absolute site path or https URL).
 */
export function normalizePublicAssetPath(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/**
 * Resolve the image shown on product cards: code catalogue first, then sanitised DB URL.
 */
export function resolveProductImage(slug, imageUrlFromDb) {
  const fromCode = bySlug[slug];
  const fromDb = normalizePublicAssetPath(imageUrlFromDb);

  if (fromCode) {
    if (!fromDb) return fromCode;
    if (REMOVED_ASSET_FRAGMENTS.some((f) => fromDb.includes(f))) return fromCode;
    if (fromDb.includes("unsplash.com")) return fromCode;
    if (fromDb.startsWith("/images/") && fromDb !== fromCode) return fromCode;
  }

  return fromDb || fromCode || "/images/company/orion-logo.png";
}

/** Portrait kiosk render — use contain so the full unit is visible in landscape cards. */
export function productImageObjectFit(slug, src) {
  if (slug === "digital-kiosk-housing" || slug === "kiosk-pylon") return "object-contain";
  if (src?.includes("metalbody.png")) return "object-contain";
  return "object-cover";
}
