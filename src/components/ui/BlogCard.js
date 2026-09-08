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
      <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-white shadow-[0_1px_2px_rgba(6,6,8,0.04),0_18px_40px_-28px_rgba(6,6,8,0.28)] hover:-translate-y-1.5 hover:border-ink/[0.14] hover:shadow-[0_2px_4px_rgba(6,6,8,0.05),0_36px_70px_-32px_rgba(6,6,8,0.4)]">
        {post.coverImage && (
          <Link
            href={`/blog/${post.slug}`}
            className="relative block aspect-[16/10] overflow-hidden bg-ink-3"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              sizes="(max-width:640px) 92vw, (max-width:1024px) 46vw, 32vw"
            />
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="absolute left-3.5 top-3.5 rounded-full bg-ink/85 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm sm:left-4 sm:top-4"
              >
                {formatDate(post.publishedAt)}
              </time>
            )}
          </Link>
        )}

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-[17px] font-bold leading-snug text-ink sm:text-[19px]">
            <Link
              href={`/blog/${post.slug}`}
              className="transition-colors duration-300 hover:text-brand-red"
            >
              {post.title}
            </Link>
          </h3>

          <p className="mt-3 flex-1 text-[13.5px] leading-[1.7] text-ink-4/70">{post.excerpt}</p>

          {post.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/[0.07] bg-ink/[0.035] px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-ink-4/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/blog/${post.slug}`}
            className="mt-6 inline-flex items-center gap-2 self-start text-[10.5px] font-bold uppercase tracking-[0.2em] text-brand-red transition-colors duration-300 hover:text-brand-red-dark"
          >
            Read Article
            <svg
              className="h-3 w-3 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" />
            </svg>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function BlogGrid({ posts }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
