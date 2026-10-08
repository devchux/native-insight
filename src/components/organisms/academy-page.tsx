import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import type { AcademyPageContent } from "@/lib/wordpress/academy-page";

const academyImages = [
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-28-at-18.35.28.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-28-at-18.35.28-1.jpeg",
];

export function AcademyPage({ content }: { content: AcademyPageContent }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pb-[clamp(62px,8vw,108px)] pt-35 md:pt-50">
          <Container wide>
            <nav aria-label="Breadcrumb" className="mb-7 text-base text-ink-dim">
              <Link href="/" className="transition hover:text-brand">Home</Link>
              <span className="mx-2.5 text-muted">/</span>
              <span>Academy</span>
            </nav>
            <Kicker>{content.kicker}</Kicker>
            <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.2rem,6vw,5.25rem)] font-bold leading-[.96] tracking-[-.045em] text-brand">
              {content.title}
            </h1>
            <p className="mt-6 max-w-6xl text-base leading-[1.75] text-ink-dim">
              {content.introduction}
            </p>
          </Container>
        </section>

        <section className="pb-[clamp(68px,8vw,112px)]">
          <Container wide>
            <div className="relative aspect-[3/2] overflow-hidden bg-soft md:aspect-[16/7]">
              <Image
                src={academyImages[1]}
                alt="Professionals attending a Native Insight learning session"
                fill
                priority
                sizes="(min-width: 1280px) 1216px, calc(100vw - 40px)"
                className="object-cover object-center"
              />
            </div>
          </Container>

          <Container>
            <div className="mt-[clamp(56px,8vw,104px)] grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-18">
              <div className="relative aspect-[3/2] overflow-hidden bg-soft">
                <Image
                  src={academyImages[0]}
                  alt="A speaker presenting Africa's startup ecosystem to an audience"
                  fill
                  sizes="(min-width: 1024px) 52vw, calc(100vw - 40px)"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <Kicker>{content.purposeKicker}</Kicker>
                <h2 className="mt-4 font-display text-[clamp(2.75rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-.04em] text-brand">
                  {content.purposeTitle}
                </h2>
                <p className="mt-6 text-[clamp(1rem,1.35vw,1.18rem)] leading-8 text-ink-dim">
                  {content.purposeIntroduction}
                </p>
                <a href="mailto:consult@cms.nativeinsightng.com" className="mt-8 inline-flex items-center gap-2 text-base font-bold text-brand underline decoration-brand/30 underline-offset-6 transition hover:decoration-brand">
                  For bespoke sessions, contact consult@cms.nativeinsightng.com
                  <ArrowRight size={17} weight="bold" />
                </a>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-ink/10 bg-soft py-[clamp(72px,9vw,124px)]">
          <Container>
            <Kicker>{content.programmesKicker}</Kicker>
            <h2 className="mt-4 font-display text-[clamp(2.75rem,5vw,4rem)] font-bold leading-none tracking-[-.04em] text-brand">
              {content.programmesTitle}
            </h2>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {content.courses.map((course) => (
                <article key={course.title} className="flex min-h-108 flex-col border border-ink/12 bg-white p-7 md:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[.16em] text-brand">{course.level}</p>
                  <h3 className="mt-5 font-display text-[clamp(1.45rem,2vw,1.8rem)] font-bold leading-[1.12] tracking-[-.03em] text-brand">
                    {course.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-7 text-ink-dim">{course.description}</p>
                  <ul className="mt-7 space-y-3 border-t border-ink/10 pt-6 text-base text-ink-dim">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check size={15} weight="bold" className="shrink-0 text-brand" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:consult@cms.nativeinsightng.com" className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-base font-bold text-brand transition hover:gap-3">
                    Details <ArrowRight size={15} weight="bold" />
                  </a>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-[clamp(64px,8vw,104px)]">
          <Container>
            <div className="grid border border-ink/10 sm:grid-cols-3">
              {content.stats.map((stat, index) => (
                <div key={stat.label} className={`p-7 md:p-9 ${index ? "border-t border-ink/10 sm:border-l sm:border-t-0" : ""}`}>
                  <p className="font-display text-[clamp(2.5rem,4vw,4rem)] font-bold leading-none tracking-[-.04em] text-brand">{stat.value}</p>
                  <p className="mt-3 max-w-55 text-base leading-6 text-ink-dim">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
