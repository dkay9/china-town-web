"use client";

import { useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { getProductBySlug, products } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const product = getProductBySlug(slug);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current!.querySelector("[data-hero-content]"), {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-700 text-4xl text-white">
            Product Not Found
          </h1>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white mt-6 inline-block"
          >
            ← Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[85vh] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />

        <div
          data-hero-content
          className="absolute bottom-0 left-0 right-0 px-6 lg:px-20 pb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            {product.year} · {product.category}
          </span>
          <h1 className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl text-white mt-3 leading-none">
            {product.name}
          </h1>
          <p className="font-body font-300 text-lg text-white/70 mt-4 max-w-xl leading-relaxed">
            {product.shortDescription}
          </p>
          <button className="mt-8 px-8 py-4 bg-blue-600 text-white font-mono text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors">
            Request a Demo
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-24 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 flex items-center gap-2 transition-colors"
          >
            ← Back to Fleet
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            {/* Specs */}
            <div>
              <h2 className="font-display font-700 text-2xl text-gray-900 mb-8">
                Specifications
              </h2>
              <div className="divide-y divide-gray-200">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-4"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                      {key}
                    </span>
                    <span className="font-body font-400 text-gray-900">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-display font-700 text-2xl text-gray-900 mb-8">
                Key Features
              </h2>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-600 mt-2 flex-shrink-0" />
                    <span className="font-body font-400 text-base text-gray-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
