"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

const CATEGORIES = [
  { label: "ALL", handle: "all" },
  { label: "TEES", handle: "tees" },
  { label: "JERSEYS", handle: "jerseys" },
  { label: "LONGSLEEVES", handle: "longsleeves" },
  { label: "HOODIES", handle: "hoodies" },
];

export default function ShopView({
  handle,
  products,
  hasNext,
  page,
}: {
  handle: string;
  products: Product[];
  hasNext: boolean;
  page: number;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("underated-shop-view");
      if (saved === "grid" || saved === "list") {
        setViewMode(saved);
      }
    } catch {}
  }, []);

  const handleToggleView = (mode: "grid" | "list") => {
    setViewMode(mode);
    try {
      localStorage.setItem("underated-shop-view", mode);
    } catch {}
  };

  const activeCategory = handle === "frontpage" ? "all" : handle.toLowerCase();
  const titleDisplay = activeCategory.toUpperCase();

  return (
    <div className="min-h-screen px-4 pb-16 pt-2 sm:px-6 md:px-10 lg:px-16 md:pt-6 md:pb-24 max-w-[1720px] mx-auto">
      {/* ── Category Navigation Chips / Filter Bar (bolapsd style) ── */}
      <div className="scrollbar-none -mx-4 mb-6 flex items-center gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 md:mb-8 md:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.handle;
          return (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              prefetch={true}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-[11px] font-bold tracking-widest transition-all ${
                isActive
                  ? "border-white bg-white text-black"
                  : "border-line bg-transparent text-mute hover:border-white hover:text-white"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* ── Collection Title & View Switcher Row ── */}
      <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {titleDisplay}
          </h1>
          <span className="text-[11px] font-bold tracking-[.2em] text-red">
            {products.length} {products.length === 1 ? "ITEM" : "ITEMS"}
          </span>
        </div>

        {/* ── 4-Grid vs 2-Column Toggle Buttons ── */}
        <div
          role="group"
          aria-label="Grid layout view"
          className="flex items-center gap-1.5"
        >
          {/* 4-Column Grid View */}
          <button
            type="button"
            onClick={() => handleToggleView("grid")}
            aria-pressed={viewMode === "grid"}
            aria-label="4-column grid view"
            className={`flex h-9 w-9 items-center justify-center rounded border transition-colors ${
              viewMode === "grid"
                ? "border-white bg-white text-black"
                : "border-line text-mute hover:border-white hover:text-white"
            }`}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="5.5" height="5.5" rx="0.5" />
              <rect x="11.5" y="3" width="5.5" height="5.5" rx="0.5" />
              <rect x="3" y="11.5" width="5.5" height="5.5" rx="0.5" />
              <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="0.5" />
            </svg>
          </button>

          {/* 2-Column / Large View */}
          <button
            type="button"
            onClick={() => handleToggleView("list")}
            aria-pressed={viewMode === "list"}
            aria-label="2-column view"
            className={`flex h-9 w-9 items-center justify-center rounded border transition-colors ${
              viewMode === "list"
                ? "border-white bg-white text-black"
                : "border-line text-mute hover:border-white hover:text-white"
            }`}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect x="3" y="3.5" width="5.5" height="13" rx="0.5" />
              <rect x="11.5" y="3.5" width="5.5" height="13" rx="0.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Empty State ── */}
      {products.length === 0 && (
        <div className="py-24 text-center">
          <p className="mb-4 text-xs tracking-wider text-mute">
            No products found in this category.
          </p>
          <Link
            href="/collections/all"
            className="text-xs font-bold tracking-[.25em] text-white underline hover:text-red"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      )}

      {/* ── Product Grid ── */}
      {products.length > 0 && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12"
              : "mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-x-10 md:gap-y-12"
          }
        >
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}

      {/* ── Next Page Pagination ── */}
      {hasNext && (
        <div className="mt-16 text-center">
          <Link
            href={`?page=${page + 1}`}
            className="text-xs font-bold tracking-[.25em] underline hover:text-red"
          >
            NEXT PAGE →
          </Link>
        </div>
      )}
    </div>
  );
}
