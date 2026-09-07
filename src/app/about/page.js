import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CapabilityBand from "@/components/sections/CapabilityBand";
import LocationSection from "@/components/sections/LocationSection";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { getPageMetadata } from "@/data/seo";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("about");

const pillars = [
  {
    title: "Craftsmanship",
    description:
      "Skilled tradespeople who understand sheet metal behaviour, tolerances, and finish quality on every job.",
  },
  {
    title: "Technology",
    description:
      "Modern CNC laser cutting and press brake equipment paired with an integrated powder coating line.",
  },
  {
    title: "Quality Focus",
    description:
      "Dimensional accuracy, consistent finishes, and careful handling from production through to dispatch.",
  },
  {
    title: "Commercial Focus",
    description:
      "Built for commercial and industrial procurement — clear communication, quoting, and delivery.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About Us"
        title="Precision Metal Engineering in Moorabbin"
        accentWord="Moorabbin"
        description={company.description}
        image="/images/services/laser-cutting-precision.jpeg"
        imageAlt="Precision laser cut sheet metal components at Orion Metal Industries"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
      />

      <CapabilityBand />

      {/* Who we are */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[130px]" />

        <div className="section-padding container-wide relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A Trusted Name in Precision Metal Manufacturing"
              accentWord="Precision"
              description="We combine advanced technology, skilled craftsmanship and a commitment to quality to deliver products that meet the highest standards."
            />

            <Reveal delay={140}>
              <p className="mt-7 text-sm leading-relaxed text-brand-muted">
                Our focus is on providing reliable fabrication services — from precision laser
                cutting and sheet metal bending through to powder coating and custom assembly — for
                clients who require quality workmanship and dependable delivery.
              </p>

              <div className="glass-red mt-8 rounded-2xl p-6">
                <p className="text-2xl font-bold text-white">{company.tagline}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-brand-red-bright">
                  {company.secondaryTagline}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white">
              <Image
                src="/images/company/orion-logo.jpeg"
                alt="Orion Metal Industries Pty Ltd brand logo"
                fill
                className="object-contain p-10"
                sizes="(max-width:1024px) 92vw, 46vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-red/12 blur-[150px]" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Our Approach"
            title="Built on Craftsmanship & Technology"
            accentWord="Craftsmanship"
            description="Four principles that shape how we manufacture and deliver every fabrication project."
            align="center"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80}>
                <div className="glass hover-lift h-full rounded-2xl p-6 hover:-translate-y-1.5 hover:border-brand-red/40">
                  <span className="accent-rule rounded-full" />
                  <h3 className="mt-5 text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="section-padding container-wide relative grid gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/services/powder-coating-line.jpeg"
                alt="Powder coating production line at Orion Metal Industries Moorabbin"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 92vw, 46vw"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Capabilities"
              title="Manufacturing Under One Roof"
              accentWord="One Roof"
              description="An integrated workflow means fewer suppliers, shorter lead times, and consistent quality control."
            />

            <Reveal delay={140}>
              <div className="mt-9 space-y-3">
                {services.map((service, i) => (
                  <div
                    key={service.id}
                    className="glass flex items-start gap-4 rounded-xl p-4 transition-colors hover:border-brand-red/35"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-red/15 text-[11px] font-bold text-brand-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{service.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <Button href="/services" variant="primary" size="md">
                  Explore Services
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-grid opacity-40" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Our Values"
            title="What Clients Can Expect"
            accentWord="Expect"
            align="center"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {company.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70}>
                <div className="glass hover-lift h-full rounded-2xl p-6 text-center hover:-translate-y-1.5 hover:border-brand-red/40">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/15 text-brand-red">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-white">{value.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LocationSection />
      <CTASection />
    </>
  );
}
