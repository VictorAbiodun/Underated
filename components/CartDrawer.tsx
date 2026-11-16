"use client";
import Link from "next/link";
import { useEffect } from "react";
import Pic from "./Pic";
import { useCart } from "./CartProvider";
import { naira } from "@/lib/products";
export default function CartDrawer() {
  const { items, count, subtotal, open, setOpen, setQty, remove } = useCart();
  useEffect(() => { const f = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", f); return () => removeEventListener("keydown", f); }, [setOpen]);
  return (
    <>
      {open && <div className="fixed inset-0 z-[60] bg-black/60" onClick={() => setOpen(false)} />}
      <aside role="dialog" aria-label="Cart" aria-hidden={!open} inert={!open} className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-line bg-bg transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-5"><h2 className="text-xs font-bold tracking-[.2em]">CART ({count})</h2><button aria-label="Close cart" onClick={() => setOpen(false)} className="h-11 w-11 text-3xl leading-none">×</button></div>
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 && <div className="py-16 text-center"><p className="mb-6 text-xs text-mute">Your cart is empty.</p><Link href="/collections/new" onClick={() => setOpen(false)} className="text-xs font-bold tracking-[.25em] underline">SHOP NEW</Link></div>}
          {items.map((i) => (
            <div key={i.handle + i.size} className="flex gap-4 border-t border-line py-5">
              <div className="relative h-24 w-24 shrink-0 bg-ph"><Pic src={i.image} alt={i.title} sizes="96px" /></div>
              <div className="flex flex-1 flex-col justify-between">
                <div><p className="text-[13px] font-bold">{i.title}</p><p className="mt-1 text-[11px] text-mute">SIZE {i.size}</p></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-line text-sm">
                    <button aria-label="Decrease" onClick={() => setQty(i.handle, i.size, i.qty - 1)} className="h-9 w-9">−</button>
                    <span className="w-6 text-center text-xs">{i.qty}</span>
                    <button aria-label="Increase" onClick={() => setQty(i.handle, i.size, i.qty + 1)} className="h-9 w-9">+</button>
                  </div>
                  <span className="text-[13px] font-bold">{naira(i.price * i.qty)}</span>
                </div>
              </div>
              <button aria-label={`Remove ${i.title}`} onClick={() => remove(i.handle, i.size)} className="self-start text-[11px] text-mute underline">REMOVE</button>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="border-t border-line p-5">
            <div className="mb-4 flex justify-between text-sm font-bold"><span>SUBTOTAL</span><span>{naira(subtotal)}</span></div>
            <Link href="/checkout" onClick={() => setOpen(false)} className="block bg-white py-5 text-center text-xs font-bold tracking-[.25em] text-black transition-colors hover:bg-red hover:text-white">CHECKOUT</Link>
          </div>
        )}
      </aside>
    </>
  );
}
