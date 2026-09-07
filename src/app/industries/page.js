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
        title="Industries We Serve"
        accentWord="Serve"
        description="Precision sheet metal fabrication for commercial, industrial, manufacturing, construction and engineering sectors. These represent our target application areas across Melbourne and Victoria."
        image="/images/projects/palletized-fabrication-shipping.jpeg"
        imageAlt="Palletised industrial fabrication ready for dispatch"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        primaryCta={{ label: "Discuss Your Project", href: "/contact" }}
      />

      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-red/10 blur-[150px]" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Sectors"
            title="Application Areas We Support"
            accentWord="Support"
            description="Each sector has different tolerance, finish and delivery requirements. We adapt our process to suit the application."
            align="center"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
