import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import IndustryCard from "@/components/ui/IndustryCard";
import LocationSection from "@/components/sections/LocationSection";
import CTASection from "@/components/sections/CTASection";
import { industries } from "@/data/industries";
import { getPageMetadata } from "@/data/seo";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("industries");

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />

      <PageHero
        eyebrow="Industries"
        title="Industries We Serve in Melbourne & Victoria"
        accentWord="Melbourne"
        description="Sheet metal fabrication in Melbourne and Victoria for commercial, industrial, manufacturing, construction and engineering clients — Australian workshop in Moorabbin."
        image="/images/services/laser-cutting-steel-flanges.jpeg"
        imageAlt="Laser cutting steel flanges at Orion Metal Industries Moorabbin Melbourne"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        primaryCta={{ label: "Discuss Your Project", href: "/contact" }}
      />

      <section className="relative overflow-hidden bg-ink-2">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-red/[0.09] blur-[150px]" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Sectors"
            title="Melbourne Sectors We Support"
            accentWord="Melbourne"
            description="Each sector has different tolerance, finish and delivery requirements. We adapt our fabrication process to suit the application."
            align="center"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
            {industries.map((industry, i) => (
              <IndustryCard key={industry.id} industry={industry} index={i} />
            ))}
          </div>
        </div>
      </section>

      <LocationSection />

      <CTASection
        title="Discuss Your Industry Requirements"
        description="Tell us about your project and we will advise on the best fabrication approach for your application."
      />
    </>
  );
}
