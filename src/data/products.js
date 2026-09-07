import { local, stock } from "@/config/images";

/**
 * Product catalogue — real Orion product photos as primary images,
 * with premium stock fallbacks for polish where needed.
 * Managed locally; Supabase can override image_url later.
 */
export const products = [
  {
    id: "digital-kiosk-housing",
    name: "Digital Kiosk Housing",
    description:
      "Custom-fabricated metal housings for digital wayfinding and information kiosks with precision-cut panels and powder-coated finishes.",
    application: "Commercial buildings, retail centres, public spaces",
    image: local.products.kiosk,
    coverImage: stock.enclosure.src,
    category: "Commercial Enclosures",
  },
  {
    id: "electronic-enclosure",
    name: "Electronic Enclosure Assembly",
    description:
      "Fully assembled metal enclosures with power distribution, cable routing, and hinged access panels for commercial equipment.",
    application: "Industrial and commercial electronics",
    image: local.products.enclosure,
    coverImage: stock.electronics.src,
    category: "Industrial Enclosures",
  },
  {
    id: "architectural-lighting",
    name: "Architectural Lighting Enclosure",
    description:
      "Laser-cut and powder-coated channel housings for architectural lighting with custom cutouts and mounting features.",
    application: "Commercial and architectural lighting",
    image: local.products.lighting,
    coverImage: stock.lighting.src,
    category: "Architectural Metalwork",
  },
  {
    id: "custom-cabinet",
    name: "Custom Metal Cabinet",
    description:
      "Fabricated metal cabinets with laser-cut decorative door panels, powder-coated finish, and integrated hardware.",
    application: "Commercial storage and display",
    image: local.products.cabinet,
    coverImage: stock.cabinet.src,
    category: "Custom Fabrication",
  },
  {
    id: "fabricated-trough",
    name: "Custom Fabricated Trough",
    description:
      "Heavy-duty fabricated metal trough with precision laser-cut ventilation slots and interlocking tab-and-slot assembly.",
    application: "Industrial and commercial applications",
    image: local.products.trough,
    coverImage: stock.metalSheets.src,
    category: "Industrial Fabrication",
  },
  {
    id: "kiosk-pylon",
    name: "Wayfinding Pylon",
    description:
      "Slim-profile metal pylon housing for digital wayfinding displays with angled top design and powder-coated finish.",
    application: "Shopping centres, commercial precincts",
    image: local.products.pylon,
    coverImage: stock.architecture.src,
    category: "Commercial Enclosures",
  },
];

export const productCategories = [
  "All",
  ...new Set(products.map((p) => p.category)),
];
