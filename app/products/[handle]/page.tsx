import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { getProduct, DEFAULT_PRODUCTS } from "@/lib/products";

export const revalidate = 120;

export function generateStaticParams() {
  return DEFAULT_PRODUCTS.map((p) => ({
    handle: p.handle,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const p = await getProduct((await params).handle);
  if (!p) notFound();
  return (
    <main className="pt-2">
      <ProductView p={p} />
    </main>
  );
}
