"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
      {/* ── Header: hamburger only on homepage, hamburger + wordmark on other pages ── */}
      <header
        className={`${
          home ? "absolute inset-x-0 top-0" : "relative"
        } z-30 flex h-16 items-center px-5 md:h-20 md:px-10`}
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
            className="absolute left-1/2 -translate-x-1/2 text-lg font-extrabold tracking-[.18em] md:text-2xl"
          >
            UNDERATED
          </Link>
        )}
      </header>

      {/* ── Full-screen nav overlay ── */}
      {open && (
        <nav
          className="fixed inset-0 z-50 overflow-y-auto bg-bg px-5 pt-6 md:px-12"
          aria-label="Main"
        >
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="mb-10 h-11 w-11 text-3xl leading-none"
          >
            ×
          </button>
          <ul className="space-y-3">
            {LINKS.map(([l, h], i) => (
              <li key={l}>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-red">
                    0{i + 1}
                  </span>
                  <Link
                    href={h}
                    onClick={() => setOpen(false)}
                    className={`text-[40px] font-bold leading-none tracking-tight md:text-6xl ${
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
