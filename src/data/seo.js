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
    title: "Sheet Metal Fabrication Moorabbin South-East Melbourne | Orion",
    description:
      "Full-service sheet metal fabricator in Moorabbin, south-east Melbourne (1A Bibby Ct VIC 3189). Custom enclosures, laser cutting, bending, in-house powder coating and assembly — quotes within 24 hours for Victoria.",
    path: "/",
  },
  about: {
    title: "About Us | Sheet Metal Fabricator Moorabbin Melbourne VIC",
    description:
      "Meet Orion Metal Industries — full-service sheet metal fabrication in Moorabbin, south-east Melbourne. Laser cutting, bending, in-house powder coating and assembly. Quotes within 24 hours.",
    path: "/about",
    /** Used for Open Graph / Twitter / Google thumbnail — real workshop, not stock cars */
    ogImage: "/images/company/outlook1.png",
    ogImageAlt: "Orion Metal Industries workshop at 1A Bibby Ct, Moorabbin VIC — sheet metal fabrication",
    ogImageWidth: 1200,
    ogImageHeight: 800,
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
    title: "Laser Cutting & Fabrication Blog Melbourne | Moorabbin VIC",
    description:
      "Technical guides on laser cutting, powder coating, sheet metal enclosures and wayfinding kiosks — from Orion Metal Industries, Moorabbin south-east Melbourne.",
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
  const ogTitle = page.title.includes(company.shortName)
    ? page.title
    : `${page.title} | ${company.shortName}`;
  const ogImagePath = page.ogImage || "/images/services/cnc-laser-cutting-machine.jpeg";
  const ogImageUrl = absoluteUrl(ogImagePath);
  const ogImageWidth = page.ogImageWidth || 1600;
  const ogImageHeight = page.ogImageHeight || 1067;
  const ogImageAlt =
    page.ogImageAlt ||
    "CNC laser cutting at Orion Metal Industries, Moorabbin Melbourne";

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
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: page.description,
      images: [ogImageUrl],
    },
  };
}

/** Static routes included in sitemap.xml (keys of pageSeo). */
export function getStaticSitemapPages() {
  return Object.values(pageSeo);
}
