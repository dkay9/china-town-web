"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function DroneSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#0a0a0a] grid grid-cols-1 lg:grid-cols-2 min-h-[600px]"
    >
      <div className="relative h-[400px] lg:h-auto overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80"
          alt="Drone systems"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/50 hidden lg:block" />
      </div>

      <div
        ref={contentRef}
        className="flex flex-col justify-center px-8 py-16 lg:px-20 lg:py-0"
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-blue-400 mb-4">
          Beyond the Road
        </span>
        <h2 className="font-display font-700 text-[clamp(2rem,4vw,3rem)] text-white mb-6">
          Autonomous aerial intelligence.
        </h2>
        <p className="font-body font-300 text-base text-white/60 leading-relaxed mb-8 max-w-md">
          Our drone division extends the same AI precision from the tarmac to
          the sky. Surveillance, mapping, and cargo platforms built for
          mission-critical operations.
        </p>
        <Link
          href="/drones"
          className="font-mono text-xs uppercase tracking-[0.35em] text-white border-b border-white/40 pb-1 hover:border-white transition-colors self-start"
        >
          Explore Drone Systems →
        </Link>
      </div>
    </section>
  );
}
