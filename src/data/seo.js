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
    "Full-service sheet metal fabricator in Moorabbin, south-east Melbourne VIC. Laser cutting, bending, in-house powder coating, kiosk enclosures and custom assembly under one roof — 24-hour quotes for Victorian commercial clients.",
  locale: "en_AU",
  keywords: [
    "sheet metal fabrication Moorabbin",
    "sheet metal fabrication Melbourne",
    "sheet metal fabrication south east Melbourne",
    "sheet metal fabrication Victoria Australia",
    "full service sheet metal fabrication Melbourne",
    "laser cutting Moorabbin Melbourne",
    "laser cutting south east Melbourne",
    "laser cutting Melbourne",
    "metal fabrication Melbourne Australia",
    "sheet metal bending Melbourne",
    "powder coating Melbourne Moorabbin",
    "custom powder coating Melbourne",
    "in-house powder coating Melbourne",
    "custom metal enclosures Melbourne",
    "sheet metal enclosures Melbourne",
    "custom sheet metal enclosure fabrication Melbourne",
    "sheet metal enclosure fabrication Melbourne",
    "precision sheet metal services Melbourne",
    "kiosk enclosure fabrication Melbourne",
    "kiosk housing Melbourne",
    "industrial sheet metal fabrication Victoria",
    "sheet metal fabrication 24 hour quote Melbourne",
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
    title: "Sheet Metal Services South-East Melbourne | Full-Service Fabrication VIC",
    description:
      "Laser cutting, press-brake bending, fabrication, in-house powder coating and assembly from our Moorabbin, south-east Melbourne workshop. 24-hour quotes for Victorian commercial clients.",
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
    title: "Get a Quote in 24 Hours | Sheet Metal Fabrication Moorabbin Melbourne",
    description:
      "Request a fabrication quote from Orion Metal Industries — 1A Bibby Ct, Moorabbin VIC 3189. 24-hour quotes for laser cutting, sheet metal enclosures and powder coating in south-east Melbourne.",
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
