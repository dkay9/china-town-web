"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import Footer from "@/components/marketing/Footer";

const droneProducts = products.filter((p) =>
  p.category.toLowerCase().includes("drone")
);

export default function DronesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=2400&q=90"
          alt="Autonomous Aerial Systems"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-20 pb-16">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-blue-400 mb-4 block">
            Drone Division
          </span>
          <h1 className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
            Autonomous Aerial Systems
          </h1>
          <p className="font-body font-300 text-lg text-white/60 mt-4 max-w-xl leading-relaxed">
            Surveillance, mapping, and cargo platforms engineered with the same
            AI precision that powers our vehicle technology.
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="bg-[#0a0a0a] py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {droneProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-[#0f0f0f] overflow-hidden hover:ring-1 hover:ring-white/10 transition-all"
            >
              <div className="relative h-[260px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="px-6 py-6">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                  {product.year} · {product.category}
                </span>
                <h3 className="font-display font-700 text-xl text-white mt-2">
                  {product.name}
                </h3>
                <p className="font-body font-300 text-sm text-white/55 mt-2 leading-relaxed">
                  {product.shortDescription}
                </p>
                <span className="inline-flex items-center gap-2 mt-5 font-body text-sm text-white underline underline-offset-4 group-hover:text-blue-400 transition-colors">
                  Discover More <span>›</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
