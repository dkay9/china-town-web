"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

const categories = [
  { name: "Drone Pro", slug: "drone", image: "/assets/drone-1.jpg" },
  { name: "Recon Series", slug: "recon", image: "/assets/drone-2.jpg" },
  { name: "Cargo Fleet", slug: "cargo", image: "/assets/vehicle-1.jpg" },
  { name: "AI Sentinel", slug: "ai", image: "/assets/ai-system-1.jpg" },
];

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
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
      id="categories"
      className="relative z-10 bg-white py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-void mb-12 tracking-tight">
          Fleet Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.slug}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group relative aspect-[3/2] overflow-hidden rounded-lg cursor-pointer"
              data-cursor="expand"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.06]"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="font-display text-xl font-semibold text-white">
                  {cat.name}
                </span>
                <span className="w-9 h-9 bg-accent rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} className="text-white" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
