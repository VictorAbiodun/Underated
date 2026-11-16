import { shippingFor } from "@/lib/shipping";
import { naira } from "@/lib/products";
export const metadata = { title: "INFO / UNDERATED" };
const S = ({ t, children }: { t: string; children: React.ReactNode }) => <section className="border-t border-line py-8"><h2 className="mb-3 text-xs font-bold tracking-[.2em]">{t}</h2><div className="max-w-xl text-[13px] normal-case leading-relaxed text-mute">{children}</div></section>;
export default function Info() {
  return (
    <main className="px-5 pb-8 pt-4 md:px-16">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tighter md:text-7xl">INFO</h1>
      <S t="ABOUT"><p>Replace this with the UNDERATED story: who makes it, where, and why.</p></S>
      <S t="SHIPPING"><p>Lagos: {naira(shippingFor("lagos"))}. Rest of Nigeria: {naira(shippingFor("other"))}. Shipping is added at checkout.</p></S>
      <S t="CONTACT"><p>hello@underated.com</p></S>
    </main>
  );
}
