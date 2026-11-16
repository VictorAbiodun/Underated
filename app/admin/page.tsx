import { revalidatePath } from "next/cache";
import { admin } from "@/lib/supabase-admin";
import { naira } from "@/lib/products";
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false } };
async function setStatus(fd: FormData) {
  "use server";
  const status = String(fd.get("status"));
  if (!["shipped", "delivered", "cancelled"].includes(status)) return;
  await admin.from("orders").update({ status }).eq("id", String(fd.get("id")));
  revalidatePath("/admin");
}
export default async function Admin() {
  const { data } = await admin.from("orders").select("*").order("created_at", { ascending: false }).limit(100);
  return (
    <main className="px-5 pb-8 pt-4 md:px-16">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tighter md:text-6xl">ORDERS</h1>
      {!data?.length && <p className="text-xs text-mute">No orders yet.</p>}
      {data?.map((o) => (
        <article key={o.id} className="border-t border-line py-5 text-[13px]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-bold">{o.reference} <span className={`ml-2 ${o.status === "pending" ? "text-mute" : "text-red"}`}>{o.status}</span></p>
            <p className="font-bold">{naira(o.total_ngn)}</p>
          </div>
          <p className="mt-2 normal-case text-mute">{o.name} / {o.phone} / {o.email}<br />{o.address} ({o.state})</p>
          <ul className="mt-2">{(o.items as { title: string; size: string; qty: number }[]).map((i, k) => <li key={k}>{i.title} / {i.size} × {i.qty}</li>)}</ul>
          {o.status !== "pending" && (
            <form action={setStatus} className="mt-3 flex gap-2"><input type="hidden" name="id" value={o.id} />
              {["shipped", "delivered", "cancelled"].map((s) => <button key={s} name="status" value={s} className="border border-line px-3 py-2 text-[11px] font-bold hover:border-white">{s}</button>)}
            </form>
          )}
        </article>
      ))}
    </main>
  );
}
