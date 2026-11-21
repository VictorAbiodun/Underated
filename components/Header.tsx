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

      {/* ── Header: hamburger on left, wordmark center, cart button on right ── */}
      <header
        className={`${
          home ? "absolute inset-x-0 top-0" : "relative"
        } z-30 flex h-16 items-center justify-between px-5 md:h-20 md:px-10`}
      >
        {/* Hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 flex-col justify-center gap-[6px]"
        >
          <i className="block h-[1.5px] w-6 bg-white" />
          <i className="block h-[1.5px] w-6 bg-white" />
          <i className="block h-[1.5px] w-6 bg-white" />
        </button>

        {/* Wordmark — only shown on non-home pages */}
        {!home && (
          <Link
            href="/"
            prefetch={true}
            className="absolute left-1/2 -translate-x-1/2 text-lg font-extrabold tracking-[.18em] md:text-2xl"
          >
            UNDERATED
          </Link>
        )}

        {/* Cart Trigger */}
        <button
          aria-label="Open cart"
          onClick={() => cart?.setOpen(true)}
          className="flex items-center gap-2 text-xs font-bold tracking-wider hover:text-red transition-colors"
        >
          <span className="hidden sm:inline">CART</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line bg-black text-[10px] font-bold text-white transition-colors hover:border-white">
            {cart?.count ?? 0}
          </span>
        </button>
      </header>

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
