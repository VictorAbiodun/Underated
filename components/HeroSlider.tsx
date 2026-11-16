"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type Slide = {
  src: string;
  alt: string;
};

const DEFAULT_SLIDES: Slide[] = [
  { src: "/slide-1.png", alt: "UNDERATED Casual Female" },
  { src: "/slide-2.png", alt: "UNDERATED Casual Male" },
  { src: "/slide-3.png", alt: "UNDERATED Casual Couple" },
  { src: "/slide-4.png", alt: "UNDERATED Sweater Male" },
  { src: "/slide-5.png", alt: "UNDERATED Tight Female" },
];

export default function HeroSlider({
  initialSlides,
}: {
  initialSlides?: Slide[];
}) {
  const slides =
    initialSlides && initialSlides.length > 0 ? initialSlides : DEFAULT_SLIDES;
  const [curr, setCurr] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const advance = useCallback(() => {
    setPrev(curr);
    setCurr((c) => (c + 1) % slides.length);
  }, [curr, slides.length]);

  /* auto-advance every 5 seconds — no user controls */
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [advance, slides.length]);

  /* clear the "prev" layer after the crossfade finishes */
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 1200);
    return () => clearTimeout(t);
  }, [prev]);

  return (
    <section
      className="relative h-svh w-full overflow-hidden bg-black select-none"
      aria-label="UNDERATED lookbook"
    >
      {/* ── outgoing slide (fades out) ── */}
      {prev !== null && (
        <div
          key={"out-" + prev}
          className="absolute inset-0 z-0 animate-fade-out"
        >
          <Image
            src={slides[prev].src}
            alt={slides[prev].alt}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      {/* ── current slide (fades in) ── */}
      <div key={"in-" + curr} className="absolute inset-0 z-10 animate-fade-in">
        <Image
          src={slides[curr].src}
          alt={slides[curr].alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── light vignette so the centered wordmark reads clearly ── */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-black/25" />

      {/* ── UNDERATED graffiti logo centered ── */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <Image
          src="/underated-logo.png"
          alt="UNDERATED"
          width={500}
          height={300}
          unoptimized
          className="w-[70vw] max-w-[500px] sm:w-[55vw] md:w-[40vw] md:max-w-[550px] h-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
        />
      </div>
    </section>
  );
}
