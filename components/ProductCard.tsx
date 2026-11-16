import Link from "next/link";
import Pic from "./Pic";
import type { Product } from "@/lib/products";
export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.handle}`} className="group block">
      <h2 className="mb-2 text-[11px] font-medium md:text-sm">{p.title}</h2>
      <div className="relative aspect-square overflow-hidden bg-ph"><div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"><Pic src={p.images[0]} alt={p.title} sizes="(min-width:768px) 33vw, 50vw" /></div></div>
    </Link>
  );
}
