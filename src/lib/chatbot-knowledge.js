import { company } from "@/data/company";
import { services } from "@/data/services";

export const chatbotKnowledge = {
  greeting:
    "Hello! I'm the Orion Metal Industries assistant. I can help with information about our services, capabilities, and how to get in touch. How can I help you today?",

  fallback:
    "I'm not sure about that specific detail. For detailed enquiries, please contact us directly via the contact form, phone, or WhatsApp.",

  responses: [
    {
      keywords: ["hello", "hi", "hey", "greetings"],
      answer:
        "Hello! Welcome to Orion Metal Industries. I can help you learn about our sheet metal fabrication services, products, and how to request a quote.",
    },
    {
      keywords: ["who", "about", "company", "orion"],
      answer: `${company.name} is a precision metal engineering and manufacturing company based in ${company.address.suburb}, ${company.address.state}. ${company.description}`,
    },
    {
      keywords: ["service", "services", "what do you do", "capabilities"],
      answer: `We offer: ${services.map((s) => s.name).join(", ")}. Each service supports commercial and industrial applications.`,
    },
    {
      keywords: ["laser", "cutting", "laser cut"],
      answer:
        services.find((s) => s.id === "laser-cutting")?.shortDescription +
        " We cut a wide range of metals with high precision for components, panels, signage, and decorative work.",
    },
    {
      keywords: ["bend", "bending", "fold", "folding", "press brake"],
      answer:
        services.find((s) => s.id === "sheet-metal-bending")?.shortDescription +
        " Our press brake technology delivers accurate folds for brackets, enclosures, and structural profiles.",
    },
    {
      keywords: ["fabricat", "weld", "manufactur"],
      answer:
        services.find((s) => s.id === "metal-fabrication")?.shortDescription +
        " We provide end-to-end fabrication from cutting and forming through to assembly and finishing.",
    },
    {
      keywords: ["powder", "coat", "finish", "colour", "color"],
      answer:
        services.find((s) => s.id === "powder-coating")?.shortDescription +
        " Our in-house powder coating line handles components of various sizes with durable, professional finishes.",
    },
    {
      keywords: ["assembl", "integrat", "kiosk", "enclosure"],
      answer:
        services.find((s) => s.id === "custom-assembly")?.shortDescription +
        " We assemble fabricated components into finished products including kiosk housings and electronic enclosures.",
    },
    {
      keywords: ["product", "catalogue", "catalog"],
      answer:
        "We manufacture digital kiosk housings, electronic enclosures, architectural metalwork, custom cabinets, and industrial fabricated components. Visit our Products page for details.",
    },
    {
      keywords: ["contact", "phone", "call", "email"],
      answer: `You can reach us at ${company.phone} or visit us at ${company.address.full}. Use our contact form to upload drawings and request a quote.`,
    },
    {
      keywords: ["location", "address", "where", "moorabbin", "melbourne"],
      answer: `We are located at ${company.address.full}. We serve commercial and industrial clients across Melbourne and Victoria.`,
    },
    {
      keywords: ["quote", "enquir", "enquiry", "inquiry", "price", "cost"],
      answer:
        "To request a quote, use our Contact page to submit your enquiry with drawings or specifications. You can upload PDF, DWG, DXF, STEP, JPG, PNG, or ZIP files. You can also WhatsApp us directly.",
    },
    {
      keywords: ["hour", "open", "time"],
      answer:
        "Please contact us directly for current business hours. You can call, WhatsApp, or submit an enquiry through our contact form.",
    },
    {
      keywords: ["industr"],
      answer:
        "We serve commercial, industrial, manufacturing, construction, and engineering sectors with precision sheet metal fabrication.",
    },
  ],
};

export function getChatbotResponse(message) {
  const normalized = message.toLowerCase().trim();
  if (!normalized) return chatbotKnowledge.fallback;

  for (const item of chatbotKnowledge.responses) {
    if (item.keywords.some((kw) => normalized.includes(kw))) {
      return item.answer;
    }
  }

  return chatbotKnowledge.fallback;
}
