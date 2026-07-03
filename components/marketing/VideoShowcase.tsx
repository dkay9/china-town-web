"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import VideoCard from "./VideoCard";

const showcaseItems = [
  {
    title: "Apex Neural Drive",
    subtitle: "Performance AI · 2024",
    slug: "apex-neural-drive",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    video: "/assets/videos/apex-neural.mp4",
  },
  {
    title: "Vantage Vision Pro",
    subtitle: "Autonomous Vision · 2024",
    slug: "vantage-vision-pro",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
    video: "/assets/videos/car-vid.mp4",
  },
  {
    title: "Kinetic Ride Control",
    subtitle: "Active Suspension AI · 2024",
    slug: "kinetic-ride-control",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    video: "/assets/videos/kinetic-ride.mp4",
  },
];

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll("[data-video-card]");
      if (!cards) return;
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-void px-6 sm:px-15 py-30"
    >
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
          In Motion
        </p>
        <h2 className="font-display font-700 text-[clamp(2rem,4vw,3.5rem)] text-white mb-16">
          Witness the technology.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {showcaseItems.map((item) => (
            <div key={item.slug} data-video-card>
              <VideoCard
                title={item.title}
                subtitle={item.subtitle}
                slug={item.slug}
                imageSrc={item.image}
                videoSrc={item.video}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
