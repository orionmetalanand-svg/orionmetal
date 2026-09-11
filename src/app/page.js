import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CapabilityBand from "@/components/sections/CapabilityBand";
import ProcessSection from "@/components/sections/ProcessSection";
import TrustedCustomers from "@/components/sections/TrustedCustomers";
import GoogleReviews from "@/components/sections/GoogleReviews";
import LocationSection from "@/components/sections/LocationSection";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ProductGrid } from "@/components/ui/ProductCard";
import { ServiceGrid } from "@/components/ui/ServiceCard";
import IndustryCard from "@/components/ui/IndustryCard";
import { BlogGrid } from "@/components/ui/BlogCard";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { getPageMetadata } from "@/data/seo";
import {
  getProducts,
  getBlogPosts,
  getTrustedCustomers,
  getGoogleReviews,
  getSchemaReviews,
} from "@/lib/supabase/queries";
import { JsonLd, getServicesListSchema, getReviewsSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("home");
export const revalidate = 3600;

const qualityPoints = [
  "Precision cutting and forming to specification",
  "In-house powder coating for consistent finishes",
  "Quality-focused production processes",
  "Protective packaging and palletised dispatch",
];

/** Floating glass caption used over feature imagery. */
function FloatingStat({ label, value, detail, className = "" }) {
  return (
    <div
      className={`glass-strong absolute hidden rounded-2xl px-5 py-4 animate-float-slow sm:block ${className}`}
    >
      <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-brand-red-bright">
        {label}
      </p>
      <p className="mt-2 text-[17px] font-bold leading-tight text-white">{value}</p>
      <p className="mt-1 text-[11.5px] text-brand-muted">{detail}</p>
    </div>
  );
}

export default async function HomePage() {
  const [products, blogPosts, customers, reviews, schemaReviews] = await Promise.all([
    getProducts(),
    getBlogPosts(3),
    getTrustedCustomers(),
    getGoogleReviews(),
    getSchemaReviews(),
  ]);

  const googleBusinessUrl = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL || null;
  const reviewsSchema = getReviewsSchema(schemaReviews);

  return (
    <>
      <JsonLd data={getServicesListSchema()} />
      {reviewsSchema && <JsonLd data={reviewsSchema} />}

      <Hero />
      <CapabilityBand />

      {/* ── Company Introduction ───────────────────── */}
      <section className="relative overflow-hidden bg-ink-2">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-brand-red/[0.07] blur-[140px]" />

        <div className="section-padding container-wide relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About Orion"
              title="Precision Metal Engineering for Industry"
              accentWord="Precision"
              description={company.description}
            />

            <Reveal delay={140}>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {company.values.slice(0, 4).map((value) => (
                  <div
                    key={value.title}
                    className="glass hover-lift rounded-xl p-4 hover:border-white/16"
                  >
                    <p className="text-[13.5px] font-bold text-white">{value.title}</p>
                    <p className="mt-2 text-[12px] leading-[1.65] text-brand-muted">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button href="/about" variant="primary" size="md">
                  About Our Company
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.09] shadow-lift">
                <Image
                  src="/images/projects/formed-steel-frame-brackets.jpeg"
                  alt="Laser-cut and press-brake formed steel frame brackets manufactured by Orion Metal Industries in Moorabbin"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 92vw, 46vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>

              <FloatingStat
                label="Located In"
                value={`${company.address.suburb}, ${company.address.state}`}
                detail="Serving Melbourne & Victoria"
                className="-bottom-7 -left-5"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Services ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-grid opacity-80" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-red/[0.1] blur-[150px]" />

        <div className="section-padding container-wide relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Complete Sheet Metal Capability"
              accentWord="Capability"
              description="Laser cutting, bending, fabrication, powder coating and custom assembly — delivered under one roof for commercial and industrial clients."
            />
            <Reveal delay={120}>
              <Button href="/services" variant="secondary" size="md" className="w-full sm:w-auto">
                All Services
              </Button>
            </Reveal>
          </div>

          <div className="mt-12 sm:mt-16">
            <ServiceGrid services={services} detailed />
          </div>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────── */}
      <section className="relative overflow-hidden bg-ink-2">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />

        <div className="section-padding container-wide relative">
          <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Products"
              title="Custom Fabricated Products"
              accentWord="Custom"
              description="Digital kiosk housings, electronic enclosures, architectural metalwork and bespoke industrial components."
            />
            <Reveal delay={120}>
              <Button href="/products" variant="secondary" size="md" className="w-full sm:w-auto">
                View Catalogue
              </Button>
            </Reveal>
          </div>

          <div className="mt-10 sm:mt-16">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* ── Projects gallery preview ───────────────── */}
      <section className="relative overflow-hidden bg-ink-2">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />

        <div className="section-padding container-wide relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our Work"
              title="Fabrication Project Gallery"
              accentWord="Project"
              description="Laser-cut architectural screens, powder-coated frames, custom enclosures and industrial assemblies."
            />
            <Reveal delay={120}>
              <Button href="/projects" variant="secondary" size="md" className="w-full sm:w-auto">
                Full Gallery
              </Button>
            </Reveal>
          </div>

          <div className="mt-10 grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:mt-16 lg:grid-cols-4">
            {projects.slice(0, 6).map((project, i) => (
              <Reveal
                key={project.id}
                delay={i * 60}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              >
                <Link
                  href="/projects"
                  className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.09] transition-all duration-500 hover:border-white/20 hover:shadow-lift"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — Orion Metal Industries`}
                    fill
                    className="object-cover grayscale-[40%] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:grayscale-0"
                    sizes="(max-width:1024px) 48vw, 24vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                    <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-red-bright sm:text-[9px]">
                      {project.category}
                    </span>
                    <h3 className="mt-1.5 line-clamp-2 text-[12.5px] font-bold leading-snug text-white sm:text-sm">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustedCustomers customers={customers} />

      {/* ── Quality / Why Orion ────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-grid opacity-80" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />
        <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-brand-red/[0.09] blur-[140px]" />

        <div className="section-padding container-wide relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.09] shadow-lift">
                <Image
                  src="/images/projects/decorative-metal-art-showroom.jpeg"
                  alt="Powder-coated laser-cut metalwork on display at the Orion Metal Industries workshop in Moorabbin"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 92vw, 46vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>

              <FloatingStat
                label="Finishing"
                value="In-House Coating"
                detail="Integrated production line"
                className="-top-7 -right-5"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Why Orion"
              title="Precision, Quality & Reliability"
              accentWord="Quality"
              description="Every component is manufactured with attention to dimensional accuracy, finish quality, and structural integrity."
            />

            <Reveal delay={140}>
              <ul className="mt-9 space-y-2.5">
                {qualityPoints.map((point) => (
                  <li
                    key={point}
                    className="glass flex items-start gap-3.5 rounded-xl p-4 transition-colors duration-300 hover:border-white/16"
                  >
                    <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-red/25 bg-brand-red/12 text-brand-red-bright">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[13.5px] leading-[1.7] text-white/85">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex items-center gap-3.5">
                <span className="h-px w-8 bg-brand-red" />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                  {company.secondaryTagline}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Industries ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-2">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />

        <div className="section-padding container-wide relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Industries"
              title="Sectors We Support"
              accentWord="Support"
              description="Target application areas across commercial, industrial, manufacturing, construction and engineering sectors."
            />
            <Reveal delay={120}>
              <Button href="/industries" variant="secondary" size="md" className="w-full sm:w-auto">
                All Industries
              </Button>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
            {industries.slice(0, 3).map((industry, i) => (
              <IndustryCard key={industry.id} industry={industry} index={i} />
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews reviews={reviews} googleBusinessUrl={googleBusinessUrl} />

      {/* ── Blog — deliberate light band for contrast ─ */}
      {blogPosts.length > 0 && (
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-grid-light opacity-70" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red via-brand-red/40 to-transparent" />

          <div className="section-padding container-wide relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Insights"
                title="Latest Fabrication Articles"
                description="Practical guidance on sheet metal fabrication, laser cutting, and commercial manufacturing in Melbourne."
                light
              />
              <Reveal delay={120}>
                <Button href="/blog" variant="outline" size="md" className="w-full sm:w-auto">
                  All Articles
                </Button>
              </Reveal>
            </div>

            <div className="mt-10 sm:mt-16">
              <BlogGrid posts={blogPosts} />
            </div>
          </div>
        </section>
      )}

      <LocationSection />
      <CTASection />
    </>
  );
}
