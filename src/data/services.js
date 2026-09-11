import { stock } from "@/config/images";

export const services = [
  {
    id: "laser-cutting",
    slug: "precision-laser-cutting",
    name: "Precision Laser Cutting",
    shortDescription:
      "CNC laser cutting for metals, acrylic, plastics and timber — mild steel to 20mm, stainless to 16mm, aluminium to 12mm, and more.",
    overview:
      "Our precision laser cutting service delivers clean, accurate cuts for commercial and industrial components. From simple profiles to intricate decorative patterns, we process a wide variety of metal types, thicknesses, acrylics, plastics and timber with consistent quality.",
    description:
      "Laser cutting is the foundation of modern sheet metal fabrication. Using advanced CNC laser technology, we cut complex geometries with tight tolerances and minimal material waste — across ferrous and non-ferrous metals, coated steels, timber, acrylic and engineering plastics.",
    image: stock.laserSparks.src,
    localImage: "/images/services/laser-cutting-decorative.jpeg",
    materialsSection: {
      title: "Covering Your Metal-Cutting Needs",
      description:
        "We have the ability to cut a variety of metal types and thicknesses, including:",
      groups: [
        {
          label: "Structural & Steel",
          items: [
            { name: "Mild Steel", thickness: "Up to 20mm" },
            { name: "Bisalloy", thickness: "Up to 20mm" },
            { name: "Galvanised Steel", thickness: "All thicknesses" },
          ],
        },
        {
          label: "Stainless & Aluminium",
          items: [
            { name: "Stainless Steel", thickness: "Up to 16mm" },
            { name: "Aluminium", thickness: "Up to 12mm" },
          ],
        },
        {
          label: "Specialty Metals",
          items: [
            { name: "Copper", thickness: "Up to 6mm" },
            { name: "Brass", thickness: "Up to 6mm" },
            {
              name: "Zinc Seal / Anneal / Aluminised",
              thickness: "All thicknesses",
            },
          ],
        },
        {
          label: "Non-Metal Materials",
          items: [
            { name: "Timber" },
            {
              name: "Acrylic",
              detail: "Perspex, Plexiglass, Lucite",
            },
            {
              name: "Plastics",
              detail: "HDPE, ABS, Polypropylene, Polyurethane",
            },
          ],
        },
      ],
    },
    applications: [
      "Component profiles and brackets",
      "Ventilation and mounting panels",
      "Decorative and architectural screens",
      "Signage and branding elements",
      "Enclosure cutouts and access panels",
    ],
    benefits: [
      "High precision with clean edge quality",
      "Complex shapes and fine detail capability",
      "Efficient processing for batch production",
      "Consistent results across repeat orders",
    ],
  },
  {
    id: "sheet-metal-bending",
    slug: "sheet-metal-bending",
    name: "Sheet Metal Bending",
    shortDescription:
      "Precision folding with advanced press brake technology for accurate results.",
    overview:
      "Our sheet metal bending service uses press brake technology to form accurate folds, channels, and profiles. We deliver consistent angles and dimensions for brackets, enclosures, frames, and structural components.",
    description:
      "Precision bending transforms flat sheet metal into functional three-dimensional components. Our press brake capabilities handle a range of material thicknesses and bend configurations, ensuring your parts meet exact dimensional requirements.",
    image: stock.pressBrake.src,
    localImage: "/images/services/sheet-metal-bending-fabrication.jpeg",
    applications: [
      "Brackets and mounting plates",
      "Enclosure housings and chassis",
      "Frame components and structural profiles",
      "Custom channels and trays",
      "Folded signage and display elements",
    ],
    benefits: [
      "Accurate, repeatable bend angles",
      "Clean folds with minimal distortion",
      "Suitable for production and custom work",
      "Integrated with cutting and finishing",
    ],
  },
  {
    id: "metal-fabrication",
    slug: "metal-fabrication",
    name: "Metal Fabrication",
    shortDescription:
      "Custom fabrication solutions designed and built to your exact requirements.",
    overview:
      "We provide end-to-end metal fabrication — from cutting and forming through to welding, assembly, and finishing. Our team delivers custom solutions tailored to commercial and industrial specifications.",
    description:
      "Metal fabrication at Orion Metal Industries covers the complete manufacturing process. We work from your drawings or specifications to produce finished components and assemblies ready for installation or integration.",
    image: stock.weldingSparks.src,
    localImage: "/images/services/metal-fabrication-assembly.jpeg",
    applications: [
      "Industrial equipment housings",
      "Custom frames and structures",
      "Commercial fit-out components",
      "Machinery guards and panels",
      "Structural and architectural metalwork",
    ],
    benefits: [
      "Full-service fabrication capability",
      "Custom solutions to your specifications",
      "Quality-focused production processes",
      "Commercial and industrial scale",
    ],
  },
  {
    id: "powder-coating",
    slug: "powder-coating",
    name: "Powder Coating",
    shortDescription:
      "Durable, high quality powder coating finishes in a range of colours.",
    overview:
      "Our powder coating service provides durable, professional finishes for fabricated metal components. We offer a range of colours and finishes to protect and enhance your products.",
    description:
      "Powder coating delivers a tough, uniform finish that protects metal components from corrosion and wear. Our in-house coating line handles components of various sizes, with quality finishes suitable for commercial and industrial applications.",
    image: stock.powderFinish.src,
    localImage: "/images/services/powder-coating-line.jpeg",
    applications: [
      "Enclosures and housings",
      "Frames and structural components",
      "Display and kiosk products",
      "Architectural metalwork",
      "Industrial equipment panels",
    ],
    benefits: [
      "Durable, long-lasting finish",
      "Wide range of colour options",
      "Consistent coating quality",
      "Integrated with fabrication workflow",
    ],
  },
  {
    id: "custom-assembly",
    slug: "custom-assembly",
    name: "Custom Assembly",
    shortDescription:
      "Complete assembly and integration of fabricated components into finished products.",
    overview:
      "We assemble fabricated metal components into finished products, integrating hardware, wiring, and sub-assemblies as required. From kiosk housings to custom enclosures, we deliver ready-to-install solutions.",
    description:
      "Custom assembly brings together cut, formed, and coated components into complete products. Our assembly capability includes hardware integration, electrical routing, and packaging for dispatch — reducing your supply chain complexity.",
    image: stock.warehouse.src,
    localImage: "/images/services/custom-assembly-warehouse.jpeg",
    applications: [
      "Digital kiosk and display housings",
      "Electronic enclosures",
      "Modular frame assemblies",
      "Custom commercial products",
      "Palletized dispatch-ready units",
    ],
    benefits: [
      "Turnkey product delivery",
      "Integrated fabrication and assembly",
      "Professional packaging and dispatch",
      "Reduced supplier management",
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}

export function getServiceById(id) {
  return services.find((s) => s.id === id);
}

/** Plain-text summary of laser cutting materials — used by chatbot and SEO helpers. */
export function getLaserCuttingMaterialsSummary() {
  const service = getServiceById("laser-cutting");
  const section = service?.materialsSection;
  if (!section) return "";

  return section.groups
    .map((group) => {
      const items = group.items
        .map((item) => {
          const parts = [item.name];
          if (item.thickness) parts.push(item.thickness);
          if (item.detail) parts.push(item.detail);
          return parts.join(" — ");
        })
        .join("; ");
      return `${group.label}: ${items}`;
    })
    .join(". ");
}
