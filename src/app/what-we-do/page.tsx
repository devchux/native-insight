import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { ServicesAccordion } from "@/components/organisms/services-accordion";

export const metadata: Metadata = { title: "What We Do" };

const services = [
  {
    title: "Research & Strategy Advisory",
    copy: "Our team of experts provide deep research reports that position our clients as thought leaders in their respective industries. We work closely with our clients to design strategies that deliver immediate value.",
    tags: [
      "Market research",
      "Sector studies",
      "Go-to-market",
      "Competitive intel",
    ],
  },
  {
    title: "Data-driven Insights",
    copy: "Some of our clients have unique market data, from their day-to-day operations, spanning over 5-10 years that gives insight on the state of industry. We are happy to review, analyse, and draw insights from these market data and use the findings to help you lead in your niche.",
    tags: ["Survey infrastructure", "Dashboards", "Data pipelines"],
  },
  {
    title: "Business Transformation & AI",
    copy: "Artificial Intelligence (AI) is fast-changing how we live and how we do business. It is making things easier through automation and efficiency gains. We review your process, build strategy and advise on process-improvements using tools that unlock efficiency and enhance bottom lines.",
    tags: ["Operating models", "Applied AI", "Automation", "Change mgmt"],
  },
  {
    title: "Startups & SME Support",
    copy: "Especially for young founders, starting a business can be overwhelming. Our startup desk help founders and SMEs navigate Africa’s tough markets by providing structure, regulatory and macroeconomic oversight, partnerships, tax, events and major winds.",
    tags: ["Investment readiness", "Market entry", "Growth strategy"],
  },
  {
    title: "Partnerships & Events",
    copy: "Partnerships and collaborations are easily overlooked growth strategies. As we are always open to partnerships, we advise and help our clients do the same by identifying growth opportunities in partnership and key industry events.",
    tags: ["Conferences", "Roundtables", "Partnerships"],
  },
  {
    title: "Tailored Solutions",
    copy: "We are always open to discuss other ideas and issues you would need keen eyes and experienced hands on.",
    tags: [],
  },
] as const;

const approach = [
  [
    "Frame",
    "We scope the real question, problem-specific and sector-specific, before any fieldwork begins.",
  ],
  [
    "Research",
    "Primary and secondary research across our pan-African network of consultants and field teams.",
  ],
  [
    "Synthesise",
    "We turn raw signal into strategy, clear, defensible, and tied to measurable outcomes.",
  ],
  [
    "Activate",
    "We stay close through delivery, helping you act on insight and evaluate the impact.",
  ],
] as const;

export default function WhatWeDoPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pt-42.5">
          <Container wide>
            <div className="[&_.kicker]:text-ink [&_.kicker]:tracking-[.01em] [&_.kicker>span]:bg-accent">
              <Kicker>Our practice</Kicker>
            </div>
            <h1 className="mt-3.75 max-w-[14ch] font-display text-[clamp(40px,6vw,82px)] font-bold leading-[.98] tracking-[-.045em]">
              We help African businesses grow, transform, and secure Africa’s
              digital future
            </h1>
            <p className="mt-5.5 max-w-[94ch] text-[17px] leading-[1.55] text-ink-dim">
              We combine an agile approach with rigorous research tools to grow
              businesses, give investors market insight, and evaluate impact for
              governments and development partners, problem-specific,
              sector-specific, pan-African.
            </p>
          </Container>
        </section>
        <Container wide as="section" className="py-[clamp(36px,6vw,88px)]">
          <ServicesAccordion items={services} />
        </Container>
        <section className="border-y border-ink/10 bg-soft py-[clamp(36px,6vw,88px)]">
          <Container>
            <div className="[&_.kicker]:text-ink [&_.kicker]:tracking-[.01em] [&_.kicker>span]:bg-accent">
              <Kicker>How we work</Kicker>
            </div>
            <h2 className="mt-3.75 max-w-[18ch] font-display text-[clamp(34px,4.6vw,60px)] font-bold leading-[1.02] tracking-[-.04em]">An agile method, built around your problem.</h2>
            <div className="mt-5 grid grid-cols-1 gap-5.5 min-[521px]:grid-cols-2 min-[861px]:grid-cols-4">
              {approach.map(([title, copy], index) => (
                <article className="border border-ink/10 bg-soft p-7.5" key={title}>
                  <p className="font-display text-[44px] leading-none text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4.5 mb-2.5 font-display text-xl font-bold leading-[1.15]">{title}</h3>
                  <p className="text-[14.5px] leading-[1.55] text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter ctaTitle="Talk to us" />
    </>
  );
}
