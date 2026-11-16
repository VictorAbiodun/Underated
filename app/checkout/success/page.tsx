import Link from "next/link";
import ClearCart from "@/components/ClearCart";
import { admin } from "@/lib/supabase-admin";
import { markPaid } from "@/lib/orders";
export const dynamic = "force-dynamic";
export default async function Success({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const ref = (await searchParams).reference;
  let paid = false;
  if (ref) {
    const r = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }, cache: "no-store" });
    const j = await r.json();
    const { data: o } = await admin.from("orders").select("total_ngn").eq("reference", ref).maybeSingle();
    paid = j.status && j.data?.status === "success" && !!o && j.data.amount === o.total_ngn * 100;
    if (paid) await markPaid(ref!, j.data.amount);
  }
  return (
    <main className="px-5 py-24 md:px-16">
      {paid && <ClearCart />}
      <h1 className="text-5xl font-extrabold tracking-tighter md:text-8xl">{paid ? "ORDER CONFIRMED" : "PAYMENT NOT COMPLETED"}</h1>
      <p className="mt-6 max-w-md text-sm normal-case text-mute">{paid ? `Thank you. Your reference is ${ref}. A receipt is on its way to your email from Paystack.` : "We could not confirm your payment. Your cart is still saved, so you can try again."}</p>
      <Link href={paid ? "/collections/new" : "/checkout"} className="mt-10 inline-block text-xs font-bold tracking-[.25em] underline">{paid ? "KEEP SHOPPING" : "BACK TO CHECKOUT"}</Link>
    </main>
  );
}
