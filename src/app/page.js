import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/ui/ServiceCard";
import { ProductGrid } from "@/components/ui/ProductCard";
import { BlogGrid } from "@/components/ui/BlogCard";
import IndustryCard from "@/components/ui/IndustryCard";
import TrustedCustomers from "@/components/sections/TrustedCustomers";
import GoogleReviews from "@/components/sections/GoogleReviews";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";
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

const processSteps = [
  {
    step: "01",
    title: "Enquiry & Drawings",
    description: "Submit your requirements, drawings, or specifications for review.",
  },
  {
    step: "02",
    title: "Cutting & Forming",
    description: "Precision laser cutting and press brake bending to your dimensions.",
  },
  {
    step: "03",
    title: "Fabrication & Coating",
    description: "Assembly, welding, and powder coating for a durable finished product.",
  },
  {
    step: "04",
    title: "Quality & Dispatch",
    description: "Final inspection, professional packaging, and on-time delivery.",
  },
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

      {/* Company Introduction */}
      <section className="section-padding bg-white">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About Orion"
              title="Precision Metal Engineering for Industry"
              description={company.description}
              light
            />
            <p className="mt-6 text-gray-600 leading-relaxed">
              Based in {company.address.suburb}, {company.address.state}, we serve commercial and
              industrial clients across Melbourne and Victoria with comprehensive sheet metal
              fabrication services.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="primary" size="md">
                Learn About Us
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/company/orion-company-flyer.jpeg"
              alt="Orion Metal Industries company overview — precision, strength, quality"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="section-padding bg-brand-dark">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Capabilities"
            title="Core Manufacturing Capabilities"
            description="End-to-end sheet metal fabrication from cutting through to finished assembly."
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {company.capabilities.map((cap) => (
              <div
                key={cap}
                className="border border-white/10 bg-brand-black p-6 text-center transition-colors hover:border-brand-red/50"
              >
                <div className="mx-auto mb-4 h-1 w-8 bg-brand-red" />
                <p className="text-sm font-semibold text-white">{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Services"
            title="Professional Sheet Metal Services"
            description="Comprehensive fabrication services for commercial and industrial applications in Melbourne."
            align="center"
          />
          <div className="mt-12">
            <ServiceGrid services={services} detailed />
          </div>
          <div className="mt-10 text-center">
            <Button href="/services" variant="outline" size="lg">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Products"
            title="Featured Products & Capabilities"
            description="Custom-fabricated metal products for commercial, industrial, and architectural applications."
            align="center"
            light
          />
          <div className="mt-12">
            <ProductGrid products={products.slice(0, 3)} />
          </div>
          <div className="mt-10 text-center">
            <Button href="/products" variant="primary" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="section-padding bg-brand-dark">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Process"
            title="Our Manufacturing Process"
            description="From initial enquiry to finished product — a streamlined fabrication workflow."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step} className="relative border border-white/10 p-6">
                <span className="text-3xl font-bold text-brand-red">{item.step}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Orion */}
      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Why Orion"
            title="Why Choose Orion Metal Industries"
            description={company.secondaryTagline}
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {company.values.map((value) => (
              <div
                key={value.title}
                className="border border-white/10 p-6 text-center transition-colors hover:border-brand-red/50"
              >
                <h3 className="font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Industries"
            title="Industries We Serve"
            description="Supporting commercial and industrial sectors across Melbourne and Victoria."
            align="center"
            light
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.slice(0, 3).map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/industries" variant="primary" size="lg">
              View All Industries
            </Button>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="section-padding bg-brand-dark">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/services/powder-coating-frame.jpeg"
              alt="Powder coated metal frame on production line — quality finishing"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Quality"
              title="Precision & Quality Focus"
              description="Every component is manufactured with attention to dimensional accuracy, finish quality, and structural integrity."
            />
            <ul className="mt-6 space-y-3">
              {[
                "Precision cutting and forming to specification",
                "Professional powder coating finishes",
                "Quality-focused production processes",
                "Professional packaging and dispatch",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-brand-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-brand-red" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Projects"
            title="Fabrication Work"
            description="Examples of our laser cutting, fabrication, powder coating, and assembly capabilities."
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 4).map((project) => (
              <Link
                key={project.id}
                href="/projects"
                className="group relative aspect-square overflow-hidden border border-white/10"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-brand-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/projects" variant="outline" size="lg">
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted Customers */}
      <TrustedCustomers customers={customers} />

      {/* Google Reviews */}
      <GoogleReviews reviews={reviews} googleBusinessUrl={googleBusinessUrl} />

      {/* Blog Preview */}
      {blogPosts.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Blog"
              title="Latest Fabrication Insights"
              description="Expert articles on sheet metal fabrication, laser cutting, and commercial manufacturing in Melbourne."
              align="center"
              light
            />
            <div className="mt-12">
              <BlogGrid posts={blogPosts} />
            </div>
            <div className="mt-10 text-center">
              <Button href="/blog" variant="primary" size="lg">
                View All Articles
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Contact Preview */}
      <section className="section-padding bg-white">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Get in Touch"
              description="Request a quote or send your drawings for a fabrication enquiry. We respond to all commercial and industrial enquiries."
              light
            />
            <div className="mt-8 space-y-4">
              <p className="text-gray-600">
                <strong className="text-brand-black">Address:</strong> {company.address.full}
              </p>
              <p className="text-gray-600">
                <strong className="text-brand-black">Phone:</strong>{" "}
                <a href={getTelUrl()} className="text-brand-red hover:underline">
                  {company.phone}
                </a>
              </p>
              <p className="text-gray-600">
                <strong className="text-brand-black">Contact:</strong> {company.contactPerson}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="md">
                Request a Quote
              </Button>
              <Button href={getWhatsAppUrl()} variant="outline" size="md" external>
                WhatsApp Us
              </Button>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden border border-gray-200">
            <iframe
              src={company.location.embedUrl}
              title="Orion Metal Industries location map — Moorabbin VIC"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
