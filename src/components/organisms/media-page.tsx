import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import type { MediaPageContent } from "@/lib/wordpress/media-page";

export function MediaPage({ content }: { content: MediaPageContent }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pb-[clamp(64px,8vw,112px)] pt-35 md:pt-50">
          <Container wide>
            <Kicker>{content.kicker}</Kicker>
            <h1 className="mt-5 font-display text-[clamp(3.2rem,5vw,4.35rem)] font-bold leading-[.98] tracking-[-.045em]">
              {content.title}
            </h1>
            <p className="mt-5 max-w-6xl text-[clamp(1.05rem,1.55vw,1.3rem)] leading-[1.75] text-ink-dim">
              {content.introduction}
            </p>
          </Container>
        </section>

        <section className="pb-[clamp(76px,9vw,126px)]">
          <Container wide>
            <Kicker>{content.coverageKicker}</Kicker>
            {content.features.length ? (
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {content.features.map((feature) => (
                  <a
                    key={feature.href}
                    href={feature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-16/10 overflow-hidden bg-soft text-white"
                  >
                    <Image
                      src={feature.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.025]"
                    />
                    <span className="absolute inset-0 bg-linear-to-t from-deep/90 via-deep/10 to-black/15" />
                    <span className="absolute left-4 top-4 bg-ink/85 px-3 py-2 text-[11px] font-medium uppercase tracking-[.12em] md:left-5 md:top-5">
                      {feature.outlet}
                    </span>
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center bg-brand text-white transition group-hover:scale-105">
                        <Play size={20} weight="fill" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="absolute inset-x-5 bottom-5 max-w-[34ch] font-display text-white font-bold leading-tight md:inset-x-7 md:bottom-7">
                      {feature.title}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-5 border border-ink/10 bg-soft p-7 text-ink-dim">
                Press coverage is being updated.
              </p>
            )}
          </Container>
        </section>

        <section className="pb-[clamp(78px,9vw,130px)]">
          <Container wide>
            <Kicker>{content.galleryKicker}</Kicker>
            <h2 className="mt-1 font-display text-[clamp(3rem,5vw,4.25rem)] font-bold leading-none tracking-[-.04em]">
              {content.galleryTitle}
            </h2>
            {content.gallery.length ? (
              <div className="mt-6 grid grid-cols-1 gap-4 grid-flow-dense sm:grid-cols-2 sm:auto-rows-55 lg:grid-cols-4 lg:auto-rows-45 xl:auto-rows-47.5">
                {content.gallery.map((item, index) => (
                  <figure
                    key={`${item.image}-${index}`}
                    className={`relative min-h-64 overflow-hidden bg-soft sm:min-h-0 ${item.wide ? "sm:col-span-2" : "sm:col-span-1"} ${item.tall ? "sm:row-span-2" : "sm:row-span-1"}`}
                  >
                    <Image
                      src={item.image}
                      alt="Native Insight event and field work"
                      fill
                      sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 hover:scale-[1.02]"
                    />
                  </figure>
                ))}
              </div>
            ) : (
              <p className="mt-6 border border-ink/10 bg-soft p-7 text-ink-dim">
                Gallery images are being updated.
              </p>
            )}
          </Container>
        </section>

        <section className="pb-[clamp(78px,9vw,128px)]">
          <Container>
            <div className="grid gap-5 md:grid-cols-3">
              {content.resources.map((resource) => (
                <article
                  key={resource.title}
                  className="border border-ink/10 bg-soft p-7 md:min-h-44 md:p-8"
                >
                  <h3 className="font-display text-xl font-bold tracking-[-.02em]">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {resource.description}
                  </p>
                  {resource.href ? (
                    <Link
                      href={resource.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:gap-3"
                    >
                      {resource.label} <ArrowRight size={15} weight="bold" />
                    </Link>
                  ) : (
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
                      {resource.label} <ArrowRight size={15} weight="bold" />
                    </span>
                  )}
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
