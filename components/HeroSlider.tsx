"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type Slide = {
  src: string;
  alt: string;
};

const DEFAULT_SLIDES: Slide[] = [
  { src: "/slide-1.webp", alt: "UNDERATED Casual Female" },
  { src: "/slide-2.webp", alt: "UNDERATED Casual Male" },
  { src: "/slide-3.webp", alt: "UNDERATED Casual Couple" },
  { src: "/slide-4.webp", alt: "UNDERATED Sweater Male" },
  { src: "/slide-5.webp", alt: "UNDERATED Tight Female" },
];

export default function HeroSlider({
  initialSlides,
}: {
  initialSlides?: Slide[];
}) {
  const slides =
    initialSlides && initialSlides.length > 0 ? initialSlides : DEFAULT_SLIDES;
  const [curr, setCurr] = useState(0);

  const advance = useCallback(() => {
    setCurr((c) => (c + 1) % slides.length);
  }, [slides.length]);

  /* Auto-advance every 5 seconds — smooth and continuous */
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [advance, slides.length]);

  return (
    <section
      className="relative h-svh w-full overflow-hidden bg-black select-none"
      aria-label="UNDERATED lookbook"
    >
      {/* 
        All slides remain mounted in the DOM to prevent re-mounting jank.
        Hardware-accelerated opacity transition produces silky smooth 60fps crossfades.
      */}
      {slides.map((slide, idx) => {
        const isActive = idx === curr;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-center transform-gpu"
            />
          </div>
        );
      })}

      {/* ── Soft dark vignette for logo contrast ── */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-black/25" />

      {/* ── UNDERATED graffiti logo centered ── */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <Image
          src="/underated-logo.png"
          alt="UNDERATED"
          width={500}
          height={300}
          priority
          unoptimized
          className="w-[70vw] max-w-[500px] sm:w-[55vw] md:w-[40vw] md:max-w-[550px] h-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
        />
      </div>
    </section>
  );
}
