/**
 * Free stock imagery (Unsplash License — free for commercial use).
 * Used to elevate visual polish alongside Orion's own workshop photos.
 * Keep logo / unique product shots local; use stock for atmosphere & process.
 */
export const stock = {
  laserSparks: {
    src: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1920&q=80",
    alt: "Industrial laser cutting sparks on a metal sheet",
  },
  laserCnc: {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    alt: "CNC industrial machinery on a manufacturing floor",
  },
  pressBrake: {
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80",
    alt: "Precision metalworking tools and engineering equipment",
  },
  welding: {
    src: "https://images.unsplash.com/photo-1504917590102-4c5729f9d1d1?auto=format&fit=crop&w=1600&q=80",
    alt: "Industrial metal fabrication workshop",
  },
  weldingSparks: {
    src: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1600&q=80",
    alt: "Welding sparks during metal fabrication",
  },
  factoryFloor: {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern manufacturing workshop environment",
  },
  machining: {
    src: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=80",
    alt: "Industrial manufacturing facility",
  },
  steelStructure: {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80",
    alt: "Industrial steel and engineering environment",
  },
  warehouse: {
    src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=80",
    alt: "Industrial warehouse logistics and dispatch",
  },
  construction: {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    alt: "Commercial construction and structural steelwork",
  },
  architecture: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern commercial architecture",
  },
  engineering: {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
    alt: "Engineering and industrial production",
  },
  powderFinish: {
    src: "https://images.unsplash.com/photo-1565514020176-efe69048881b?auto=format&fit=crop&w=1600&q=80",
    alt: "Precision CNC machining and metal finishing",
  },
  metalSheets: {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1600&q=80",
    alt: "Stacked metal materials ready for fabrication",
  },
  industrialWorker: {
    src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=80",
    alt: "Industrial technician at work",
  },
  enclosure: {
    src: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern commercial digital display installation",
  },
  lighting: {
    src: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
    alt: "Architectural lighting in a commercial interior",
  },
  cabinet: {
    src: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1600&q=80",
    alt: "Custom commercial cabinet and joinery finish",
  },
  electronics: {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    alt: "Electronic components and circuit hardware",
  },
  commercialLobby: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern commercial lobby with integrated digital displays",
  },
  retailInterior: {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    alt: "Commercial retail interior with modern signage and displays",
  },
};

/**
 * Brand lockup assets, generated from the master artwork by
 * `scripts/build-logo-assets.mjs` (trimmed + dark-surface recolour).
 */
export const brand = {
  /** Original colours — for white / light surfaces and social previews. */
  logoDark: "/images/company/orion-logo.png",
  /** Wordmark recoloured to white — for the dark site chrome. */
  logoLight: "/images/company/orion-logo-light.png",
  logoWidth: 1200,
  logoHeight: 573,
};

/** Local Orion assets — unique product / brand photography */
export const local = {
  logo: brand.logoDark,
  flyer: "/images/company/orion-company-flyer.jpeg",
  heroFacility: "/images/hero/powder-coating-facility-hero.jpeg",
  products: {
    enclosure: "/images/products/electronic-enclosure-assembly.jpeg",
    lighting: "/images/products/architectural-lighting-enclosure.jpeg",
    cabinet: "/images/products/custom-cabinet-laser-cut-doors.jpeg",
    trough: "/images/products/custom-fabricated-trough.jpeg",
  },
};

export const externalImages = {
  heroFallback: stock.laserSparks,
  manufacturing: stock.factoryFloor,
  precision: stock.pressBrake,
};
