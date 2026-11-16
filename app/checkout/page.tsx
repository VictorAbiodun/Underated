"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { naira } from "@/lib/products";
import { shippingFor } from "@/lib/shipping";
const field = "w-full border border-line bg-transparent px-4 py-4 text-sm normal-case placeholder:text-mute focus:border-white";
export default function Checkout() {
  const { items, subtotal } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState("lagos");
  const ship = shippingFor(state);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setBusy(true); setError("");
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, items }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Something went wrong. Try again.");
      window.location.href = j.url;
    } catch (err) { setError((err as Error).message); setBusy(false); }
  };
  if (!items.length) return <main className="px-5 py-24 text-center md:px-16"><p className="mb-6 text-xs text-mute">Your cart is empty.</p><Link href="/collections/new" className="text-xs font-bold tracking-[.25em] underline">SHOP NEW</Link></main>;
  return (
    <main className="grid gap-12 px-5 pb-8 pt-4 md:grid-cols-2 md:gap-24 md:px-16">
      <form onSubmit={submit} className="space-y-4">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tighter md:text-6xl">CHECKOUT</h1>
        <input name="name" required autoComplete="name" placeholder="Full name" className={field} />
        <input name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
        <input name="phone" type="tel" required autoComplete="tel" placeholder="Phone number" className={field} />
        <textarea name="address" required rows={3} autoComplete="street-address" placeholder="Delivery address (street, city, state)" className={field} />
        <select name="state" value={state} onChange={(e) => setState(e.target.value)} aria-label="Delivery area" className={field}><option value="lagos">Lagos</option><option value="other">Outside Lagos</option></select>
        {error && <p role="alert" className="text-xs font-bold text-red">{error}</p>}
        <button disabled={busy} className="w-full bg-white py-5 text-xs font-bold tracking-[.25em] text-black transition-colors hover:bg-red hover:text-white disabled:opacity-50">{busy ? "REDIRECTING TO PAYSTACK" : `PAY ${naira(subtotal + ship)}`}</button>
      </form>
      <section aria-label="Order summary" className="md:pt-24">
        {items.map((i) => (
          <div key={i.handle + i.size} className="flex justify-between border-t border-line py-4 text-[13px]"><span>{i.title} / {i.size} × {i.qty}</span><span className="font-bold">{naira(i.price * i.qty)}</span></div>
        ))}
        <div className="flex justify-between border-t border-line py-4 text-[13px]"><span>SHIPPING</span><span className="font-bold">{naira(ship)}</span></div>
        <div className="flex justify-between border-t border-line pt-4 text-sm font-bold"><span>TOTAL</span><span>{naira(subtotal + ship)}</span></div>
      </section>
    </main>
  );
}
