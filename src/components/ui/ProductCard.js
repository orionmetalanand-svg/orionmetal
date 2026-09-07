import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function ProductCard({ product, index = 0 }) {
  return (
    <Reveal delay={index * 60} className="h-full">
      <article className="group hover-lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-dark hover:-translate-y-1.5 hover:border-brand-red/40 hover:shadow-[0_28px_70px_-30px_rgba(225,29,46,0.55)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray">
          <Image
            src={product.image}
            alt={`${product.name} — custom fabrication by Orion Metal Industries`}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 32vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/20 to-transparent" />
          <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85">
            {product.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-brand-red-bright sm:text-xl">
            {product.name}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
            {product.description}
          </p>

          {product.application && (
            <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.03] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red">
                Application
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-muted">
                {product.application}
              </p>
            </div>
          )}

          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-brand-red/40 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red transition-all duration-300 hover:bg-brand-red hover:text-white"
          >
            Enquire Now
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
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
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {productList.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
