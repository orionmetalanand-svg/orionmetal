import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import { ServiceGrid } from "@/components/ui/ServiceCard";
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

      <PageHero
        eyebrow="Services"
        title="Sheet Metal Fabrication Services"
        accentWord="Fabrication"
        description="Precision laser cutting, sheet metal bending, metal fabrication, powder coating and custom assembly for commercial and industrial clients in Moorabbin and across Melbourne."
        image="/images/services/laser-cutting-decorative.jpeg"
        imageAlt="Precision laser cut decorative metal panel"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
      />

      {/* Overview grid */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Overview"
            title="Five Core Capabilities"
            accentWord="Core"
            description="Each service can be used standalone or combined into a complete turnkey fabrication package."
            align="center"
          />
          <div className="mt-14">
            <ServiceGrid services={services} detailed />
          </div>
        </div>
      </section>

      {/* Detailed service sections */}
      {services.map((service, index) => {
        const isDark = index % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className={`relative scroll-mt-24 overflow-hidden ${
              isDark ? "bg-brand-black" : "bg-brand-dark"
            }`}
          >
            <div className="absolute inset-0 bg-grid opacity-35" />
            {isDark && (
              <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-brand-red/10 blur-[130px]" />
            )}

            <div className="section-padding container-wide relative grid items-start gap-14 lg:grid-cols-2">
              <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="glass-red inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red-bright">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                  Service {String(index + 1).padStart(2, "0")}
                </div>

                <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  <span className="gradient-white-text">{service.name}</span>
                </h2>

                <p className="mt-5 text-base leading-relaxed text-brand-muted sm:text-lg">
                  {service.overview}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  {service.description}
                </p>

                <div className="mt-9 grid gap-5 sm:grid-cols-2">
                  <div className="glass rounded-2xl p-5">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red">
                      Typical Applications
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.applications.map((app) => (
                        <li key={app} className="flex items-start gap-2.5 text-xs text-white/75">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red">
                      Benefits
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5 text-xs text-white/75">
                          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/contact" variant="primary" size="md">
                    Request a Quote
                  </Button>
                  <Button href={getWhatsAppUrl()} variant="secondary" size="md" external>
                    Enquire on WhatsApp
                  </Button>
                </div>
              </div>

              <Reveal className={index % 2 !== 0 ? "lg:order-1" : ""}>
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={service.image}
                      alt={`${service.name} — Orion Metal Industries Moorabbin`}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 92vw, 46vw"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                  </div>

                  <div className="glass-strong absolute -bottom-5 left-5 right-5 rounded-xl px-5 py-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
                      Capability
                    </p>
                    <p className="mt-1 text-sm text-white/85">{service.shortDescription}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <ProcessSection />
      <CTASection />
    </>
  );
}
