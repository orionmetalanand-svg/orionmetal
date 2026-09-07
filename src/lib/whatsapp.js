import { company } from "@/data/company";

export function getWhatsAppUrl(message = company.whatsappMessage) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${company.phoneRaw}?text=${encoded}`;
}

export function getTelUrl() {
  return `tel:${company.phone.replace(/\s/g, "")}`;
}
