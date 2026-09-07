import PageHero from "@/components/sections/PageHero";
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

      <PageHero
        eyebrow="Gallery"
        title="Fabrication Project Gallery"
        accentWord="Project"
        description="A visual showcase of our laser cutting, fabrication, powder coating and assembly work. Filter by category to explore each capability."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Commercial construction and structural steelwork"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-red/10 blur-[150px]" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Our Work"
            title="Selected Fabrication Work"
            accentWord="Fabrication"
            description="Click any image to view it larger. Use arrow keys to browse the gallery."
            align="center"
          />

          <div className="mt-12">
            <ProjectGallery projects={projects} />
          </div>
        </div>
      </section>

      <CTASection
        title="Have a Similar Project?"
        description="Send us your drawings or describe your requirements and we will advise on the best fabrication approach."
      />
    </>
  );
}
