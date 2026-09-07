import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogCard({ post, index = 0 }) {
  return (
    <Reveal delay={index * 70} className="h-full">
      <article className="group hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-black/8 bg-white hover:-translate-y-1.5 hover:border-brand-red/35 hover:shadow-[0_28px_70px_-32px_rgba(8,8,10,0.35)]">
        {post.coverImage && (
          <Link
            href={`/blog/${post.slug}`}
            className="relative block aspect-[16/10] overflow-hidden bg-brand-gray"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 32vw"
            />
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="absolute left-4 top-4 rounded-full bg-brand-black/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm"
              >
                {formatDate(post.publishedAt)}
              </time>
            )}
          </Link>
        )}

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-bold leading-snug text-brand-black sm:text-xl">
            <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-red">
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>

          {post.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-black/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/blog/${post.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red"
          >
            Read Article
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function BlogGrid({ posts }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
