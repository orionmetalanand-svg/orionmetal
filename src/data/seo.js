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
    "Australian sheet metal fabricator in Moorabbin, Melbourne VIC. Laser cutting, bending, powder coating, kiosk enclosures and custom assembly for commercial clients across Victoria — not an international workshop.",
  locale: "en_AU",
  keywords: [
    "sheet metal fabrication Moorabbin",
    "sheet metal fabrication Melbourne",
    "sheet metal fabrication Victoria Australia",
    "laser cutting Moorabbin Melbourne",
    "laser cutting Melbourne",
    "metal fabrication Melbourne Australia",
    "sheet metal bending Melbourne",
    "powder coating Melbourne Moorabbin",
    "custom powder coating Melbourne",
    "custom metal enclosures Melbourne",
    "sheet metal enclosures Melbourne",
    "custom sheet metal enclosure fabrication Melbourne",
    "sheet metal enclosure fabrication Melbourne",
    "precision sheet metal services Melbourne",
    "kiosk housing Melbourne",
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
    title: "Sheet Metal Fabrication Moorabbin Melbourne VIC | Orion",
    description:
      "Custom sheet metal enclosure fabrication in Melbourne — Orion’s Moorabbin workshop (1A Bibby Ct VIC 3189). Laser cutting, bending, powder coating and assembly for Victoria, Australia.",
    path: "/",
  },
  about: {
    title: "About Us | Sheet Metal Fabricator Moorabbin Melbourne VIC",
    description:
      "Meet Orion Metal Industries — precision sheet metal services in Moorabbin, Melbourne. Laser cutting, bending, powder coating and enclosure fabrication for Victorian commercial clients.",
    path: "/about",
  },
  services: {
    title: "Sheet Metal Services Melbourne | Laser, Bending, Powder Coating VIC",
    description:
      "Sheet metal services in Moorabbin, Melbourne: laser cutting, press-brake bending, fabrication, powder coating and assembly. Serving Victoria, Australia.",
    path: "/services",
  },
  products: {
    title: "Custom Sheet Metal Enclosures Melbourne | Kiosk Products Moorabbin",
    description:
      "Sheet metal enclosures Melbourne — kiosk housings, wayfinding pylons and custom fabricated metal products, powder coated in Moorabbin VIC 3189 for Australian commercial clients.",
    path: "/products",
  },
  projects: {
    title: "Sheet Metal Fabrication Projects Moorabbin Melbourne VIC",
    description:
      "Melbourne and Moorabbin fabrication gallery — laser-cut parts, powder-coated frames, architectural metalwork and commercial assemblies from our Victorian workshop.",
    path: "/projects",
  },
  industries: {
    title: "Industries Served | Sheet Metal Fabrication Melbourne Victoria",
    description:
      "Sheet metal fabrication in Melbourne for commercial, industrial, manufacturing, construction and engineering clients across Victoria, Australia.",
    path: "/industries",
  },
  contact: {
    title: "Quote | Moorabbin Melbourne Workshop VIC 3189 Australia",
    description:
      "Request a fabrication quote from Orion Metal Industries, 1A Bibby Ct, Moorabbin VIC 3189, Australia. Australian customers — laser cutting, enclosures, powder coating.",
    path: "/contact",
  },
  blog: {
    title: "Fabrication Blog Melbourne | Moorabbin VIC Insights",
    description:
      "Guides on sheet metal fabrication, powder coating, wayfinding kiosks and laser cutting for Moorabbin, Melbourne and Victoria, Australia.",
    path: "/blog",
  },
  privacy: {
    title: "Privacy Policy | Orion Metal Industries Melbourne",
    description: "Privacy policy for Orion Metal Industries Pty Ltd, Moorabbin VIC, Australia.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Use | Orion Metal Industries Melbourne",
    description: "Terms of use for Orion Metal Industries Pty Ltd website, Australia.",
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
    alternates: {
      canonical: url,
      languages: {
        "en-AU": url,
        "x-default": url,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description: page.description,
      url,
      siteName: company.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: absoluteUrl("/images/services/cnc-laser-cutting-machine.jpeg"),
          width: 1600,
          height: 1067,
          alt: "CNC laser cutting at Orion Metal Industries, Moorabbin Melbourne",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: page.description,
      images: [absoluteUrl("/images/services/cnc-laser-cutting-machine.jpeg")],
    },
  };
}

/** Static routes included in sitemap.xml (keys of pageSeo). */
export function getStaticSitemapPages() {
  return Object.values(pageSeo);
}
