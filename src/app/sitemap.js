import { siteConfig, pageSeo } from "@/data/seo";
import { getBlogPosts } from "@/lib/supabase/queries";

export default async function sitemap() {
  const staticPages = Object.values(pageSeo);
  const lastModified = new Date();

  const staticEntries = staticPages.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified,
    changeFrequency: page.path === "/" || page.path === "/blog" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.path === "/blog" ? 0.9 : 0.8,
  }));

  const blogPosts = await getBlogPosts();
  const blogEntries = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
