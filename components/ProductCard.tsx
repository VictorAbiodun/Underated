"use client";

import Link from "next/link";
import Image from "next/image";
import { naira, type Product } from "@/lib/products";

export default function ProductCard({ p }: { p: Product }) {
  const isSoldOut =
    p.sizes && Object.keys(p.sizes).length > 0
      ? !Object.values(p.sizes).some((qty) => qty > 0)
      : false;

  const frontImage = p.images?.[0] || "/editorial-streetwear.jpg";
  const backImage = p.images?.[1];

  return (
    <article className="group isolate relative flex flex-col gap-2.5 text-start">
      {/* ── 4:5 Portrait Studio Image Container (bolapsd style) ── */}
      <Link
        href={`/products/${p.handle}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-white transition-colors rounded-[2px]"
        aria-label={p.title}
      >
        {/* Front Image */}
        <Image
          src={frontImage}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          unoptimized
          className={`object-cover object-center transition-all duration-500 ${
            backImage
              ? "group-hover:opacity-0"
              : "group-hover:scale-[1.05]"
          }`}
        />

        {/* Back / Alternate Model View (Hover Swap) */}
        {backImage && (
          <Image
            src={backImage}
            alt={`${p.title} alternate view`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            unoptimized
            className="pointer-events-none absolute inset-0 object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Sold out badge */}
        {isSoldOut && (
          <span className="absolute left-2.5 top-2.5 bg-black/90 px-2 py-1 text-[9px] font-bold tracking-widest text-white backdrop-blur-sm">
            SOLD OUT
          </span>
        )}
      </Link>

      {/* ── Product Info Below Image ── */}
      <div className="flex flex-col gap-1 px-0.5">
        <Link
          href={`/products/${p.handle}`}
          className="text-[11px] font-semibold uppercase leading-tight tracking-tight text-white/95 hover:text-white md:text-xs"
        >
          {p.title}
        </Link>
        <div className="flex items-baseline justify-between text-[11px] md:text-xs">
          <span className="font-bold tracking-tight text-white">
            {naira(p.price_ngn)}
          </span>
          {isSoldOut ? (
            <span className="text-[9px] font-bold uppercase tracking-wider text-mute">
              Sold out
            </span>
          ) : (
            <span className="text-[9px] uppercase tracking-wider text-mute">
              {p.collection}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
