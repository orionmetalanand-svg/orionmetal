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
import Carousel from "@/components/ui/Carousel";
import Button from "@/components/ui/Button";
import { ServiceGrid } from "@/components/ui/ServiceCard";
import ProductCard from "@/components/ui/ProductCard";
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
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[130px]" />

        <div className="section-padding container-wide relative grid items-center gap-14 lg:grid-cols-2">
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
                    className="glass hover-lift rounded-xl p-4 hover:border-brand-red/35"
                  >
                    <p className="text-sm font-bold text-white">{value.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-brand-muted">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <Button href="/about" variant="primary" size="md">
                  About Our Company
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/company/orion-company-flyer.jpeg"
                  alt="Orion Metal Industries capability overview — precision, strength, quality"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 92vw, 46vw"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              {/* Floating glass stat */}
              <div className="glass-strong absolute -bottom-6 -left-4 hidden rounded-2xl p-5 sm:block animate-float-slow">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
                  Located In
                </p>
                <p className="mt-1.5 text-lg font-bold text-white">
                  {company.address.suburb}, {company.address.state}
                </p>
                <p className="text-xs text-brand-muted">Serving Melbourne & Victoria</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Services ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-red/12 blur-[150px]" />

        <div className="section-padding container-wide relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Complete Sheet Metal Capability"
              accentWord="Capability"
              description="Laser cutting, bending, fabrication, powder coating and custom assembly — delivered under one roof for commercial and industrial clients."
            />
            <Reveal delay={120}>
              <Button href="/services" variant="secondary" size="md">
                All Services
              </Button>
            </Reveal>
          </div>

          <div className="mt-14">
            <ServiceGrid services={services} detailed />
          </div>
        </div>
      </section>

      {/* ── Featured Products (carousel) ───────────── */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="section-padding container-wide relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Products"
              title="Custom Fabricated Products"
              accentWord="Custom"
              description="Digital kiosk housings, electronic enclosures, architectural metalwork and bespoke industrial components."
            />
            <Reveal delay={120}>
              <Button href="/products" variant="secondary" size="md">
                View Catalogue
              </Button>
            </Reveal>
          </div>

          <div className="mt-14">
            <Carousel
              ariaLabel="Featured products"
              itemClassName="min-w-[86%] sm:min-w-[48%] lg:min-w-[32.4%]"
            >
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* ── Projects gallery preview ───────────────── */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="section-padding container-wide relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our Work"
              title="Fabrication Project Gallery"
              accentWord="Project"
              description="Laser-cut architectural screens, powder-coated frames, custom enclosures and industrial assemblies."
            />
            <Reveal delay={120}>
              <Button href="/projects" variant="secondary" size="md">
                Full Gallery
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid auto-rows-[13rem] grid-cols-2 gap-4 lg:grid-cols-4">
            {projects.slice(0, 6).map((project, i) => (
              <Reveal
                key={project.id}
                delay={i * 60}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              >
                <Link
                  href="/projects"
                  className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-brand-red/45"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — Orion Metal Industries`}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    sizes="(max-width:1024px) 46vw, 24vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-red">
                      {project.category}
                    </span>
                    <h3 className="mt-1 text-sm font-bold leading-snug text-white">
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
      <section className="relative overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-brand-red/12 blur-[130px]" />

        <div className="section-padding container-wide relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/services/powder-coating-frame.jpeg"
                  alt="Powder coated metal frame on the finishing line at Orion Metal Industries"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 92vw, 46vw"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              <div className="glass-strong absolute -right-4 -top-6 hidden rounded-2xl p-5 sm:block animate-float-slow">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
                  Finishing
                </p>
                <p className="mt-1.5 text-lg font-bold text-white">In-House Coating</p>
                <p className="text-xs text-brand-muted">Integrated production line</p>
              </div>
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
              <ul className="mt-9 space-y-3">
                {qualityPoints.map((point) => (
                  <li
                    key={point}
                    className="glass flex items-start gap-3.5 rounded-xl p-4 transition-colors hover:border-brand-red/35"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-brand-red">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-white/85">{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
                {company.secondaryTagline}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Industries ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="section-padding container-wide relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Industries"
              title="Sectors We Support"
              accentWord="Support"
              description="Target application areas across commercial, industrial, manufacturing, construction and engineering sectors."
            />
            <Reveal delay={120}>
              <Button href="/industries" variant="secondary" size="md">
                All Industries
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.slice(0, 3).map((industry, i) => (
              <IndustryCard key={industry.id} industry={industry} index={i} />
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews reviews={reviews} googleBusinessUrl={googleBusinessUrl} />

      {/* ── Blog ───────────────────────────────────── */}
      {blogPosts.length > 0 && (
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-grid-light opacity-60" />

          <div className="section-padding container-wide relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Insights"
                title="Latest Fabrication Articles"
                description="Practical guidance on sheet metal fabrication, laser cutting, and commercial manufacturing in Melbourne."
                light
              />
              <Reveal delay={120}>
                <Button href="/blog" variant="outline" size="md">
                  All Articles
                </Button>
              </Reveal>
            </div>

            <div className="mt-14">
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
