import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { admin } from "@/lib/supabase-admin";
import { shippingFor } from "@/lib/shipping";

export const dynamic = "force-dynamic";

type In = { handle: string; size: string; qty: number };
export async function POST(req: Request) {
  const { name, email, phone, address, state: st, items } = await req.json();
  if (!name || !email || !phone || !address || !Array.isArray(items) || !items.length) return NextResponse.json({ error: "Fill in every field." }, { status: 400 });
  // Re-price from the database. Never trust prices sent by the browser.
  const { data: prods } = await supabase.from("products").select("handle,title,price_ngn,sizes").in("handle", items.map((i: In) => i.handle));
  let total = 0;
  const lines = [];
  for (const i of items as In[]) {
    const p = prods?.find((x) => x.handle === i.handle);
    const qty = Math.max(1, Math.min(10, Number(i.qty) || 1));
    if (!p || !(p.sizes?.[i.size] > 0)) return NextResponse.json({ error: `${p?.title ?? i.handle} in size ${i.size} is sold out. Remove it and try again.` }, { status: 409 });
    total += p.price_ngn * qty;
    lines.push({ handle: p.handle, title: p.title, size: i.size, qty, price: p.price_ngn });
  }
  const state = st === "lagos" ? "lagos" : "other";
  const shipping = shippingFor(state);
  total += shipping;
  const reference = `UND-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const { error } = await admin.from("orders").insert({ reference, name, email, phone, address, state, shipping_ngn: shipping, items: lines, total_ngn: total });
  if (error) return NextResponse.json({ error: "Could not create your order. Try again." }, { status: 500 });
  const r = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount: total * 100, currency: "NGN", reference, callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success` }),
  });
  const j = await r.json();
  if (!j.status) return NextResponse.json({ error: "Payment could not start. Try again." }, { status: 502 });
  return NextResponse.json({ url: j.data.authorization_url });
}
