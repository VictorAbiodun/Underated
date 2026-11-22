import { shippingFor } from "@/lib/shipping";
import { naira } from "@/lib/products";

export const metadata = {
  title: "INFO / UNDERATED",
  description: "About UNDERATED, shipping, returns, and garment care.",
};

const Section = ({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="border-t border-line py-8">
    <h2 className="mb-4 text-xs font-bold tracking-[.25em] text-white">
      {title}
    </h2>
    <div className="max-w-2xl text-[13px] normal-case leading-relaxed text-mute space-y-3">
      {children}
    </div>
  </section>
);

export default function Info() {
  const lagosShip = shippingFor("lagos");
  const otherShip = shippingFor("other");

  return (
    <main className="px-5 pb-16 pt-4 md:px-16 max-w-4xl">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tighter md:text-7xl">
        INFO
      </h1>

      <Section title="ABOUT UNDERATED">
        <p>
          UNDERATED is an independent contemporary streetwear label born out of
          Lagos, Nigeria. We engineer heavy-gauge garments, boxy silhouettes, and
          raw graphic narratives tailored for those who move against the grain.
        </p>
        <p>
          Every piece is built on heavyweight combed cottons and technical
          mesh knits, finished with custom mineral washes and reinforced
          stitchwork designed for enduring everyday wear.
        </p>
      </Section>

      <Section title="SHIPPING & DELIVERY" id="shipping">
        <p>
          All orders are processed and packaged within 24 hours of payment
          confirmation:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong className="text-white">Lagos Express:</strong> 24 to 48
            hours — {naira(lagosShip)}
          </li>
          <li>
            <strong className="text-white">Nationwide (Rest of Nigeria):</strong>{" "}
            3 to 5 business days — {naira(otherShip)}
          </li>
        </ul>
        <p className="pt-1">
          Once your order ships, an SMS and email dispatch confirmation
          containing your tracking reference will be sent directly to you.
        </p>
      </Section>

      <Section title="RETURNS & EXCHANGES" id="returns">
        <p>
          We want you to be completely confident in your fit. We offer an{" "}
          <strong className="text-white">exchange window within 7 days</strong>{" "}
          of delivery.
        </p>
        <p>
          Items must be unwashed, unworn, and returned in their original packaging
          with tags attached. Size swaps are processed promptly subject to stock
          availability.
        </p>
      </Section>

      <Section title="GARMENT CARE">
        <p>
          To maintain the hand-feel, rich wash patina, and crisp graphic print
          longevity:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Machine wash cold, inside-out with like colors.</li>
          <li>Do not iron directly over graphic prints or screen work.</li>
          <li>Hang dry in the shade to preserve garment drape and shape.</li>
        </ul>
      </Section>

      <Section title="SUPPORT & CONTACT" id="contact">
        <p>
          For order inquiries, sizing advice, or collaborations:
        </p>
        <p className="text-white font-medium">
          Email:{" "}
          <a
            href="mailto:hello@underated.com"
            className="underline hover:text-red transition-colors"
          >
            hello@underated.com
          </a>
        </p>
        <p className="text-xs text-mute">
          Support hours: Monday – Saturday, 9:00 AM – 6:00 PM WAT.
        </p>
      </Section>
    </main>
  );
}
