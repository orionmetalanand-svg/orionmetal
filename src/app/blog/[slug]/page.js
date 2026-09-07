import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "@/components/sections/BlogContent";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/supabase/queries";
import { siteConfig } from "@/data/seo";
import { company } from "@/data/company";
import { JsonLd, getArticleSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return { title: "Article Not Found" };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${company.shortName}`,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [{ url: `${siteConfig.url}${post.coverImage}`, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd data={getArticleSchema(post)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article>
        <header className="section-padding bg-brand-black">
          <div className="container-wide max-w-4xl">
            <Link href="/blog" className="text-sm font-semibold uppercase tracking-wide text-brand-red hover:underline">
              ← Back to Blog
            </Link>
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="mt-4 block text-sm text-brand-muted">
                {formatDate(post.publishedAt)}
              </time>
            )}
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-brand-muted">{post.excerpt}</p>
            <p className="mt-4 text-sm text-brand-muted">By {post.author || company.name}</p>
          </div>
        </header>

        {post.coverImage && (
          <div className="relative aspect-[21/9] w-full bg-brand-dark">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="section-padding bg-white">
          <div className="container-wide max-w-3xl">
            <BlogContent content={post.content} />

            {post.tags?.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="border border-gray-200 px-3 py-1 text-sm text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4 border-t border-gray-200 pt-8">
              <Button href="/contact" variant="primary" size="md">
                Request a Quote
              </Button>
              <Button href="/blog" variant="outline" size="md">
                More Articles
              </Button>
            </div>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
