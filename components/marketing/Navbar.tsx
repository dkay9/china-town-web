"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import { Search } from "lucide-react";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/88 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl font-700 tracking-tight text-white"
          >
            CTOWN
          </Link>

          <div className="flex items-center gap-5">
            <button
              aria-label="Toggle menu"
              className="relative w-6 h-5 flex flex-col justify-between"
              onClick={() => setMenuOpen(true)}
              data-cursor="expand"
            >
              <span
                className={`block w-full h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[9px]" : ""
                }`}
              />
              <span
                className={`block w-full h-[1.5px] bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-full h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
