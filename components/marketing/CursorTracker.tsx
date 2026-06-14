"use client";

import { useRef, useEffect, useState } from "react";

export default function CursorTracker() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }

      const target = e.target as HTMLElement;
      const isExpand =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='expand']");
      const isMedia =
        target.closest("video") || target.closest("[data-cursor='drag']");
      setExpanded(!!isExpand);
      setLabel(isMedia ? "DRAG" : "");
    };

    const raf = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.08;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.08;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${expanded ? 2.5 : 1})`;
      }
      requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    const frameId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, [expanded]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center transition-[border-color] duration-200"
        style={{ willChange: "transform" }}
      >
        {label && (
          <span className="font-mono text-[8px] uppercase tracking-widest text-white">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
