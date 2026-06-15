"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GripVertical, Plus } from "lucide-react";

interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string | null;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  videoUrl: string | null;
  order: number;
  active: boolean;
}

export default function HeroEditorPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) => {
        setSlides(data.slides || []);
        setLoading(false);
      });
  }, []);

  const updateSlide = (id: string, field: string, value: unknown) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const moveSlide = (index: number, direction: -1 | 1) => {
    const newSlides = [...slides];
    const target = index + direction;
    if (target < 0 || target >= newSlides.length) return;
    [newSlides[index], newSlides[target]] = [newSlides[target], newSlides[index]];
    newSlides.forEach((s, i) => (s.order = i));
    setSlides(newSlides);
  };

  const saveAll = async () => {
    setSaving(true);
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides }),
    });
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="font-mono text-sm text-text-mono">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Hero Slides</h1>
        <button
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
        >
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="bg-surface-raised border border-border-subtle rounded-lg p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-1 pt-1">
                <button
                  onClick={() => moveSlide(index, -1)}
                  className="text-text-mono hover:text-white transition-colors"
                  disabled={index === 0}
                >
                  <GripVertical size={16} />
                </button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-text-mono uppercase tracking-wider block mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={slide.headline}
                    onChange={(e) => updateSlide(slide.id, "headline", e.target.value)}
                    className="w-full bg-surface border border-border-subtle px-3 py-2 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-text-mono uppercase tracking-wider block mb-1">
                    Subheadline
                  </label>
                  <input
                    type="text"
                    value={slide.subheadline || ""}
                    onChange={(e) => updateSlide(slide.id, "subheadline", e.target.value)}
                    className="w-full bg-surface border border-border-subtle px-3 py-2 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-text-mono uppercase tracking-wider block mb-1">
                    CTA Label
                  </label>
                  <input
                    type="text"
                    value={slide.ctaLabel}
                    onChange={(e) => updateSlide(slide.id, "ctaLabel", e.target.value)}
                    className="w-full bg-surface border border-border-subtle px-3 py-2 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-text-mono uppercase tracking-wider block mb-1">
                    CTA Href
                  </label>
                  <input
                    type="text"
                    value={slide.ctaHref}
                    onChange={(e) => updateSlide(slide.id, "ctaHref", e.target.value)}
                    className="w-full bg-surface border border-border-subtle px-3 py-2 text-sm text-white font-body rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-text-mono uppercase tracking-wider block mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={slide.imageUrl}
                    onChange={(e) => updateSlide(slide.id, "imageUrl", e.target.value)}
                    className="w-full bg-surface border border-border-subtle px-3 py-2 text-sm text-white font-mono rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slide.active}
                      onChange={(e) => updateSlide(slide.id, "active", e.target.checked)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                      Active
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
