"use client";
import { useState } from "react";
import Pic from "./Pic";
import { useCart } from "./CartProvider";
import { naira, type Product } from "@/lib/products";
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export default function ProductView({ p }: { p: Product }) {
  const [img, setImg] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const [brand, ...rest] = ["UNDERATED", ...p.title.split(" ")];
  const sizeOf = [40, 28, 20];
  const onAdd = () => {
    if (!size) return setHint(true);
    add({ handle: p.handle, title: p.title, size, price: p.price_ngn, image: p.images[0] });
    setAdded(true); setTimeout(() => setAdded(false), 1800);
  };
  const share = async () => { const url = location.href; try { navigator.share ? await navigator.share({ title: p.title, url }) : await navigator.clipboard.writeText(url); } catch {} };
  return (
    <div className="grid gap-8 px-5 pb-8 md:grid-cols-[1fr_480px] md:gap-24 md:px-16">
      <div className="flex flex-col gap-3 md:flex-row-reverse md:gap-4">
        <div className="relative aspect-[4/5] flex-1 bg-transparent"><Pic src={p.images[img]} alt={p.title} sizes="(min-width:768px) 50vw, 100vw" priority contain /></div>
        <div className="flex gap-3 md:w-24 md:flex-col">
          {p.images.map((s, i) => (
            <button key={s} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className={`relative h-1 w-10 md:aspect-[4/5] md:h-auto md:w-full ${i === img ? "bg-red md:outline md:outline-2 md:outline-red" : "bg-mute md:bg-transparent"}`}>
              <span className="hidden md:block"><Pic src={s} alt="" sizes="96px" contain /></span>
            </button>
          ))}
        </div>
      </div>
      <div className="md:sticky md:top-8 md:self-start">
        <h1 className="mb-6 leading-[.95] tracking-tight">{[brand, ...rest.slice(0, 2), rest.slice(2).join(" ")].filter(Boolean).map((w, i) => <span key={i} className="block font-extrabold" style={{ fontSize: `${sizeOf[Math.min(i, 2)] * 1.2}px` }}>{w}</span>)}</h1>
        <p className="text-2xl font-bold">{naira(p.price_ngn)}</p>
        <p className="mb-6 mt-1 text-[13px] text-mute">Pay in 4 installments</p>
        <p className="mb-3 text-[11px] text-mute">SIZE</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {SIZES.map((s) => { const out = !(p.sizes[s] > 0); return (
            <button key={s} disabled={out} aria-pressed={size === s} onClick={() => { setSize(s); setHint(false); }}
              className={`h-12 w-[51px] border text-xs font-bold md:h-14 md:w-16 ${size === s ? "border-red bg-red" : "border-line hover:border-white"} ${out ? "text-mute line-through opacity-60" : ""}`}>{s}</button>
          ); })}
        </div>
        {hint && <p role="alert" className="mb-3 text-xs font-bold text-red">Choose a size first</p>}
        <button onClick={onAdd} className="w-full bg-white py-5 text-xs font-bold tracking-[.25em] text-black transition-colors hover:bg-red hover:text-white">{added ? "ADDED" : "ADD TO CART"}</button>
        <button onClick={share} className="mt-4 text-xs font-medium text-mute underline">SHARE</button>
        <div className="mt-6">
          {[["DETAILS", p.details ?? ""], ["SHIPPING", "Shipping details coming soon."], ["RETURNS", "Return policy coming soon."]].map(([t, b], i) => (
            <details key={t} open={i === 0} className="group border-t border-line py-5"><summary className="flex cursor-pointer list-none justify-between text-[13px] font-bold tracking-[.15em]">{t}<span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></summary><p className="mt-3 text-[13px] normal-case text-mute">{b}</p></details>
          ))}
        </div>
      </div>
    </div>
  );
}
