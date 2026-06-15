"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuGroups = [
  {
    label: "Products",
    links: [
      { name: "Vehicle AI Systems", href: "/products?category=performance-ai" },
      { name: "Autonomous Vision", href: "/products?category=autonomous-systems" },
      { name: "Fleet Intelligence", href: "/products?category=fleet-intelligence" },
      { name: "Drone Systems", href: "/drones" },
    ],
  },
  {
    label: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Technology", href: "/technology" },
      { name: "Careers", href: "/careers" },
      { name: "Newsroom", href: "/newsroom" },
    ],
  },
  {
    label: "Services",
    links: [
      { name: "System Integration", href: "/services" },
      { name: "OEM Partnerships", href: "/partnerships" },
      { name: "Fleet Management", href: "/services#fleet" },
      { name: "Custom Engineering", href: "/services#custom" },
    ],
  },
  {
    label: "Contact",
    links: [
      { name: "Get in Touch", href: "/contact" },
      { name: "Technical Support", href: "/support" },
    ],
  },
];

const tiles = [
  {
    name: "Apex Neural Drive",
    slug: "apex-neural-drive",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Vantage Vision Pro",
    slug: "vantage-vision-pro",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kinetic Ride Control",
    slug: "kinetic-ride-control",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
  },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const animateClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.to(leftRef.current, {
      x: "-100%",
      duration: 0.4,
      ease: "power3.in",
    });
    gsap.to(rightRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        isAnimating.current = false;
        onClose();
      },
    });

    document.body.style.overflow = "";
    document.querySelector("main")?.classList.remove("menu-blur-active");
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.querySelector("main")?.classList.add("menu-blur-active");

      gsap.fromTo(
        leftRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.55, ease: "power3.out" }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: 0.25, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) animateClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, animateClose]);

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex">
      {/* Left panel — white */}
      <div
        ref={leftRef}
        className="w-full lg:w-[35%] bg-white h-full overflow-y-auto px-8 py-12 lg:px-12 lg:py-16"
        style={{ transform: "translateX(-100%)" }}
      >
        <button
          onClick={animateClose}
          className="text-gray-900 text-xl mb-12 hover:text-accent transition-colors"
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className="space-y-10">
          {menuGroups.map((group) => (
            <div key={group.label}>
              <span className="font-mono text-xs uppercase tracking-widest text-gray-400 block mb-3">
                {group.label}
              </span>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={animateClose}
                      className="group flex items-center justify-between py-2 font-display font-500 text-[22px] text-gray-900 hover:text-accent transition-all duration-200 hover:translate-x-1.5"
                    >
                      <span>{link.name}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-accent">
                        ›
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — dark, desktop only */}
      <div
        ref={rightRef}
        className="hidden lg:flex lg:w-[65%] bg-[#0a0a0a] h-full flex-col overflow-y-auto p-8 gap-4"
        style={{ opacity: 0 }}
      >
        {tiles.map((tile) => (
          <Link
            key={tile.slug}
            href={`/products/${tile.slug}`}
            onClick={animateClose}
            className="group relative flex-1 min-h-[200px] overflow-hidden"
            data-cursor="expand"
          >
            <Image
              src={tile.image}
              alt={tile.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="65vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="font-display font-700 text-2xl text-white uppercase tracking-wide">
                {tile.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
