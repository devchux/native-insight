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
      <p className="about-eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="about-section-title">{children}</h2>
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
              <p className="about-eyebrow">
                <span aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.306rem,5vw,4.55rem)] font-bold leading-[.96] tracking-[-.055em]">
                {content.title}
              </h1>
            </div>
            <div className="mt-[clamp(64px,9vw,112px)]">
              <div className="space-y-5 text-[clamp(1rem,1.35vw,1.18rem)] leading-[1.75] text-ink-dim">
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
            <div className="about-pillars">
              {content.commitments.map((item, index) => (
                <article key={item.title} className="about-pillar">
                  <span className="about-icon" aria-hidden="true">
                    {commitmentIcons[index]}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-soft pb-[clamp(37px,6vw,77px)]">
          <Container className="space-y-5 pt-[clamp(37px,6vw,77px)]">
            {[
              { label: "Our Mission", ...content.mission },
              { label: "Our Vision", ...content.vision },
            ].map((item) => (
              <article key={item.label} className="about-manifesto">
                <p className="about-eyebrow">
                  <span aria-hidden="true" />
                  {item.label}
                </p>
                <h2 className="about-section-title">{item.title}</h2>
                <p>{item.copy}</p>
              </article>
            ))}
          </Container>
        </section>

        <section className="py-[clamp(37px,6vw,77px)]">
          <Container>
            <SectionHeading eyebrow="Our Core Values">
              The principles that shape our work.
            </SectionHeading>
            <div className="about-values">
              {content.values.map((item, index) => (
                <article key={item.title} className="about-value">
                  <p className="about-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
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
            <div className="about-perks">
              {content.differentiators.map((item, index) => (
                <article key={item.title} className="about-perk">
                  <span className="about-icon" aria-hidden="true">
                    {differentiatorIcons[index]}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="about-journey py-[clamp(37px,6vw,77px)]">
          <Container>
            <SectionHeading eyebrow="The journey">
              A track record across Africa.
            </SectionHeading>
            <div className="about-timeline">
              {content.milestones.map((item) => (
                <article key={item.year} className="about-timeline-row">
                  <p className="about-year">{item.year}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
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
