import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { getPageMetadata } from "@/data/seo";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="About Us"
            title="Who We Are"
            description={company.description}
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/company/orion-logo.jpeg"
              alt="Orion Metal Industries Pty Ltd logo"
              fill
              className="object-contain p-8"
              sizes="50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-black">Precision Metal Engineering</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {company.name} combines advanced technology, skilled craftsmanship, and a commitment
              to quality to deliver precision metal products for commercial and industrial
              applications.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our focus is on providing reliable fabrication services — from precision laser cutting
              and sheet metal bending through to powder coating and custom assembly — for clients
              who require quality workmanship and dependable delivery.
            </p>
            <p className="mt-4 text-2xl font-bold text-brand-red">{company.tagline}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-dark">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Capabilities"
            title="Manufacturing Capabilities"
            description="Comprehensive sheet metal fabrication services under one roof."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white">{service.name}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-black">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Craftsmanship"
              title="Skilled Craftsmanship & Technology"
              description="We combine modern equipment with skilled craftsmanship to deliver products that meet exacting standards."
            />
            <p className="mt-4 text-brand-muted leading-relaxed">
              Our workshop is equipped for precision laser cutting, press brake bending, metal
              fabrication, powder coating, and custom assembly. This integrated capability means
              your project can be managed from raw material through to finished product.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/services/laser-cutting-precision.jpeg"
              alt="Precision laser cut metal components in production"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/services/powder-coating-line.jpeg"
              alt="Powder coating production line at Orion Metal Industries"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Quality"
              title="Quality Focus"
              description="Quality workmanship is at the centre of everything we produce."
              light
            />
            <ul className="mt-6 space-y-3">
              {company.values.map((v) => (
                <li key={v.title} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-brand-red" />
                  <span>
                    <strong className="text-brand-black">{v.title}</strong> — {v.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-dark">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Location"
              title={`Based in ${company.address.suburb}, Victoria`}
              description="Conveniently located in Moorabbin, we serve commercial and industrial clients across Melbourne and Victoria."
            />
            <address className="mt-6 not-italic text-brand-muted leading-relaxed">
              {company.address.full}
            </address>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="md">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="relative min-h-[350px] overflow-hidden border border-white/10">
            <iframe
              src={company.location.embedUrl}
              title="Orion Metal Industries — Moorabbin Victoria location"
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
