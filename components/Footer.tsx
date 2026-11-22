import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-gradient-to-b from-bg to-[#120000] px-5 pb-10 pt-14 md:px-16 md:pt-16">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:flex md:gap-x-32">
        {/* Contact Column */}
        <div>
          <h3 className="mb-4 text-xs font-bold tracking-[.2em] text-white">
            CONTACT
          </h3>
          <ul className="space-y-2.5 text-[13px] text-mute normal-case">
            <li>
              <a
                href="mailto:hello@underated.com"
                className="hover:text-white transition-colors"
              >
                hello@underated.com
              </a>
            </li>
            <li>
              <Link
                href="/info#shipping"
                className="hover:text-white transition-colors"
              >
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link
                href="/info#returns"
                className="hover:text-white transition-colors"
              >
                Returns & Exchanges
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Follow Column */}
        <div>
          <h3 className="mb-4 text-xs font-bold tracking-[.2em] text-white">
            FOLLOW
          </h3>
          <ul className="space-y-2.5 text-[13px] text-mute">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red transition-colors"
              >
                Instagram ↗
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red transition-colors"
              >
                TikTok ↗
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red transition-colors"
              >
                X (Twitter) ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Info Column */}
        <div>
          <h3 className="mb-4 text-xs font-bold tracking-[.2em] text-white">
            LEGAL
          </h3>
          <ul className="space-y-2.5 text-[13px] text-mute normal-case">
            <li>
              <Link href="/info" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/info" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <span className="text-[11px] text-mute/70">
                © {new Date().getFullYear()} UNDERATED.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Massive Outline Wordmark */}
      <p
        className="mt-14 select-none text-[18vw] font-extrabold leading-none tracking-tighter md:text-[9rem]"
        style={{
          WebkitTextStroke: "1px #333333",
          color: "transparent",
        }}
        aria-hidden="true"
      >
        UNDERATED
      </p>
    </footer>
  );
}
