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
      <Container wide className="about-gallery">
        {images.map((src, index) => (
          <div key={src} className={`about-gallery-item about-gallery-item-${index + 1}`}>
            <Image
              src={src}
              alt="Native Insight team and community"
              fill
              sizes="(max-width: 767px) 80vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </Container>
    </div>
  );
}
