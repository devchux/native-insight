"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/atoms/container";

export function AboutGallery({ images }: { images: string[] }) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = revealRef.current;
    if (!gallery || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gallery.classList.add("is-zoom-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gallery.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.01, rootMargin: "0px 0px 12% 0px" },
    );

    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={revealRef} className="about-gallery-reveal">
      <Container wide className="flex gap-3 overflow-x-auto pr-5 snap-x snap-mandatory md:grid md:grid-cols-12 md:auto-rows-[82px] md:overflow-visible md:pr-[clamp(20px,5vw,64px)]">
        {images.map((src, index) => (
          <div key={src} className={`relative h-77.5 min-w-[min(78vw,420px)] snap-start overflow-hidden bg-surface md:h-auto md:min-w-0 ${[
            "md:col-span-5 md:row-span-4",
            "md:col-span-3 md:row-span-2",
            "md:col-span-4 md:row-span-3",
            "md:col-span-3 md:row-span-4",
            "md:col-span-3 md:row-span-2",
            "md:col-span-2 md:row-span-2",
            "md:col-span-4 md:row-span-3",
          ][index] ?? "md:col-span-3 md:row-span-2"}`}>
            <Image
              src={src}
              alt="Native Insight team and community"
              fill
              sizes="(max-width: 767px) 80vw, 33vw"
              className="about-gallery-image object-cover"
            />
          </div>
        ))}
      </Container>
    </div>
  );
}
