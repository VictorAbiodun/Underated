import crypto from "crypto";
import { markPaid } from "@/lib/orders";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.text();
  const hash = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!).update(body).digest("hex");
  if (hash !== req.headers.get("x-paystack-signature")) return new Response("Invalid signature", { status: 401 });
  const ev = JSON.parse(body);
  if (ev.event === "charge.success") await markPaid(ev.data.reference, ev.data.amount);
  return new Response("ok");
}
