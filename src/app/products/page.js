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
      <ProductsPageClient products={products} categories={categories} />
    </>
  );
}
