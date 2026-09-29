"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function GalleryReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={revealRef} className={`gallery-scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
