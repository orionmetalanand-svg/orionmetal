import { stock } from "@/config/images";

export const industries = [
  {
    id: "commercial",
    name: "Commercial",
    description:
      "Custom metal fabrication for commercial fit-outs, signage, display systems, and building components. We support architects, builders, and commercial contractors with precision-manufactured metalwork.",
    applications: [
      "Digital kiosk and display housings",
      "Signage and branding elements",
      "Commercial fit-out components",
      "Decorative architectural features",
    ],
    image: stock.architecture.src,
  },
  {
    id: "industrial",
    name: "Industrial",
    description:
      "Heavy-duty fabrication for industrial applications including equipment housings, guards, frames, and structural components built to commercial specifications.",
    applications: [
      "Equipment enclosures and guards",
      "Industrial frames and structures",
      "Machinery panels and covers",
      "Custom industrial components",
    ],
    image: stock.machining.src,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description:
      "Precision sheet metal components for manufacturing clients requiring consistent quality, batch production capability, and reliable delivery schedules.",
    applications: [
      "Production component batches",
      "Jigs, fixtures, and tooling",
      "Machine guards and panels",
      "Custom OEM components",
    ],
    image: stock.factoryFloor.src,
  },
  {
    id: "construction",
    name: "Construction",
    description:
      "Metal fabrication supporting construction projects with custom brackets, panels, screens, and structural components manufactured to project specifications.",
    applications: [
      "Structural brackets and plates",
      "Architectural metal screens",
      "Building facade components",
      "Custom construction metalwork",
    ],
    image: stock.construction.src,
  },
  {
    id: "engineering",
    name: "Engineering",
    description:
      "Working with engineering firms and designers to translate technical drawings into precision-fabricated metal components and assemblies.",
    applications: [
      "Prototype development",
      "Custom engineered enclosures",
      "Precision component fabrication",
      "Assembly integration",
    ],
    image: stock.engineering.src,
  },
];
