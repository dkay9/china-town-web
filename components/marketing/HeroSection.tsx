"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Search } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          pin: heroContentRef.current,
          scrub: 1.5,
        },
      });

      tl.fromTo(
        imageRef.current,
        { scale: 1 },
        { scale: 1.08, duration: 1 },
        0
      );

      tl.fromTo(
        secondaryRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      tl.to(overlayRef.current, { opacity: 0.5, duration: 0.4 }, 0.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div
        ref={heroContentRef}
        className="relative w-full h-screen overflow-hidden"
      >
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-void"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=2400&q=90')`,
            willChange: "transform",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/50 to-black/80" />

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0"
        />

        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6">
          <div className="mt-20">
            <h1
              ref={headlineRef}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-800 text-white leading-[0.95] tracking-tight"
            >
              The Intelligence
              <br />
              Behind the Machine.
            </h1>
            <p
              ref={subRef}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-white/50 mt-6 max-w-lg"
            >
              AI-powered performance systems engineered for the world&apos;s most
              exceptional vehicles.
            </p>

            {/* Search bar */}
            <div
              ref={searchRef}
              className="mt-12 max-w-160 opacity-0"
            >
              <div className="flex items-center gap-4 bg-white/6 border border-white/15 rounded-xs px-5 py-4 focus-within:border-white/40 transition-colors">
                <Search size={18} className="text-white/40 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search vehicle systems, performance AI, fleet tech..."
                  className="bg-transparent border-none text-white font-body font-300 text-base placeholder:text-white/35 flex-1 focus:outline-none"
                />
                <button
                  onClick={() => console.log("Search:", query)}
                  className="bg-accent hover:bg-accent-hover text-white font-mono uppercase text-xs tracking-widest px-6 py-2.5 rounded-xs transition-colors shrink-0"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats — revealed on scroll */}
          <div
            ref={secondaryRef}
            className="mt-12 grid grid-cols-4 gap-8 max-w-2xl opacity-0"
          >
            <div>
              <div className="font-display text-3xl font-700 text-white">240+</div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest mt-1">
                Vehicle Systems Deployed
              </div>
            </div>
            <div>
              <div className="font-display text-3xl font-700 text-white">98%</div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest mt-1">
                Autonomous Accuracy Rate
              </div>
            </div>
            <div>
              <div className="font-display text-3xl font-700 text-white">0.3s</div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest mt-1">
                AI Response Latency
              </div>
            </div>
            <div>
              <div className="font-display text-3xl font-700 text-white">12+</div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest mt-1">
                OEM Partnerships
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
