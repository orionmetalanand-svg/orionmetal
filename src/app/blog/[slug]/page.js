import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "@/components/sections/BlogContent";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { BlogGrid } from "@/components/ui/BlogCard";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/supabase/queries";
import { siteConfig } from "@/data/seo";
import { company } from "@/data/company";
import { getWhatsAppUrl } from "@/lib/whatsapp";
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
    twitter: { card: "summary_large_image", title, description },
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

  const allPosts = await getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

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
        {/* Header */}
        <header className="relative isolate overflow-hidden bg-brand-black pb-16 pt-14 lg:pb-20 lg:pt-20">
          <div className="absolute inset-0 -z-10">
            {post.coverImage && (
              <>
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  priority
                  quality={70}
                  className="object-cover opacity-15"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/92 to-brand-black" />
              </>
            )}
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="absolute inset-0 bg-radial-red" />
          </div>

          <div className="container-wide container-gutter max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-brand-faint">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-red">
                    Home
                  </Link>
                </li>
                <li className="text-white/20">/</li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-brand-red">
                    Blog
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              {post.publishedAt && (
                <time
                  dateTime={post.publishedAt}
                  className="glass-red rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red-bright"
                >
                  {formatDate(post.publishedAt)}
                </time>
              )}
              <span className="text-[11px] uppercase tracking-[0.16em] text-brand-faint">
                {post.author || company.name}
              </span>
            </div>

            <h1 className="mt-6 text-[1.85rem] font-extrabold leading-[1.08] sm:text-[2.6rem] lg:text-[3.2rem]">
              <span className="gradient-white-text">{post.title}</span>
            </h1>

            <p className="mt-6 text-[15px] leading-[1.75] text-brand-muted sm:text-[17.5px]">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative -mt-4 bg-brand-black pb-4">
            <div className="container-wide container-gutter max-w-5xl">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.09] shadow-lift sm:aspect-[21/9] sm:rounded-3xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 1024px"
                />
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-grid-light opacity-60" />

          <div className="section-padding container-wide relative max-w-3xl">
            <BlogContent content={post.content} />

            {post.tags?.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-black/8 pt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-black/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 border-t border-ink/[0.08] pt-8 sm:flex-row sm:flex-wrap">
              <Button href="/contact" variant="primary" size="md" className="w-full sm:w-auto">
                Request a Quote
              </Button>
              <Button
                href={getWhatsAppUrl()}
                variant="outline"
                size="md"
                external
                className="w-full sm:w-auto"
              >
                WhatsApp Us
              </Button>
              <Button
                href="/blog"
                variant="ghost"
                size="md"
                className="w-full text-ink-4/55 hover:border-ink/12 hover:text-brand-red sm:w-auto"
              >
                More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="relative overflow-hidden bg-ink-2">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute inset-0 bg-noise opacity-[0.035]" />

            <div className="section-padding container-wide relative">
              <Reveal>
                <h2 className="text-[1.6rem] font-extrabold sm:text-3xl">
                  <span className="gradient-white-text">Related </span>
                  <span className="text-brand-red">Articles</span>
                </h2>
              </Reveal>
              <div className="mt-10 sm:mt-12">
                <BlogGrid posts={related} />
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection />
    </>
  );
}
