"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { naira } from "@/lib/products";
import Pic from "./Pic";

/**
 * Two-part component:
 * 1) Confirmation toast that pops up after adding to cart
 *    → "CHECKOUT" or "CONTINUE SHOPPING"
 * 2) Floating checkout FAB (bottom-right) that appears once the user
 *    has chosen "continue shopping" at least once and has items in cart.
 */
export default function CartToast() {
  const {
    justAdded,
    dismissAdded,
    continueShopping,
    showFloatingCheckout,
    count,
    subtotal,
    setOpen,
  } = useCart();

  /* auto-dismiss toast after 8s if user does nothing */
  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => continueShopping(), 8000);
    return () => clearTimeout(t);
  }, [justAdded, continueShopping]);

  return (
    <>
      {/* ── Confirmation Toast ── */}
      {justAdded && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => continueShopping()}
          />
          {/* toast card */}
          <div className="relative z-10 w-full max-w-sm mx-4 mb-4 sm:mb-0 animate-[slideUp_0.3s_ease-out] bg-bg border border-line rounded-lg overflow-hidden shadow-2xl shadow-black/60">
            {/* header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-[#111]">
              <svg
                className="h-4 w-4 text-green-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-xs font-bold tracking-[.15em]">
                ADDED TO CART
              </span>
            </div>

            {/* product preview */}
            <div className="flex gap-3 px-4 py-4">
              {justAdded.image && (
                <div className="relative h-16 w-16 shrink-0 bg-ph rounded-sm overflow-hidden">
                  <Pic
                    src={justAdded.image}
                    alt={justAdded.title}
                    sizes="64px"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center min-w-0">
                <p className="text-[13px] font-bold truncate">
                  {justAdded.title}
                </p>
                <p className="text-[11px] text-mute mt-0.5">
                  SIZE {justAdded.size} · {naira(justAdded.price)}
                </p>
              </div>
            </div>

            {/* action buttons */}
            <div className="flex flex-col gap-2 px-4 pb-4">
              <Link
                href="/checkout"
                onClick={() => dismissAdded()}
                className="block w-full bg-white py-3.5 text-center text-xs font-bold tracking-[.25em] text-black transition-colors hover:bg-red hover:text-white rounded-sm"
              >
                CHECKOUT
              </Link>
              <button
                onClick={() => continueShopping()}
                className="w-full py-3 text-center text-xs font-bold tracking-[.2em] text-mute border border-line rounded-sm transition-colors hover:border-white hover:text-white"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Checkout FAB (bottom-right) ── */}
      {showFloatingCheckout && count > 0 && !justAdded && (
        <button
          onClick={() => setOpen(true)}
          aria-label={`Open cart — ${count} items`}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-white px-5 py-3.5 text-black shadow-xl shadow-black/40 transition-all hover:bg-red hover:text-white hover:scale-105 active:scale-95"
        >
          {/* cart icon */}
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263
              12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0
              01-1.12-1.243l1.264-12A1.125 1.125 0 015.513
              7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625
              10.5a.375.375 0 11-.75 0 .375.375 0 01.75
              0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className="text-xs font-bold tracking-[.15em]">
            CHECKOUT
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red text-[10px] font-bold text-white">
            {count}
          </span>
        </button>
      )}
    </>
  );
}
