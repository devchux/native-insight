import type { Metadata } from "next";
import { Container } from "@/components/atoms/container";
import { PageShell } from "@/components/organisms/page-shell";
import { pageContent, serviceItems } from "@/lib/site-pages";

export const metadata: Metadata = { title: "What We Do" };
export default function WhatWeDoPage() {
  return <PageShell {...pageContent.services} image="https://nativeinsightng.com/wp-content/uploads/2026/04/insights1.jpg"><Container as="section" className="grid gap-px bg-ink/15 py-[clamp(70px,9vw,120px)] md:grid-cols-2">{serviceItems.map(([title, copy], index) => <article key={title} className="bg-white p-7 md:p-10"><p className="text-xs font-bold text-brand">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-5 font-display text-3xl leading-tight">{title}</h2><p className="mt-4 max-w-lg text-base leading-7 text-ink-dim">{copy}</p></article>)}</Container></PageShell>;
}
