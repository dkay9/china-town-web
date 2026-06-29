"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductCarousel() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(
    () => setActive((i) => (i + 1) % products.length),
    []
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + products.length) % products.length),
    []
  );

  const startAutoplay = useCallback(() => {
    intervalRef.current = setInterval(next, 6000);
  }, [next]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  return (
    <section
      className="relative z-10 bg-[#0a0a0a] py-30 overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Header */}
      <div className="px-6 lg:px-20 mb-16">
        <span className="font-mono uppercase tracking-widest text-xs text-white/40">
          Our Fleet
        </span>
        <h2 className="font-display font-700 text-4xl sm:text-5xl text-white mt-2">
          Engineered for precision.
        </h2>
      </div>

      {/* Carousel */}
      <div ref={containerRef} className="relative">
        {/* Cards track */}
        <div className="flex items-center justify-center gap-6 px-6">
          {products.map((product, i) => {
            const offset = i - active;
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            return (
              <div
                key={product.id}
                className="shrink-0 w-[85vw] sm:w-150 transition-all duration-500"
                style={{
                  opacity: isActive ? 1 : 0.45,
                  filter: isActive ? "none" : "blur(4px)",
                  transform: isActive ? "scale(1)" : "scale(0.92)",
                  cursor: isActive ? "default" : "pointer",
                  transitionTimingFunction:
                    "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onClick={() => !isActive && setActive(i)}
              >
                {/* Image */}
                <div className="relative h-70 sm:h-95 bg-surface overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 85vw, 600px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Content panel */}
                <div className="bg-[#0f0f0f] border-t border-white/6 px-6 py-6 sm:px-8 sm:py-7">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                    {product.year} · {product.category}
                  </span>
                  <h3 className="font-display font-700 text-xl sm:text-2xl text-white mt-2">
                    {product.name}
                  </h3>
                  <p className="font-body font-300 text-sm text-white/55 mt-3 leading-relaxed">
                    {product.shortDescription}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 mt-6 font-body text-sm text-white underline underline-offset-4 hover:text-blue-400 transition-colors"
                  >
                    Discover More <span>›</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-4 lg:left-6 top-35 sm:top-47.5 z-10 w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white font-display text-xl hover:bg-white/16 transition-colors duration-200"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-4 lg:right-6 top-35 sm:top-47.5 z-10 w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white font-display text-xl hover:bg-white/16 transition-colors duration-200"
          aria-label="Next"
        >
          ›
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-10">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-white w-6" : "bg-white/20"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
