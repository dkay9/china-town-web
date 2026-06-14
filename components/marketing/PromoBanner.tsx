"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function PromoBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        percentRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-surface py-24 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 z-10">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Fly Further.
            <br />
            See More.
          </h2>
          <p className="font-body text-text-secondary mt-4 max-w-md text-lg">
            Premium fleet access with enterprise-grade AI at a fraction of the
            cost. New clients get exclusive launch pricing.
          </p>
          <button
            className="mt-8 px-8 py-3 bg-accent hover:bg-accent-hover text-white font-mono text-sm uppercase tracking-wider rounded-sm transition-colors"
            data-cursor="expand"
          >
            Get Started
          </button>
        </div>

        <div
          ref={imageRef}
          className="flex-1 relative h-[300px] lg:h-[400px]"
        >
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/drone-1.jpg')" }}
          />
        </div>

        <div
          ref={percentRef}
          className="absolute top-8 right-8 lg:relative lg:top-auto lg:right-auto flex-shrink-0"
        >
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 text-center">
            <div className="font-display text-6xl lg:text-7xl font-bold text-accent">
              30%
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mt-2">
              Off for new
              <br />
              fleet clients
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
