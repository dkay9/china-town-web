"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface VideoCardProps {
  title: string;
  subtitle: string;
  slug: string;
  imageSrc: string;
  videoSrc: string;
}

export default function VideoCard({
  title,
  subtitle,
  slug,
  imageSrc,
  videoSrc,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current && !videoFailed) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  return (
    <a
      href={`/products/${slug}`}
      className="group relative block overflow-hidden"
      style={{ aspectRatio: "16/10" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static image — default state */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        className={`object-cover object-center transition-opacity duration-700 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Video — only mounted if not failed */}
      {!videoFailed && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          onError={() => {
            setVideoFailed(true);
            setIsPlaying(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      {/* Card content */}
      <div className="absolute bottom-0 inset-x-0 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/50 mb-1">
          {subtitle}
        </p>
        <h3 className="font-display font-600 text-xl text-white">{title}</h3>
        <span
          className={`inline-flex items-center gap-2 mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 transition-all duration-300 ${
            isPlaying
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          View Details →
        </span>
      </div>

      {/* Play indicator — shows on hover before video starts */}
      {!videoFailed && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
            isPlaying ? "opacity-0" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5 ml-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </a>
  );
}