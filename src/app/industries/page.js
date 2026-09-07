import SectionHeading from "@/components/ui/SectionHeading";
import IndustryCard from "@/components/ui/IndustryCard";
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

      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Industries"
            title="Industries We Serve"
            description="We support commercial, industrial, manufacturing, construction, and engineering sectors with precision sheet metal fabrication. These represent our target application areas across Melbourne and Victoria."
            align="center"
          />
        </div>
      </section>

      <section className="section-padding bg-brand-dark">
        <div className="container-wide grid gap-6 sm:grid-cols-2">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>
      </section>

      <CTASection
        title="Discuss Your Industry Requirements"
        description="Tell us about your project and industry requirements. We will advise on the best fabrication approach for your application."
      />
    </>
  );
}
