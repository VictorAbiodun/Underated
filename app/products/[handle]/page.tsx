import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { getProduct } from "@/lib/products";
export const revalidate = 60;
export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const p = await getProduct((await params).handle);
  if (!p) notFound();
  return <main className="pt-2"><ProductView p={p} /></main>;
}
