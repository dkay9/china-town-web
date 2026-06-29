"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceUnit: string;
  imageUrl: string;
  badge: string | null;
  category: string;
}

export default function TrendVehicles() {
  const [products, setProducts] = useState<Product[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        const priceEl = card.querySelector("[data-price]");
        if (priceEl) {
          const finalPrice = parseFloat(priceEl.getAttribute("data-price") || "0");
          gsap.from(
            { val: 0 },
            {
              val: finalPrice,
              duration: 1.2,
              snap: { val: 1 },
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              onUpdate: function () {
                priceEl.textContent = `$${Math.round(this.targets()[0].val)}`;
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative z-10 bg-white py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-void tracking-tight">
            Featured Products
          </h2>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 text-accent font-mono text-xs uppercase tracking-wider rounded-full hover:bg-accent hover:text-white transition-all"
          >
            View all <ArrowRight size={14} />
          </a>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible">
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group min-w-65 snap-start shrink-0 lg:min-w-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 transition-colors"
              data-cursor="expand"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-void text-white font-mono text-[10px] uppercase tracking-wider rounded-sm">
                    {product.badge}
                  </span>
                )}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.imageUrl}')` }}
                />
              </div>
              <div className="p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-mono mb-1">
                  {product.category.replace("_", " ")}
                </div>
                <h3 className="font-display text-xl font-semibold text-void mb-3">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-void">
                    <span
                      data-price={product.price}
                      className="font-display text-2xl font-bold"
                    >
                      ${product.price}
                    </span>
                    <span className="font-mono text-xs text-text-mono">
                      {product.priceUnit}
                    </span>
                  </div>
                  <button className="px-4 py-2 border border-void text-void font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-void hover:text-white transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
