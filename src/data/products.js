export const products = [
  {
    id: "digital-kiosk-housing",
    name: "Digital Kiosk Housing",
    description:
      "Custom-fabricated metal housings for digital wayfinding and information kiosks. Precision-cut panels with powder-coated finishes and integrated screen mounting.",
    application: "Commercial buildings, retail centres, public spaces",
    image: "/images/products/digital-kiosk-wayfinder.jpeg",
    category: "Commercial Enclosures",
  },
  {
    id: "electronic-enclosure",
    name: "Electronic Enclosure Assembly",
    description:
      "Fully assembled metal enclosures with integrated power distribution, cable routing, and hinged access panels for commercial equipment.",
    application: "Industrial and commercial electronics",
    image: "/images/products/electronic-enclosure-assembly.jpeg",
    category: "Industrial Enclosures",
  },
  {
    id: "architectural-lighting",
    name: "Architectural Lighting Enclosure",
    description:
      "Precision laser-cut and powder-coated channel housings for architectural lighting applications with custom oval cutouts and mounting features.",
    application: "Commercial and architectural lighting",
    image: "/images/products/architectural-lighting-enclosure.jpeg",
    category: "Architectural Metalwork",
  },
  {
    id: "custom-cabinet",
    name: "Custom Metal Cabinet",
    description:
      "Fabricated metal cabinets with laser-cut decorative door panels, powder-coated finish, and integrated hardware.",
    application: "Commercial storage and display",
    image: "/images/products/custom-cabinet-laser-cut-doors.jpeg",
    category: "Custom Fabrication",
  },
  {
    id: "fabricated-trough",
    name: "Custom Fabricated Trough",
    description:
      "Heavy-duty fabricated metal trough with precision laser-cut ventilation slots and interlocking tab-and-slot assembly.",
    application: "Industrial and commercial applications",
    image: "/images/products/custom-fabricated-trough.jpeg",
    category: "Industrial Fabrication",
  },
  {
    id: "kiosk-pylon",
    name: "Wayfinding Pylon",
    description:
      "Slim-profile metal pylon housing for digital wayfinding displays with angled top design and professional powder-coated finish.",
    application: "Shopping centres, commercial precincts",
    image: "/images/products/digital-kiosk-pylon-front.jpeg",
    category: "Commercial Enclosures",
  },
];

export const productCategories = [
  "All",
  ...new Set(products.map((p) => p.category)),
];
