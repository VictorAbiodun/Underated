import { admin } from "./supabase-admin";
import { sendMail, esc } from "./mail";
import { naira } from "./products";
type Line = { handle: string; title: string; size: string; qty: number; price: number };
// Safe to call many times: only the first call (pending -> paid) deducts stock and sends emails.
export async function markPaid(reference: string, paidKobo: number) {
  const { data: o } = await admin.from("orders").update({ status: "paid" }).eq("reference", reference).eq("status", "pending").eq("total_ngn", paidKobo / 100).select().maybeSingle();
  if (!o) return;
  const lines = o.items as Line[];
  for (const i of lines) await admin.rpc("decrement_stock", { p_handle: i.handle, p_size: i.size, p_qty: i.qty });
  const rows = lines.map((i) => `<li>${esc(i.title)} / ${esc(i.size)} × ${i.qty}: ${naira(i.price * i.qty)}</li>`).join("");
  const body = `<ul>${rows}</ul><p>Shipping: ${naira(o.shipping_ngn)}<br><b>Total: ${naira(o.total_ngn)}</b></p>`;
  await sendMail(o.email, `UNDERATED order ${reference}`, `<p>Thank you, ${esc(o.name)}. We have your order.</p>${body}<p>Delivery to: ${esc(o.address)}</p>`);
  await sendMail(process.env.OWNER_EMAIL, `New order ${reference}`, `${body}<p>${esc(o.name)}, ${esc(o.phone)}, ${esc(o.email)}<br>${esc(o.address)}</p>`);
}
