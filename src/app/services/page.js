import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { getPageMetadata } from "@/data/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { JsonLd, getBreadcrumbSchema, getServiceSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("services");

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      {services.map((service) => (
        <JsonLd key={service.id} data={getServiceSchema(service)} />
      ))}

      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Services"
            title="Sheet Metal Fabrication Services"
            description="Professional laser cutting, bending, fabrication, powder coating, and custom assembly for commercial and industrial clients in Moorabbin and Melbourne."
            align="center"
          />
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? "bg-white" : "bg-brand-dark"}`}
        >
          <div className="container-wide grid items-start gap-12 lg:grid-cols-2">
            <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                Service
              </span>
              <h2
                className={`mt-2 text-3xl font-bold ${index % 2 === 0 ? "text-brand-black" : "text-white"}`}
              >
                {service.name}
              </h2>
              <p
                className={`mt-4 text-lg leading-relaxed ${index % 2 === 0 ? "text-gray-600" : "text-brand-muted"}`}
              >
                {service.overview}
              </p>
              <p
                className={`mt-4 leading-relaxed ${index % 2 === 0 ? "text-gray-600" : "text-brand-muted"}`}
              >
                {service.description}
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3
                    className={`font-bold ${index % 2 === 0 ? "text-brand-black" : "text-white"}`}
                  >
                    Typical Applications
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {service.applications.map((app) => (
                      <li
                        key={app}
                        className={`flex items-start gap-2 text-sm ${index % 2 === 0 ? "text-gray-600" : "text-brand-muted"}`}
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3
                    className={`font-bold ${index % 2 === 0 ? "text-brand-black" : "text-white"}`}
                  >
                    Benefits
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className={`flex items-start gap-2 text-sm ${index % 2 === 0 ? "text-gray-600" : "text-brand-muted"}`}
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary" size="md">
                  Request a Quote
                </Button>
                <Button href={getWhatsAppUrl()} variant="outline" size="md" external>
                  Enquire via WhatsApp
                </Button>
              </div>
            </div>
            <div
              className={`relative aspect-[4/3] overflow-hidden border ${
                index % 2 === 0 ? "border-gray-200" : "border-white/10"
              } ${index % 2 !== 0 ? "lg:order-1" : ""}`}
            >
              <Image
                src={service.image}
                alt={`${service.name} — Orion Metal Industries Moorabbin`}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
