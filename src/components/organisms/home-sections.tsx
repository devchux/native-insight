import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { ServicesAccordion } from "@/components/organisms/home-interactive";
import { decodeHtml, featuredImage, postTerms } from "@/lib/content";
import type { WpPost } from "@/types/wordpress";

export function ExpertiseStrip() {
  const items = [
    "Digital Economy",
    "Digital Society",
    "Digital Government",
    "Digital Infrastructure",
    "Business Transformation & AI",
    "Research & Strategy",
    "Startups & SME Support",
    "Data-driven Insights",
  ];
  return (
    <div className="marquee-shell">
      <div className="expertise-marquee">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function Stats() {
  const stats = [
    [
      "12+",
      "Research",
      "Years of extensive research in market analysis & insights",
    ],
    [
      "6+",
      "Track record",
      "Years of delivering impactful results beyond client expectations",
    ],
    ["48+", "Our people", "Strong team and consultants across Africa"],
  ];
  return (
    <Container
      as="section"
      className="grid py-[clamp(48px,6vw,88px)] md:grid-cols-3"
    >
      {stats.map(([number, label, copy], index) => (
        <div
          key={label}
          className={`py-7 md:px-9 md:first:pl-0 ${index < stats.length - 1 ? "border-b border-ink/15 md:border-b-0 md:border-r" : ""}`}
        >
          <p className="text-sm font-semibold uppercase text-brand">{label}</p>
          <p className="mt-3 font-display text-[clamp(3.25rem,7vw,5.75rem)] leading-none tracking-[-.04em]">
            {number}
          </p>
          <p className="mt-4 max-w-[26ch] text-sm leading-6 text-ink-dim">
            {copy}
          </p>
        </div>
      ))}
    </Container>
  );
}

export function Services() {
  return (
    <section className="border-y border-ink/10 bg-soft py-[clamp(48px,6vw,88px)]">
      <Container>
        <Kicker>What we do</Kicker>
        <div className="mt-5 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-[-.03em]">
            Solutions that unlock great value.
          </h2>
          <Link href="/what-we-do" className="font-bold text-brand">
            All services →
          </Link>
        </div>
        <ServicesAccordion />
      </Container>
    </section>
  );
}

export function LatestInsights({ posts }: { posts: WpPost[] }) {
  return (
    <section className="py-[clamp(48px,6vw,88px)]">
      <Container>
        <Kicker>Latest insights</Kicker>
        <div className="mt-5 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-[-.03em]">
            Work with us into the future of business.
          </h2>
          <Link href="/insights" className="font-bold text-brand">
            All insights →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => {
            const image = featuredImage(post);
            const terms = postTerms(post).slice(0, 2);
            return (
              <article key={post.id} className="group overflow-hidden bg-soft">
                <Link
                  href={`/${post.slug}`}
                  className="relative block aspect-4/3 overflow-hidden bg-surface"
                >
                  {image ? (
                    <Image
                      src={image.source_url}
                      alt={image.alt_text || decodeHtml(post.title.rendered)}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.025]"
                    />
                  ) : null}
                </Link>
                <div className="p-6">
                  <p className="mb-4 text-[11px] uppercase tracking-[.12em] text-ink-dim">
                    {terms.map((term) => term.name).join(", ")}
                  </p>
                  <h3 className="font-display text-[clamp(1rem,1.2vw,1.2rem)] tracking-[-.02em]">
                    {decodeHtml(post.title.rendered)}
                  </h3>
                  <Link
                    href={`/${post.slug}`}
                    className="mt-7 inline-flex font-bold text-brand"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function Partners() {
  const logos = [
    ["Construct Africa", "constructAfrica.png"],
    ["Atlas", "atlasDev-300x99-1.png"],
    ["AfriLabs", "afrilabs.png"],
  ];
  return (
    <section className="border-t border-ink/10 py-16">
      <Container>
        <Kicker>Clients & partners</Kicker>
        <div className="partner-mask mt-8 overflow-hidden">
          <div className="partner-marquee">
            {[...logos, ...logos].map(([name, file], index) => (
              <div
                key={`${name}-${index}`}
                aria-hidden={index >= logos.length}
                className="grid h-28 w-55 shrink-0 place-items-center bg-white p-4"
              >
                <div className="relative h-20 w-44">
                  <Image
                    src={`https://nativeinsightng.com/wp-content/uploads/2026/06/${file}`}
                    alt={index < logos.length ? name : ""}
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
