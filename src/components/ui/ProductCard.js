import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function ProductCard({ product, index = 0 }) {
  const imageSrc = product.coverImage || product.image;

  return (
    <Reveal delay={index * 55} className="h-full">
      <article className="panel hover-lift group relative flex h-full flex-col overflow-hidden rounded-2xl hover:-translate-y-1.5 hover:border-white/15 hover:shadow-lift">
        <span className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

        {/* Landscape ratio reads well from 320px up */}
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
          <Image
            src={imageSrc}
            alt={`${product.name} — custom fabrication by Orion Metal Industries`}
            fill
            className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            sizes="(max-width:480px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-ink-3/10 to-transparent" />

          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.16em] text-white/85 sm:left-4 sm:top-4">
            {product.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="text-[15.5px] font-bold leading-snug text-white sm:text-[17px]">
            {product.name}
          </h3>

          <p className="mt-2.5 line-clamp-2 flex-1 text-[13px] leading-[1.65] text-brand-muted sm:line-clamp-3 sm:text-[13.5px]">
            {product.description}
          </p>

          {product.application && (
            <p className="mt-3.5 hidden border-t border-white/[0.06] pt-3.5 text-[11px] leading-relaxed text-brand-faint sm:block">
              <span className="font-bold uppercase tracking-[0.14em] text-brand-red">
                Application
              </span>
              <span className="mx-1.5 text-white/20">/</span>
              {product.application}
            </p>
          )}

          <Link
            href="/contact"
            aria-label={`Enquire about ${product.name}`}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/[0.09] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red-bright transition-all duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white sm:mt-5 sm:w-auto sm:self-start sm:px-5"
          >
            Enquire
            <svg
              className="h-3 w-3 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
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

export function ProductGrid({ products: productList }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {productList.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
