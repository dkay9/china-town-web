"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Navigation, ShieldCheck, Activity, BadgeDollarSign } from "lucide-react";

const features = [
  {
    icon: Navigation,
    label: "Autonomous Navigation",
    description: "AI-guided pathfinding across any terrain",
  },
  {
    icon: ShieldCheck,
    label: "AI Obstacle Detection",
    description: "360° real-time hazard avoidance",
  },
  {
    icon: Activity,
    label: "Live Telemetry",
    description: "Full fleet monitoring dashboard",
  },
  {
    icon: BadgeDollarSign,
    label: "Zero Maintenance Fees",
    description: "All-inclusive service packages",
  },
];

export default function TechBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          x: -40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
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
      id="tech"
      className="relative z-10 bg-void py-16 px-6 border-y border-border-subtle"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.label}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center animate-pulse-soft">
                <Icon size={20} className="text-accent" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-white">
                {feat.label}
              </h3>
              <p className="font-body text-xs text-text-secondary">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
