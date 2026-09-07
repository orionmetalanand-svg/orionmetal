import { createSupabaseClient } from "./client";
import { products as fallbackProducts } from "@/data/products";
import { trustedCustomers as fallbackCustomers } from "@/data/trusted-customers";
import { googleReviews as fallbackReviews } from "@/data/google-reviews";
import { blogPosts as fallbackBlogPosts } from "@/data/blog-posts";

function mapProduct(row) {
  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    description: row.description,
    application: row.application || "",
    image: row.image_url,
    coverImage: row.cover_image_url || null,
    category: row.category,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
  };
}

function mapBlogPost(row) {
  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image_url,
    author: row.author,
    tags: row.tags || [],
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    publishedAt: row.published_at,
  };
}

function mapCustomer(row) {
  return {
    id: row.id,
    name: row.name,
    industry: row.industry,
    logoUrl: row.logo_url,
    websiteUrl: row.website_url,
  };
}

function mapReview(row) {
  return {
    id: row.id,
    reviewerName: row.reviewer_name,
    rating: row.rating,
    reviewText: row.review_text,
    reviewDate: row.review_date,
    googleReviewUrl: row.google_review_url,
    includeInSchema: row.include_in_schema,
  };
}

export async function getProducts() {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return fallbackProducts;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return fallbackProducts;
  }

  return data.map(mapProduct);
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || p.id === slug) || null;
}

export function getProductCategories(products) {
  return ["All", ...new Set(products.map((p) => p.category))];
}

export async function getBlogPosts(limit) {
  const supabase = createSupabaseClient();

  if (!supabase) {
    const posts = fallbackBlogPosts.filter((p) => p.isPublished);
    return limit ? posts.slice(0, limit) : posts;
  }

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    const posts = fallbackBlogPosts.filter((p) => p.isPublished);
    return limit ? posts.slice(0, limit) : posts;
  }

  return data.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug) {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return fallbackBlogPosts.find((p) => p.slug === slug && p.isPublished) || null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    return fallbackBlogPosts.find((p) => p.slug === slug && p.isPublished) || null;
  }

  return mapBlogPost(data);
}

export async function getAllBlogSlugs() {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}

export async function getTrustedCustomers() {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return fallbackCustomers;
  }

  const { data, error } = await supabase
    .from("trusted_customers")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return fallbackCustomers;
  }

  return data.map(mapCustomer);
}

export async function getGoogleReviews() {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return fallbackReviews;
  }

  const { data, error } = await supabase
    .from("google_reviews")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return fallbackReviews;
  }

  return data.map(mapReview);
}

export async function getSchemaReviews() {
  const reviews = await getGoogleReviews();
  return reviews.filter((r) => r.includeInSchema && r.googleReviewUrl);
}
