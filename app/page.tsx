import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { DEFAULT_PRODUCTS } from "@/lib/products";

export const revalidate = 60;

export default function Home() {
  const featured = DEFAULT_PRODUCTS.slice(0, 4);

  return (
    <main className="bg-black text-white">
      {/* ── Lookbook Hero (Identical on both Mobile & Desktop) ── */}
      <HeroSlider />

      {/* ── Laptop / Desktop Only: bolapsd.xyz style Featured Section Below Hero ── */}
      <section className="hidden md:block bg-[#181818] py-20 px-10 lg:px-16 border-t border-line/40">
        <div className="max-w-[1720px] mx-auto">
          {/* Section Header */}
          <div className="flex items-end justify-between border-b border-line pb-6 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red block mb-1">
                SPRING / SUMMER 2026
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              href="/collections/all"
              prefetch={true}
              className="text-xs font-bold tracking-[0.25em] uppercase text-white hover:text-red transition-colors underline underline-offset-4"
            >
              VIEW ALL ({DEFAULT_PRODUCTS.length}) →
            </Link>
          </div>

          {/* 4-Column Desktop Grid */}
          <div className="grid grid-cols-4 gap-6 lg:gap-8">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>

          {/* Editorial Campaign Banner */}
          <div className="mt-20 border border-line/60 bg-black/50 p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold tracking-[0.3em] text-mute uppercase block mb-2">
                LAGOS UNDERGROUND CULTURE
              </span>
              <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-4">
                BUILT IN LAGOS. WORN WORLDWIDE.
              </h3>
              <p className="text-sm text-mute leading-relaxed">
                Raw urban aesthetics forged in Mainland Lagos. Heavyweight 240+ GSM cotton, boxy drop-shoulder cuts, and enduring screen prints designed for the streets.
              </p>
            </div>
            <Link
              href="/collections/all"
              className="shrink-0 px-8 py-4 border border-white bg-white text-black font-bold text-xs tracking-[0.25em] uppercase hover:bg-transparent hover:text-white transition-all"
            >
              EXPLORE FULL CATALOG
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
