import { company } from "@/data/company";
import { services } from "@/data/services";
import { siteConfig } from "@/data/seo";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: company.name,
    description: company.description,
    url: siteConfig.url,
    telephone: company.phone,
    email: company.email,
    image: `${siteConfig.url}/images/company/orion-logo.png`,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/images/company/orion-logo.png`,
      width: 1200,
      height: 573,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.suburb,
      addressRegion: company.address.state,
      postalCode: company.address.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.location.lat,
      longitude: company.location.lng,
    },
    areaServed: [
      { "@type": "City", name: "Moorabbin" },
      { "@type": "City", name: "Melbourne" },
      { "@type": "State", name: "Victoria" },
    ],
    priceRange: "$$",
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: company.name,
    description: siteConfig.defaultDescription,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function getServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "State",
      name: "Victoria",
    },
    serviceType: service.name,
  };
}

export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function getServicesListSchema() {
  return services.map((s) => getServiceSchema(s));
}

export function getArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `${siteConfig.url}${post.coverImage}` : undefined,
    author: {
      "@type": "Organization",
      name: post.author || company.name,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags?.join(", "),
  };
}

export function getReviewsSchema(reviews) {
  if (!reviews?.length) return null;

  const ratings = reviews.map((r) => r.rating);
  const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: company.name,
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.reviewerName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.reviewText,
      datePublished: r.reviewDate,
      url: r.googleReviewUrl,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Math.round(average * 10) / 10,
      reviewCount: reviews.length,
      bestRating: 5,
    },
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
