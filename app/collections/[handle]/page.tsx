import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
export const revalidate = 60;
export default async function Collection({ params, searchParams }: { params: Promise<{ handle: string }>; searchParams: Promise<{ page?: string }> }) {
  const { handle } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const { products, hasNext } = await getProducts(handle, page);
  return (
    <main className="px-5 pb-8 md:px-16">
      <div className="flex items-end justify-between py-6">
        <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl">{handle}</h1>
        <span className="text-[11px] font-bold tracking-[.2em] text-red">{products.length} ITEMS</span>
      </div>
      {products.length === 0 && <p className="py-24 text-center text-xs text-mute">Nothing here yet. Check back soon.</p>}
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 md:gap-x-12 md:gap-y-16">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      {hasNext && <div className="mt-16 text-center"><Link href={`?page=${page + 1}`} className="text-xs font-bold tracking-[.25em] underline">NEXT PAGE</Link></div>}
    </main>
  );
}
