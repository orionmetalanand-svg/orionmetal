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
    "custom metal enclosures Melbourne",
    "custom sheet metal enclosure fabrication Melbourne",
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
      "Orion Metal Industries — Australian workshop at 1A Bibby Ct, Moorabbin VIC 3189. Laser cutting, bending, powder coating and custom enclosures for Melbourne and Victoria only.",
    path: "/",
  },
  about: {
    title: "About Orion | Sheet Metal Fabricator Moorabbin VIC Australia",
    description:
      "Orion Metal Industries Pty Ltd is a Moorabbin, Melbourne fabricator. Local laser cutting, bending, powder coating and assembly for Victorian commercial and industrial clients.",
    path: "/about",
  },
  services: {
    title: "Sheet Metal Services Melbourne | Laser, Bending, Powder Coating VIC",
    description:
      "Sheet metal services in Moorabbin, Melbourne: laser cutting, press-brake bending, fabrication, powder coating and assembly. Serving Victoria, Australia.",
    path: "/services",
  },
  products: {
    title: "Kiosk Enclosures & Metal Products | Fabricated in Melbourne VIC",
    description:
      "Digital kiosk housings, wayfinding pylons and custom metal enclosures fabricated and powder coated in Moorabbin, Melbourne, Australia.",
    path: "/products",
  },
  projects: {
    title: "Fabrication Projects Melbourne | Laser Cutting & Powder Coating VIC",
    description:
      "Melbourne and Moorabbin fabrication gallery — laser-cut parts, powder-coated frames, architectural metalwork and commercial assemblies from our Victorian workshop.",
    path: "/projects",
  },
  industries: {
    title: "Melbourne Industries | Commercial & Industrial Fabrication VIC",
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
