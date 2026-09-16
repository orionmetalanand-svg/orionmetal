import { company } from "./company";

/** Production canonical origin (www, no trailing slash). */
export const CANONICAL_ORIGIN = "https://www.orionmetalindustries.com.au";

function normalizeOrigin(raw) {
  const trimmed = (raw || CANONICAL_ORIGIN).trim().replace(/\/+$/, "");
  if (trimmed === "https://orionmetalindustries.com.au") {
    return CANONICAL_ORIGIN;
  }
  return trimmed || CANONICAL_ORIGIN;
}

export const siteConfig = {
  url: normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  name: company.name,
  defaultTitle: `${company.shortName} | Sheet Metal Fabrication Moorabbin Melbourne`,
  defaultDescription:
    "Orion Metal Industries Pty Ltd — precision laser cutting, sheet metal bending, fabrication, powder coating and custom assembly in Moorabbin, Melbourne, Victoria. Commercial and industrial sheet metal fabrication.",
  locale: "en_AU",
  keywords: [
    "sheet metal fabrication Moorabbin",
    "sheet metal fabrication Melbourne",
    "laser cutting Moorabbin",
    "laser cutting Melbourne",
    "metal fabrication Melbourne",
    "sheet metal bending Melbourne",
    "powder coating Melbourne",
    "custom metal fabrication Melbourne",
    "industrial sheet metal fabrication Victoria",
  ],
};

export function absoluteUrl(path = "/") {
  if (!path || path === "/") {
    return `${siteConfig.url}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

export const pageSeo = {
  home: {
    title: "Precision Sheet Metal Fabrication | Moorabbin Melbourne",
    description:
      "Orion Metal Industries — precision laser cutting, bending, fabrication, powder coating and custom assembly for commercial and industrial clients in Moorabbin, Melbourne, Victoria.",
    path: "/",
  },
  about: {
    title: "About Us | Precision Metal Engineering Moorabbin",
    description:
      "Learn about Orion Metal Industries Pty Ltd — precision metal engineering and manufacturing in Moorabbin, Victoria. Quality workmanship, modern equipment, and commercial focus.",
    path: "/about",
  },
  services: {
    title: "Sheet Metal Services | Laser Cutting, Bending, Powder Coating Melbourne",
    description:
      "Professional sheet metal services in Moorabbin: precision laser cutting, sheet metal bending, metal fabrication, powder coating and custom assembly for commercial and industrial applications.",
    path: "/services",
  },
  products: {
    title: "Products & Capabilities | Custom Metal Fabrication Melbourne",
    description:
      "Explore Orion Metal Industries' product capabilities — digital kiosk housings, electronic enclosures, architectural metalwork and custom fabricated components.",
    path: "/products",
  },
  projects: {
    title: "Projects Gallery | Sheet Metal Fabrication Work",
    description:
      "View fabrication projects showcasing laser cutting, powder coating, architectural metalwork and custom assembly capabilities from Orion Metal Industries.",
    path: "/projects",
  },
  industries: {
    title: "Industries Served | Commercial & Industrial Fabrication",
    description:
      "Orion Metal Industries serves commercial, industrial, manufacturing, construction and engineering sectors with precision sheet metal fabrication in Melbourne.",
    path: "/industries",
  },
  contact: {
    title: "Contact & Request a Quote | Moorabbin VIC",
    description:
      "Contact Orion Metal Industries in Moorabbin, Victoria. Request a quote for laser cutting, bending, fabrication, powder coating or custom assembly. Upload drawings and specifications.",
    path: "/contact",
  },
  blog: {
    title: "Blog | Sheet Metal Fabrication Insights Melbourne",
    description:
      "Expert articles on sheet metal fabrication, laser cutting, powder coating, and commercial metal manufacturing in Moorabbin and Melbourne, Victoria.",
    path: "/blog",
  },
  privacy: {
    title: "Privacy Policy",
    description: "Privacy policy for Orion Metal Industries Pty Ltd website.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Use",
    description: "Terms of use for Orion Metal Industries Pty Ltd website.",
    path: "/terms",
  },
};

export function getPageMetadata(pageKey) {
  const page = pageSeo[pageKey];
  if (!page) return {};

  const url = absoluteUrl(page.path);
  const ogTitle = `${page.title} | ${company.shortName}`;

  return {
    title: page.title,
    description: page.description,
    keywords: siteConfig.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description: page.description,
      url,
      siteName: company.name,
      locale: siteConfig.locale,
      type: "website",
      // Preview image comes from src/app/opengraph-image.js (file convention).
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: page.description,
    },
  };
}

/** Static routes included in sitemap.xml (keys of pageSeo). */
export function getStaticSitemapPages() {
  return Object.values(pageSeo);
}
