import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CapabilityBand from "@/components/sections/CapabilityBand";
import LocationSection from "@/components/sections/LocationSection";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
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
        image="https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Industrial laser cutting sparks on metal sheet"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
      />

      <CapabilityBand />

      {/* Who we are */}
      <section className="relative overflow-hidden bg-ink-2">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-brand-red/[0.08] blur-[140px]" />

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

              <div className="glass-red mt-8 rounded-2xl p-5 sm:p-6">
                <p className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
                  {company.tagline}
                </p>
                <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red-bright sm:text-[11px]">
                  {company.secondaryTagline}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="bg-steel relative overflow-hidden rounded-3xl border border-white/[0.08] shadow-lift">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />
              <div className="absolute inset-0 bg-noise opacity-[0.05]" />
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-red/12 blur-[90px]" />

              <div className="relative flex flex-col items-center justify-center px-6 py-14 sm:px-12 sm:py-20">
                <Logo href={null} variant="light" size="xl" />

                <div className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <p className="mt-6 text-center text-[11px] font-bold uppercase tracking-[0.26em] text-white/45">
                  Est. Moorabbin · Victoria · Australia
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-grid opacity-80" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-red/[0.1] blur-[150px]" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Our Approach"
            title="Built on Craftsmanship & Technology"
            accentWord="Craftsmanship"
            description="Four principles that shape how we manufacture and deliver every fabrication project."
            align="center"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80}>
                <div className="panel hover-lift group relative h-full overflow-hidden rounded-2xl p-5 hover:-translate-y-1.5 hover:border-white/16 hover:shadow-lift sm:p-6">
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
                  <span className="accent-rule transition-all duration-500 group-hover:w-16" />
                  <h3 className="mt-5 text-[17px] font-bold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-brand-muted">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative overflow-hidden bg-ink-2">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />

        <div className="section-padding container-wide relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.09] shadow-lift">
              <Image
                src="https://images.unsplash.com/photo-1565514020176-efe69048881b?auto=format&fit=crop&w=1600&q=80"
                alt="Precision metal finishing and CNC manufacturing"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 92vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
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
                    className="glass flex items-start gap-4 rounded-xl p-4 transition-colors duration-300 hover:border-white/16"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-red/20 bg-brand-red/12 text-[11px] font-bold tabular-nums text-brand-red-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[13.5px] font-bold text-white">{service.name}</p>
                      <p className="mt-1.5 text-[12px] leading-[1.65] text-brand-muted">
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
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-grid opacity-80" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Our Values"
            title="What Clients Can Expect"
            accentWord="Expect"
            align="center"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-5">
            {company.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70}>
                <div className="glass hover-lift h-full rounded-2xl p-5 text-center hover:-translate-y-1.5 hover:border-white/16 sm:p-6">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-brand-red/20 bg-brand-red/12 text-brand-red-bright">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="mt-4 text-[13.5px] font-bold text-white">{value.title}</h3>
                  <p className="mt-2 text-[12px] leading-[1.65] text-brand-muted">
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
