"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

const LINKS: [string, string][] = [
  ["HOME", "/"],
  ["SHOP", "/collections/all"],
  ["INFO", "/info"],
  ["ARCHIVES", "/archives"],
  ["EVENTS", "/events"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const home = path === "/";
  const cart = useCart();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const f = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* ── Background invisible prefetcher so SHOP is cached before user even clicks ── */}
      <div aria-hidden="true" className="hidden">
        <Link href="/collections/all" prefetch={true}>
          shop
        </Link>
      </div>

      {/* ── Header: mobile (hamburger + logo + cart) vs laptop (bolapsd 3-col nav) ── */}
      <header
        className={`absolute inset-x-0 top-0 z-30 h-16 md:h-20 w-full px-5 md:px-10 lg:px-12 transition-colors ${
          !home ? "md:relative md:inset-auto" : ""
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1720px] items-center justify-between">
          {/* Mobile Hamburger (Strictly hidden on md and above) */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 flex-col justify-center gap-[6px] md:hidden"
          >
            <i className="block h-[1.5px] w-6 bg-white" />
            <i className="block h-[1.5px] w-6 bg-white" />
            <i className="block h-[1.5px] w-6 bg-white" />
          </button>

          {/* Laptop Left Navigation (Strictly hidden on mobile, visible on md+) */}
          <nav
            aria-label="Desktop primary"
            className="hidden md:flex md:items-center md:gap-5 lg:gap-7"
          >
            <Link
              href="/collections/all"
              prefetch={true}
              className={`text-[11px] font-bold tracking-[0.22em] transition-colors ${
                path.startsWith("/collections") &&
                path !== "/collections/tees" &&
                path !== "/collections/jerseys" &&
                path !== "/collections/longsleeves"
                  ? "text-white"
                  : "text-mute hover:text-white"
              }`}
            >
              SHOP
            </Link>
            <Link
              href="/collections/tees"
              prefetch={true}
              className={`text-[11px] font-bold tracking-[0.22em] transition-colors ${
                path === "/collections/tees"
                  ? "text-white"
                  : "text-mute hover:text-white"
              }`}
            >
              TEES
            </Link>
            <Link
              href="/collections/jerseys"
              prefetch={true}
              className={`text-[11px] font-bold tracking-[0.22em] transition-colors ${
                path === "/collections/jerseys"
                  ? "text-white"
                  : "text-mute hover:text-white"
              }`}
            >
              JERSEYS
            </Link>
            <Link
              href="/collections/longsleeves"
              prefetch={true}
              className={`text-[11px] font-bold tracking-[0.22em] transition-colors ${
                path === "/collections/longsleeves"
                  ? "text-white"
                  : "text-mute hover:text-white"
              }`}
            >
              LONGSLEEVES
            </Link>
            <Link
              href="/info"
              prefetch={true}
              className={`text-[11px] font-bold tracking-[0.22em] transition-colors ${
                path === "/info" ? "text-white" : "text-mute hover:text-white"
              }`}
            >
              INFO
            </Link>
            <Link
              href="/archives"
              prefetch={true}
              className={`text-[11px] font-bold tracking-[0.22em] transition-colors ${
                path === "/archives"
                  ? "text-white"
                  : "text-mute hover:text-white"
              }`}
            >
              ARCHIVES
            </Link>
          </nav>

          {/* Wordmark Center */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto">
            {!home && (
              <Link
                href="/"
                prefetch={true}
                className="text-lg font-extrabold tracking-[.18em] md:text-xl lg:text-2xl"
              >
                UNDERATED
              </Link>
            )}
            {home && (
              <Link
                href="/"
                prefetch={true}
                className="hidden md:inline-block text-lg font-extrabold tracking-[.22em] md:text-xl lg:text-2xl text-white/90 hover:text-white"
              >
                UNDERATED
              </Link>
            )}
          </div>

          {/* Right Action: Cart Trigger */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Open cart"
              onClick={() => cart?.setOpen(true)}
              className="flex items-center gap-2.5 text-xs font-bold tracking-[0.18em] transition-colors hover:text-red"
            >
              <span>CART</span>
              <span className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-line bg-black text-[10px] font-bold text-white transition-colors hover:border-white">
                {cart?.count ?? 0}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile spacer: keeps page content below the now-transparent header on non-home pages */}
      {!home && <div className="h-16 md:hidden" aria-hidden="true" />}

      {/* ── Full-screen nav overlay ── */}
      {open && (
        <nav
          className="fixed inset-0 z-50 overflow-y-auto bg-bg px-5 pt-6 md:px-12"
          aria-label="Main"
        >
          <div className="flex justify-between items-center mb-10">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="h-11 w-11 text-3xl leading-none hover:text-red transition-colors"
            >
              ×
            </button>
            <span className="text-xs font-bold tracking-[.2em] text-mute">
              NAVIGATION
            </span>
          </div>
          <ul className="space-y-4">
            {LINKS.map(([l, h], i) => (
              <li key={l}>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold text-red">
                    0{i + 1}
                  </span>
                  <Link
                    href={h}
                    prefetch={true}
                    onClick={() => setOpen(false)}
                    className={`text-[36px] font-bold leading-none tracking-tight sm:text-[44px] md:text-6xl hover:text-red transition-colors ${
                      path === h ? "text-red" : ""
                    }`}
                  >
                    {l}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
