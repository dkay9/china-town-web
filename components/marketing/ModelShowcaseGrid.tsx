"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const models = [
  {
    name: "Apex Neural",
    slug: "apex-neural-drive",
    tagline: "Intelligence at the limit",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Vantage Vision",
    slug: "vantage-vision-pro",
    tagline: "See everything. Miss nothing.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Cortex Fleet",
    slug: "cortex-fleet-os",
    tagline: "Every vehicle. One mind.",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Kinetic Ride",
    slug: "kinetic-ride-control",
    tagline: "The road, predicted.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function ModelShowcaseGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#0a0a0a] px-6 sm:px-[60px] pt-[120px] pb-[160px]"
    >
      <div className="max-w-[1280px] mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
          Our Vehicle Systems
        </p>
        <h2 className="font-display font-800 text-[clamp(2.5rem,5vw,4rem)] uppercase tracking-[0.05em] text-white mb-16">
          Engineered for Exceptional Machines.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {models.map((model, i) => (
            <Link
              key={model.slug}
              href={`/products/${model.slug}`}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group relative overflow-hidden block"
              style={{ aspectRatio: "9/13" }}
            >
              <Image
                src={model.image}
                alt={model.name}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

              <div className="absolute inset-x-0 top-[12%] flex flex-col items-center text-center px-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/70 mb-4">
                  {model.tagline}
                </span>
                <span className="font-script text-[clamp(3rem,7vw,5.5rem)] text-white leading-none">
                  {model.name}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-8 flex justify-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white border-b border-white/60 pb-0.5">
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
