import {
  absoluteUrl,
  getStaticSitemapPages,
} from "@/data/seo";
import { getBlogPosts } from "@/lib/supabase/queries";

const PRIORITY_BY_PATH = {
  "/": 1,
  "/contact": 0.9,
  "/services": 0.9,
  "/products": 0.85,
  "/projects": 0.85,
  "/about": 0.8,
  "/industries": 0.8,
  "/blog": 0.85,
  "/privacy": 0.25,
  "/terms": 0.25,
};

const CHANGE_FREQ_BY_PATH = {
  "/": "weekly",
  "/blog": "weekly",
  "/services": "monthly",
  "/products": "monthly",
  "/projects": "monthly",
};

export default async function sitemap() {
  const staticPages = getStaticSitemapPages();
  const lastModified = new Date();

  const staticEntries = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: CHANGE_FREQ_BY_PATH[page.path] || "monthly",
    priority: PRIORITY_BY_PATH[page.path] ?? 0.7,
  }));

  const blogPosts = await getBlogPosts();
  const blogEntries = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...blogEntries];
}
