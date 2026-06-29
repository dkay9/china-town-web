"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import Footer from "@/components/marketing/Footer";

const categories = [
  { label: "All", value: "all" },
  { label: "Performance AI", value: "performance-ai" },
  { label: "Autonomous", value: "autonomous" },
  { label: "Fleet", value: "fleet" },
  { label: "Drone", value: "drone" },
  { label: "Vehicle", value: "vehicle" },
];

function matchCategory(productCategory: string, filter: string): boolean {
  if (filter === "all") return true;
  const lower = productCategory.toLowerCase();
  if (filter === "performance-ai") return lower.includes("performance");
  if (filter === "autonomous") return lower.includes("autonomous") || lower.includes("vision");
  if (filter === "fleet") return lower.includes("fleet");
  if (filter === "drone") return lower.includes("drone") || lower.includes("surveillance");
  if (filter === "vehicle") return lower.includes("vehicle") || lower.includes("retrofit") || lower.includes("suspension");
  return true;
}

export default function ProductsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = products.filter((p) => matchCategory(p.category, filter));

  return (
    <>
      <section className="bg-void pt-40 pb-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            Browse Collection
          </span>
          <h1 className="font-display font-700 text-4xl sm:text-5xl lg:text-6xl text-white mt-2">
            Our Technology
          </h1>
          <p className="font-body font-300 text-lg text-white/55 mt-4 max-w-lg">
            AI-powered systems for vehicles, fleets, and autonomous operations.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 mt-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`font-mono text-xs uppercase tracking-widest px-3 py-2 border transition-colors ${
                  filter === cat.value
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/50 border-white/15 hover:border-white/40 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-[#0f0f0f] overflow-hidden hover:ring-1 hover:ring-white/10 transition-all"
            >
              <div className="relative h-65 overflow-hidden">
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
