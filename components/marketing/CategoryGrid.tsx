"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Performance AI",
    slug: "performance-ai",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Autonomous Systems",
    slug: "autonomous-systems",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fleet Intelligence",
    slug: "fleet-intelligence",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Drone Systems",
    slug: "drones",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

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
        <span className="font-mono text-xs uppercase tracking-widest text-gray-400 block mb-3">
          Categories
        </span>
        <h2 className="font-display font-700 text-4xl sm:text-5xl lg:text-6xl text-void mb-12 tracking-tight">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug + i}
              href={`/products?category=${cat.slug}`}
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
                <span className="font-display font-700 text-xl text-white">
                  {cat.name}
                </span>
                <span className="w-9 h-9 bg-accent rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} className="text-white" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
