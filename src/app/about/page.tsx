import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { AboutGallery } from "@/components/organisms/about-gallery";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import {
  aboutContentFromWordPress,
  fallbackAboutContent,
} from "@/lib/about-content";
import { getPage } from "@/lib/wordpress/client";

export const metadata: Metadata = {
  title: "About Us",
  description: fallbackAboutContent.statement,
};

const commitmentIcons = ["◷", "◆", "◉"];
const differentiatorIcons = ["◷", "◆", "◉", "◍", "▣", "✦"];

async function getAboutContent() {
  try {
    return aboutContentFromWordPress(await getPage("about"));
  } catch {
    return fallbackAboutContent;
  }
}

function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-3 text-[13px] font-extrabold tracking-[.01em] text-brand uppercase">
        <span className="h-px w-6.25 bg-brand" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-.04em] text-brand">{children}</h2>
    </div>
  );
}

export default async function AboutPage() {
  const content = await getAboutContent();
  return (
    <>
      <a href="#primary" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="primary">
        <section className="pb-[clamp(54px,7vw,92px)] pt-42.5 lg:pt-44">
          <Container>
            <div className="mt-16 max-w-190 lg:mt-8">
              <p className="flex items-center gap-3 text-[13px] font-extrabold tracking-[.01em] text-brand uppercase">
                <span className="h-px w-6.25 bg-brand" aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[.96] tracking-[-.055em] text-brand">
                {content.title}
              </h1>
            </div>
            <div className="mt-[clamp(3rem,5vw,3.5rem)]">
              <div className="space-y-5 text-sm leading-[1.75] text-ink-dim">
                {content.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-label="Native Insight team and events"
          className="overflow-hidden pb-[clamp(58px,8vw,110px)]"
        >
          <AboutGallery images={content.gallery} />
        </section>

        <section className="bg-soft py-[clamp(37px,6vw,77px)]">
          <Container>
            <SectionHeading eyebrow="What drives us">
              Three commitments, one continent.
            </SectionHeading>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5.5">
              {content.commitments.map((item, index) => (
                <article key={item.title} className="border border-ink/10 px-7.5 py-8.5 md:h-61.25">
                  <span className="grid h-12 w-12 place-items-center bg-[#ebe6f8] text-xl leading-none text-[#3b0ba0]" aria-hidden="true">
                    {commitmentIcons[index]}
                  </span>
                  <h3 className="mt-6 mb-3 font-display text-[23px] font-bold leading-[1.02] tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-[1.55] text-muted">{item.copy}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-soft pb-[clamp(37px,6vw,77px)]">
          <Container className="space-y-5 pt-[clamp(37px,6vw,77px)] grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-14">
            {[
              { label: "Our Mission", ...content.mission },
              { label: "Our Vision", ...content.vision },
            ].map((item) => (
              <article key={item.label} className="flex min-h-49 flex-col gap-5 last:min-h-64">
                <p className="flex items-center gap-3 text-[13px] font-extrabold tracking-[.01em] text-ink uppercase">
                  <span className="h-px w-6.25 bg-accent" aria-hidden="true" />
                  {item.label}
                </p>
                <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-.04em]">{item.title}</h2>
                <p className="text-sm leading-[1.55] text-ink-dim">{item.copy}</p>
              </article>
            ))}
          </Container>
        </section>

        <section className="py-[clamp(37px,6vw,77px)]">
          <Container>
            <SectionHeading eyebrow="Our Core Values">
              The principles that shape our work.
            </SectionHeading>
            <div className="mt-5 grid grid-cols-1 border-t border-ink/10 md:grid-cols-2">
              {content.values.map((item, index) => (
                <article key={item.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-ink/10 py-7 md:min-h-42 md:grid-cols-[64px_1fr] md:gap-5 md:py-8.5 md:pr-10 md:even:border-l md:even:pl-10 md:nth-[3]:min-h-47.75 md:nth-[4]:min-h-47.75">
                  <p className="text-sm text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="mb-2 font-display text-[21px] font-bold leading-[1.02]">{item.title}</h3>
                    <p className="text-sm leading-[1.55] text-muted">{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-[clamp(37px,6vw,77px)]">
          <Container>
            <SectionHeading eyebrow="Why work with us">
              What sets us apart.
            </SectionHeading>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5.5">
              {content.differentiators.map((item, index) => (
                <article key={item.title} className="border border-ink/10 bg-soft px-6.5 py-7">
                  <span className="grid h-11 w-11 place-items-center bg-[#ebe6f8] text-xl leading-none text-[#3b0ba0]" aria-hidden="true">
                    {differentiatorIcons[index]}
                  </span>
                  <h3 className="mt-4.5 mb-2 font-display text-lg font-bold leading-[1.02]">{item.title}</h3>
                  <p className="text-sm leading-[1.55] text-muted">{item.copy}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-[clamp(2rem,6vw,4.5rem)] lg:pt-45.5">
          <Container>
            <SectionHeading eyebrow="The journey">
              A track record across Africa.
            </SectionHeading>
            <div className="mt-5 border-t border-ink/10">
              {content.milestones.map((item, index) => (
                <article key={item.year} className={`grid grid-cols-[92px_1fr] gap-4.5 border-b border-ink/10 py-6.5 md:grid-cols-[120px_1fr] md:gap-7.5 md:py-7.5 ${index === 0 ? "md:min-h-40" : index === 3 ? "md:min-h-28.5" : "md:min-h-34.25"}`}>
                  <p className="font-display text-[28px] leading-[1.55] text-brand md:text-3xl">{item.year}</p>
                  <div>
                    <h3 className="mb-2 font-display text-[21px] font-bold leading-[1.02]">{item.title}</h3>
                    <p className="text-sm leading-[1.55] text-muted">{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
