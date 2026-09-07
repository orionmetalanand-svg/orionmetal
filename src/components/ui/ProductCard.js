import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

/**
 * Modern product card — image-led with glass overlay.
 * Uses Orion product photos; optional coverImage can be stock.
 */
export default function ProductCard({ product, index = 0, featured = false }) {
  const imageSrc = product.image || product.coverImage;

  return (
    <Reveal delay={index * 60} className="h-full">
      <article
        className={`group hover-lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-black hover:-translate-y-1.5 hover:border-brand-red/45 hover:shadow-[0_28px_70px_-30px_rgba(225,29,46,0.55)] ${
          featured ? "min-h-[28rem]" : ""
        }`}
      >
        {/* Image */}
        <div className="relative aspect-[5/4] overflow-hidden bg-brand-gray sm:aspect-[4/3]">
          <Image
            src={imageSrc}
            alt={`${product.name} — custom fabrication by Orion Metal Industries`}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 32vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/0 via-transparent to-brand-red/0 transition-all duration-500 group-hover:from-brand-red/20" />

          <span className="glass absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 sm:left-4 sm:top-4">
            {product.category}
          </span>

          {/* Title overlay on image for stronger visual hierarchy */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-brand-muted">
            {product.description}
          </p>

          {product.application && (
            <p className="mt-3 truncate text-[11px] text-brand-faint">
              <span className="font-semibold text-brand-red">Use · </span>
              {product.application}
            </p>
          )}

          <Link
            href="/contact"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-brand-red-bright sm:w-auto"
          >
            Enquire Now
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function ProductGrid({ products: productList }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {productList.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
