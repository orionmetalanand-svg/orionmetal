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
        title="Custom Sheet Metal Enclosures & Kiosk Products Melbourne"
        accentWord="Melbourne"
        description="Sheet metal enclosure fabrication Melbourne — wayfinding pylons, digital kiosk housings and custom metal products powder coated at our Moorabbin VIC workshop."
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
