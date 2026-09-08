"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ProductsPageClient({ products, categories }) {
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <section className="relative overflow-hidden bg-ink-2">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-red/[0.09] blur-[150px]" />

      <div className="section-padding container-wide relative">
        <SectionHeading
          eyebrow="Catalogue"
          title="Fabricated Product Range"
          accentWord="Product"
          description="Filter by category to explore our custom fabrication capabilities. Product images show real Orion work; catalogue data can be managed in Supabase."
          align="center"
        />

        <div
          className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-14 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          role="group"
          aria-label="Filter products by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`shrink-0 rounded-full px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 ${
                category === cat
                  ? "border border-brand-red/70 bg-[linear-gradient(180deg,#f0263a_0%,#e11d2e_55%,#c0142a_100%)] text-white shadow-red"
                  : "glass text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <p className="text-center text-sm text-brand-muted">
              No products in this category yet.
            </p>
          )}
        </div>

        <p className="mt-9 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-faint sm:mt-12">
          Showing {filtered.length} of {products.length} products
        </p>
      </div>
    </section>
  );
}
