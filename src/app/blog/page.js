import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { BlogGrid } from "@/components/ui/BlogCard";
import CTASection from "@/components/sections/CTASection";
import { getBlogPosts } from "@/lib/supabase/queries";
import { getPageMetadata } from "@/data/seo";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = getPageMetadata("blog");
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <PageHero
        eyebrow="Insights"
        title="Fabrication Insights & Articles"
        accentWord="Insights"
        description="Practical guidance on sheet metal fabrication, laser cutting, powder coating and commercial manufacturing in Moorabbin and Melbourne."
        image="/images/services/laser-cutting-precision.jpeg"
        imageAlt="Precision laser cut metal components"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-light opacity-60" />

        <div className="section-padding container-wide relative">
          <SectionHeading
            eyebrow="Articles"
            title="Latest From Our Workshop"
            description="Written for procurement managers, engineers and designers sourcing sheet metal fabrication in Victoria."
            align="center"
            light
          />

          <div className="mt-14">
            {posts.length > 0 ? (
              <BlogGrid posts={posts} />
            ) : (
              <p className="text-center text-sm text-gray-600">
                Articles coming soon. Publish posts in Supabase to appear here.
              </p>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Fabrication Advice?"
        description="Contact our team for guidance on materials, tolerances, finishes and lead times for your project."
      />
    </>
  );
}
