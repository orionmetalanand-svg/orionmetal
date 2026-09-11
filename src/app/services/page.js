import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import ServiceMaterialsPanel from "@/components/ui/ServiceMaterialsPanel";
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
        image="https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Industrial laser cutting sparks on a metal sheet"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
      />

      {/* Overview grid */}
      <section className="relative overflow-hidden bg-ink-2">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Overview"
            title="Five Core Capabilities"
            accentWord="Core"
            description="Each service can be used standalone or combined into a complete turnkey fabrication package."
            align="center"
          />
          <div className="mt-12 sm:mt-16">
            <ServiceGrid services={services} detailed />
          </div>
        </div>
      </section>

      {/* Detailed service sections */}
      {services.map((service, index) => {
        const isDark = index % 2 === 0;
        const ctaRow = (
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" variant="primary" size="md" className="w-full sm:w-auto">
              Request a Quote
            </Button>
            <Button
              href={getWhatsAppUrl()}
              variant="secondary"
              size="md"
              external
              className="w-full sm:w-auto"
            >
              Enquire on WhatsApp
            </Button>
          </div>
        );

        return (
          <section
            key={service.id}
            id={service.id}
            className={`relative scroll-mt-24 overflow-hidden xl:scroll-mt-28 ${
              isDark ? "bg-ink" : "bg-ink-2"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
            <div className={`absolute inset-0 bg-grid ${isDark ? "opacity-80" : "opacity-60"}`} />
            <div className="absolute inset-0 bg-noise opacity-[0.035]" />
            {isDark && (
              <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-brand-red/[0.08] blur-[140px]" />
            )}

            <div className="section-padding container-wide relative">
              <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="eyebrow-label text-brand-red-bright">
                  <span className="h-px w-7 bg-gradient-to-r from-brand-red to-brand-red/15" />
                  Service {String(index + 1).padStart(2, "0")}
                </div>

                <h2 className="mt-5 text-[1.7rem] font-extrabold leading-[1.1] sm:text-[2.35rem]">
                  <span className="gradient-white-text">{service.name}</span>
                </h2>

                <p className="mt-5 text-[15px] leading-[1.75] text-brand-muted sm:text-[17.5px]">
                  {service.overview}
                </p>
                <p className="mt-4 text-[13.5px] leading-[1.75] text-brand-muted">
                  {service.description}
                </p>

                <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="glass rounded-2xl p-5">
                    <h3 className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-brand-red-bright">
                      Typical Applications
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.applications.map((app) => (
                        <li
                          key={app}
                          className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-white/75"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <h3 className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-brand-red-bright">
                      Benefits
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-white/75"
                        >
                          <svg
                            className="mt-[3px] h-3 w-3 shrink-0 text-brand-red"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3.5}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Services with a materials table get their CTA below it instead. */}
                {!service.materialsSection && <div className="mt-9">{ctaRow}</div>}
                </div>

                <Reveal className={index % 2 !== 0 ? "lg:order-1" : ""}>
                <div className="relative pb-10 lg:pb-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.09] shadow-lift">
                    <Image
                      src={service.localImage || service.image}
                      alt={`${service.name} — Orion Metal Industries Moorabbin`}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 92vw, 46vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </div>

                  <div className="glass-strong absolute bottom-0 left-4 right-4 rounded-2xl px-5 py-4 lg:-bottom-6 lg:left-6 lg:right-6">
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-brand-red-bright">
                      Capability
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
                </Reveal>
              </div>

              {/* Full-width so the material/thickness grid isn't cramped into one column. */}
              {service.materialsSection && (
                <>
                  <div className="mt-12 lg:mt-16">
                    <ServiceMaterialsPanel section={service.materialsSection} wide />
                  </div>
                  <div className="mt-9">{ctaRow}</div>
                </>
              )}
            </div>
          </section>
        );
      })}

      <ProcessSection />
      <CTASection />
    </>
  );
}
