"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const tabs = ["By Duration", "By Project", "Full Day"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations on mount
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.2 }
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6 }
      );

      // Scroll-pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          pin: heroContentRef.current,
          scrub: 1.5,
        },
      });

      // Phase 1: image scale + parallax feel
      tl.fromTo(
        imageRef.current,
        { scale: 1 },
        { scale: 1.08, duration: 1 },
        0
      );

      // Phase 2: secondary stats fade in
      tl.fromTo(
        secondaryRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      // Phase 3: CTA bar reveal + dark overlay
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.5
      );
      tl.to(
        overlayRef.current,
        { opacity: 0.5, duration: 0.4 },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div
        ref={heroContentRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Background image */}
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-void"
          style={{
            backgroundImage: `url('/assets/hero-bg.jpg')`,
            willChange: "transform",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

        {/* Dark overlay for phase 3 */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6">
          <div className="mt-20">
            <h1
              ref={headlineRef}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight"
            >
              Precision
              <br />
              Beyond Horizon
            </h1>
            <p
              ref={subRef}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-text-secondary mt-6 max-w-md"
            >
              AI-powered drones and autonomous vehicles for the next frontier
            </p>
          </div>

          {/* Secondary stats block — revealed on scroll */}
          <div
            ref={secondaryRef}
            className="mt-12 grid grid-cols-3 gap-8 max-w-lg opacity-0"
          >
            <div>
              <div className="font-display text-3xl font-bold text-white">8K</div>
              <div className="font-mono text-xs text-text-mono uppercase tracking-wider mt-1">
                Camera Resolution
              </div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-white">45</div>
              <div className="font-mono text-xs text-text-mono uppercase tracking-wider mt-1">
                Min Flight Time
              </div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-white">AI</div>
              <div className="font-mono text-xs text-text-mono uppercase tracking-wider mt-1">
                Obstacle Detect
              </div>
            </div>
          </div>

          {/* CTA + Search bar — revealed on scroll */}
          <div ref={ctaRef} className="absolute bottom-12 left-6 right-6 opacity-0">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-0 mb-0">
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    className={`px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                      i === 0
                        ? "bg-surface-raised text-white"
                        : "bg-surface text-text-secondary hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="bg-surface-raised border border-border-subtle flex flex-wrap items-center">
                <div className="flex-1 min-w-[140px] px-5 py-4 border-r border-border-subtle">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-mono mb-1">
                    Location
                  </div>
                  <div className="text-sm text-text-secondary">Select region...</div>
                </div>
                <div className="flex-1 min-w-[140px] px-5 py-4 border-r border-border-subtle">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-mono mb-1">
                    Start Date
                  </div>
                  <div className="text-sm text-text-secondary">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
                <div className="flex-1 min-w-[140px] px-5 py-4 border-r border-border-subtle">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-mono mb-1">
                    Duration
                  </div>
                  <div className="text-sm text-text-secondary">1 day</div>
                </div>
                <button className="bg-accent hover:bg-accent-hover text-white font-mono text-sm uppercase tracking-wider px-8 py-6 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
