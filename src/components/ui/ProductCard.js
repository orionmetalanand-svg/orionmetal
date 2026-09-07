import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function ProductCard({ product, index = 0 }) {
  const imageSrc = product.coverImage || product.image;

  return (
    <Reveal delay={index * 50} className="h-full">
      <article className="group hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-black transition-all duration-300 hover:border-brand-red/45 hover:shadow-[0_20px_50px_-24px_rgba(225,29,46,0.55)]">
        {/* Image — landscape ratio works on all screen sizes */}
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-gray sm:aspect-[5/3]">
          <Image
            src={imageSrc}
            alt={`${product.name} — custom fabrication by Orion Metal Industries`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-brand-black/75 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
            {product.category}
          </span>
        </div>

        {/* Content — title below image for clear mobile readability */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-brand-muted sm:line-clamp-3 sm:text-sm">
            {product.description}
          </p>

          {product.application && (
            <p className="mt-3 hidden text-[11px] leading-relaxed text-brand-faint sm:block">
              <span className="font-semibold text-brand-red">Application · </span>
              {product.application}
            </p>
          )}

          <Link
            href="/contact"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-red/50 bg-brand-red/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-red-bright transition-all duration-300 hover:bg-brand-red hover:text-white sm:mt-5 sm:w-auto sm:px-5 sm:py-3 sm:text-[11px]"
          >
            Enquire Now
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
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
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {productList.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
