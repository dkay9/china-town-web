"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
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
  
  {/* Text — always full width on mobile, flex-1 on desktop */}
  <div className="flex-1 z-10 w-full">
    <h2 className="font-display font-700 text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
      Drive the Future.
    </h2>
    <p className="font-body font-300 text-text-secondary mt-4 max-w-md text-lg">
      AI systems that transform exceptional cars into extraordinary machines.
    </p>
    <Link
      href="/contact"
      className="inline-block mt-8 px-8 py-3 bg-accent hover:bg-accent-hover text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-colors"
      data-cursor="expand"
    >
      Request a Demo
    </Link>
  </div>

  {/* Image — stacks below text on mobile */}
  <div
    ref={imageRef}
    className="flex-1 relative w-full h-[220px] sm:h-[300px] lg:h-[400px]"
  >
    <div
      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85')",
      }}
    />
  </div>

  {/* Badge — stacks last on mobile, sits inline on desktop */}
  <div
    ref={percentRef}
    className="flex-shrink-0 w-full lg:w-auto"
  >
    <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 text-center">
      <div className="font-display font-700 text-6xl lg:text-7xl text-accent">
        30%
      </div>
      <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mt-2">
        Off first system
        <br />
        for new OEM partners
      </div>
    </div>
  </div>

</div>
    </section>
  );
}
