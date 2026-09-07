"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/ui/ProductCard";
import CTASection from "@/components/sections/CTASection";

export default function ProductsPageClient({ products, categories }) {
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <>
      <section className="section-padding bg-brand-black">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Products"
            title="Products & Capabilities"
            description="Custom-fabricated metal products and components for commercial, industrial, and architectural applications. Products are managed via Supabase — update anytime without code changes."
            align="center"
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  category === cat
                    ? "bg-brand-red text-white"
                    : "border border-gray-300 text-gray-600 hover:border-brand-red hover:text-brand-red"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <ProductGrid products={filtered} />
        </div>
      </section>

      <CTASection
        title="Need a Custom Fabrication?"
        description="Send us your drawings or specifications and we will provide a quote for your custom metal product."
      />
    </>
  );
}
