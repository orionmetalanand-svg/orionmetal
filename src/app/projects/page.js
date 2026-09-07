import SectionHeading from "@/components/ui/SectionHeading";
import ProjectGallery from "@/components/ui/ProjectGallery";
import CTASection from "@/components/sections/CTASection";
import { projects } from "@/data/projects";
import { getPageMetadata } from "@/data/seo";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("projects");

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Projects"
            title="Fabrication Gallery"
            description="A visual showcase of our laser cutting, fabrication, powder coating, and assembly work. Filter by category to explore our capabilities."
            align="center"
          />
        </div>
      </section>

      <section className="section-padding bg-brand-dark">
        <div className="container-wide">
          <ProjectGallery projects={projects} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
