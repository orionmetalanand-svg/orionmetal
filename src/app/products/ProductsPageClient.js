"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ProductsPageClient({ products, categories }) {
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-red/10 blur-[150px]" />

      <div className="section-padding container-wide relative">
        <SectionHeading
          eyebrow="Catalogue"
          title="Fabricated Product Range"
          accentWord="Product"
          description="Filter by category to explore our custom fabrication capabilities. This catalogue is managed in Supabase and can be updated at any time."
          align="center"
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                category === cat
                  ? "bg-brand-red text-white shadow-[0_10px_34px_-12px_rgba(225,29,46,0.85)]"
                  : "glass text-white/65 hover:border-brand-red/45 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12">
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <p className="text-center text-sm text-brand-muted">
              No products in this category yet.
            </p>
          )}
        </div>

        <p className="mt-10 text-center text-xs text-brand-faint">
          Showing {filtered.length} of {products.length} products
        </p>
      </div>
    </section>
  );
}
