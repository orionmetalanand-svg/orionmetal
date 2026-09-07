import Link from "next/link";
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

      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Blog"
            title="Fabrication Insights & Industry Articles"
            description="Expert articles on sheet metal fabrication, laser cutting, powder coating, and commercial manufacturing in Moorabbin and Melbourne."
            align="center"
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          {posts.length > 0 ? (
            <BlogGrid posts={posts} />
          ) : (
            <p className="text-center text-gray-600">
              Articles coming soon. Publish posts in Supabase to appear here.
            </p>
          )}
        </div>
      </section>

      <CTASection
        title="Need Fabrication Advice?"
        description="Contact our team for expert guidance on your sheet metal project."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
      />
    </>
  );
}
