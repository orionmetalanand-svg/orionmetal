import Image from "next/image";
import Button from "./Button";

export default function ProductCard({ product }) {
  return (
    <article className="group flex flex-col overflow-hidden border border-gray-200 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} — Orion Metal Industries`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-red">
          {product.category}
        </span>
        <h3 className="mt-2 text-xl font-bold text-brand-black">{product.name}</h3>
        <p className="mt-3 flex-1 text-gray-600 leading-relaxed">{product.description}</p>
        <p className="mt-3 text-sm text-gray-500">
          <span className="font-semibold text-brand-black">Application:</span>{" "}
          {product.application}
        </p>
        <div className="mt-6">
          <Button href="/contact" variant="primary" size="sm">
            Enquire
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products: productList }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
