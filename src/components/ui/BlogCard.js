"use client";

import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogCard({ post }) {
  return (
    <article className="group flex flex-col overflow-hidden border border-gray-200 bg-white transition-colors hover:border-brand-red/40">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
        {post.publishedAt && (
          <time dateTime={post.publishedAt} className="text-xs font-semibold uppercase tracking-widest text-brand-red">
            {formatDate(post.publishedAt)}
          </time>
        )}
        <h3 className="mt-2 text-xl font-bold text-brand-black">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-red">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-gray-600 leading-relaxed">{post.excerpt}</p>
        {post.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border border-gray-200 px-2 py-1 text-xs text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-red hover:underline"
        >
          Read Article →
        </Link>
      </div>
    </article>
  );
}

export function BlogGrid({ posts }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
