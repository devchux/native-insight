"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";

const heroImages = [
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/09/19358e93df94b780366f28ee17085056-xxlarge.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-10-at-10.25.01.jpeg",
  // "https://cms.nativeinsightng.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-10-at-13.34.45.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-10-at-10.53.47.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-10-at-10.53.48.jpeg",
  // "https://cms.nativeinsightng.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-10-at-11.03.30.jpeg",
  // "https://cms.nativeinsightng.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-10-at-11.03.31.jpeg",
];
const words = ["grow", "transform", "secure"];

export function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const animationFrame = requestAnimationFrame(() => setCount(value));
      return () => cancelAnimationFrame(animationFrame);
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 1400;
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));

          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <span ref={elementRef} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {count}
        {suffix}
      </span>
    </span>
  );
}

export function HomeHero() {
  const [slide, setSlide] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const slides = window.setInterval(
      () => setSlide((value) => (value + 1) % heroImages.length),
      6000,
    );
    const headings = window.setInterval(
      () => setWord((value) => (value + 1) % words.length),
      2800,
    );
    return () => {
      window.clearInterval(slides);
      window.clearInterval(headings);
    };
  }, []);

  return (
    <section
      data-header-trigger
      className="relative min-h-dvh overflow-hidden bg-deep text-white"
    >
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1500 ${slide === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,.78)_0%,rgba(0,0,0,.7)_42%,rgba(0,0,0,.3)_74%,transparent_100%)] max-md:bg-[linear-gradient(180deg,rgba(0,0,0,.6)_0%,rgba(0,0,0,.78)_52%,rgba(0,0,0,.55)_100%)]" />
      <Container
        wide
        className="relative flex min-h-dvh flex-col justify-center pb-16 pt-31 md:pb-24 md:pt-37.5"
      >
        <div className="relative flex flex-wrap gap-x-7 gap-y-2 border-b border-purple-100/25 pb-5 text-[clamp(.78rem,1vw,1.02rem)] text-purple-50 after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-30 after:bg-linear-to-r after:from-brand after:to-accent">
          {[
            ["Local", "solution"],
            ["Pan-African", "perspective"],
            ["Global", "participation"],
          ].map(([strong, rest]) => (
            <span
              key={strong}
              className="inline-flex items-center gap-3 whitespace-nowrap font-semibold"
            >
              <i className="h-2 w-2 rotate-45 bg-purple-300" />
              <span>
                <b>{strong}</b> {rest}
              </span>
            </span>
          ))}
        </div>
        <h1 className="my-8 max-w-85 font-display text-[clamp(2rem,3.5vw,5rem)] font-bold leading-[1.08] tracking-[-.045em] md:mt-10 lg:max-w-125 xl:max-w-145 xl:text-[clamp(2rem,4vw,5rem)]">
          We help African businesses{" "}
          <span
            key={words[word]}
            className="inline-block animate-[word-in_.5s_ease_both] text-accent"
          >
            {words[word]}
          </span>{" "}
          Africa&apos;s digital future
        </h1>
        <Kicker light>Who we are</Kicker>
        <div className="mt-1 grid items-start gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
          <div>
            <p className="max-w-[52ch] text-[clamp(1rem,1vw,1.25rem)] leading-[1.65] text-purple-50/90">
              Native Insight combines agile approach with research tools to
              reposition businesses for growth, provide market insights to
              investors, and evaluate impact to government and development
              partners.
              <br />
              Our team of highly skilled professionals, spread across the
              continent, makes our approach problem-specific and
              sector-specific.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-3 bg-brand px-7 py-4 text-sm font-bold transition hover:bg-brand-deep"
              >
                What we do <ArrowRight size={18} weight="bold" />
              </Link>
              <Link
                href="/our-team"
                className="inline-flex items-center border border-white/45 px-7 py-4 text-sm font-bold transition hover:border-white hover:bg-white/10"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const services = [
  [
    "Research & Strategy Advisory",
    "Evidence-led market research, sector studies and strategy that reposition businesses for growth.",
  ],
  [
    "Business Transformation & AI",
    "Operating-model redesign and applied AI that turn digital potential into measurable performance.",
  ],
  [
    "Digital Economy & Government",
    "Policy insight and impact evaluation for governments and development partners across Africa.",
  ],
  [
    "Startups & SME Support",
    "Hands-on support that helps young, creative ventures scale and attract investment.",
  ],
  [
    "Data-driven Insights",
    "Survey infrastructure and data tools that give investors and operators a real market edge.",
  ],
  [
    "Digital Infrastructure",
    "Advisory on the systems and capabilities that underpin Africa's digital future.",
  ],
] as const;

export function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-12 border-t border-ink/15">
      {services.map(([title, copy], index) => (
        <div
          key={title}
          className="group border-b border-ink/15"
          onMouseEnter={() => setOpen(index)}
        >
          <button
            type="button"
            aria-expanded={open === index}
            onClick={() => setOpen(index)}
            className={`flex w-full items-center gap-4 px-1 py-6 text-left transition md:gap-6 ${open === index ? "px-5" : "hover:px-5"}`}
          >
            <span className="text-xs font-bold tracking-wider text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 font-display text-[clamp(1rem,2vw,1.4rem)] font-semibold leading-tight">
              {title}
            </span>
            <span
              aria-hidden="true"
              className="relative h-5 w-5 after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-ink after:transition before:absolute before:left-1/2 before:top-1/2 before:h-0.5 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-ink data-[open=true]:after:rotate-90 data-[open=true]:after:opacity-0"
              data-open={open === index}
            />
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ${open === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <div className="overflow-hidden">
              <p className="max-w-[66ch] px-5 pb-7 text-sm leading-7 text-ink-dim">
                {copy}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
