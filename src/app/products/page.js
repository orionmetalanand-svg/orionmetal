import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import { getPageMetadata } from "@/data/seo";
import { getProducts, getProductCategories } from "@/lib/supabase/queries";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";
import ProductsPageClient from "./ProductsPageClient";

export const metadata = getPageMetadata("products");
export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = getProductCategories(products);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      <PageHero
        eyebrow="Products"
        title="Kiosk & Sheet Metal Enclosures Melbourne"
        accentWord="Melbourne"
        description="Custom kiosk housings, wayfinding pylons and sheet metal enclosures — laser cut, powder coated and assembled at our Moorabbin, south-east Melbourne workshop. Quotes within 24 hours."
        image="/images/products/metalbody.png"
        imageAlt="Custom sheet metal enclosure fabricated at Orion Metal Industries Moorabbin Melbourne"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        primaryCta={{ label: "Enquire About a Product", href: "/contact" }}
      />

      <ProductsPageClient products={products} categories={categories} />

      <CTASection
        title="Need a Custom Fabrication?"
        description="Send your drawings or specifications and we will provide a quote for your custom metal product."
      />
    </>
  );
}
