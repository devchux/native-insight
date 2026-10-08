import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { decodeHtml, featuredImage } from "@/lib/content";
import type { WpPost } from "@/types/wordpress";

function categories(post: WpPost) {
  return (post._embedded?.["wp:term"]?.[0] ?? []).filter(
    (term) => term.slug !== "uncategorized",
  );
}

function articleHtml(html: string) {
  return html
    .replace(/&#8211;|&ndash;|–/g, "-")
    .replace(/&#8212;|&mdash;|—/g, "-");
}

function RelatedCard({ post }: { post: WpPost }) {
  const image = featuredImage(post);
  const title = decodeHtml(post.title.rendered);
  const terms = categories(post);

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden border border-ink/10 bg-white">
      <Link href={`/${post.slug}`} className="relative aspect-[1.58] overflow-hidden bg-surface">
        {image ? (
          <Image
            src={image.source_url}
            alt={image.alt_text || title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.025]"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {terms.length ? (
          <p className="inline-flex w-fit rounded-full border border-ink/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-ink-dim">
            {terms.map((term) => term.name).join(", ")}
          </p>
        ) : null}
        <h3 className="mt-4 font-display text-xl font-bold leading-[1.15] tracking-tight text-brand">
          <Link href={`/${post.slug}`} className="transition hover:text-accent">
            {title}
          </Link>
        </h3>
        <Link
          href={`/${post.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 text-base font-bold text-brand transition hover:gap-3"
        >
          Read article <ArrowRight size={15} weight="bold" />
        </Link>
      </div>
    </article>
  );
}

export function ArticleDetailPage({
  post,
  related,
}: {
  post: WpPost;
  related: WpPost[];
}) {
  const image = featuredImage(post);
  const terms = categories(post);
  const title = decodeHtml(post.title.rendered);

  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pb-0 pt-35 md:pt-38">
          <Container wide>
            <Link
              href="/insights"
              className="text-base text-ink-dim transition hover:text-brand"
            >
              Insights
            </Link>
            <div className="mt-7 max-w-6xl">
              {terms.length ? (
                <p className="inline-flex rounded-full border border-brand/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.12em] text-brand">
                  {terms.map((term) => term.name).join(", ")}
                </p>
              ) : null}
              <h1 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-bold leading-none tracking-[-.035em] text-brand">
                {title}
              </h1>
            </div>
          </Container>
        </section>

        {image ? (
          <Container wide as="section" className="pt-[clamp(36px,5vw,60px)]">
            <div className="relative aspect-[1.58] overflow-hidden bg-soft">
              <Image
                src={image.source_url}
                alt={image.alt_text || title}
                fill
                priority
                sizes="(min-width: 1536px) 1352px, 94vw"
                className="object-cover"
              />
            </div>
          </Container>
        ) : null}

        <section className="py-[clamp(54px,6vw,88px)]">
          <Container>
            <article
              className="mx-auto max-w-[70ch] text-[18px] leading-[1.75] text-ink-dim [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-3 [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:leading-5 [&_figcaption]:tracking-[.04em] [&_figure]:my-10 [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[clamp(1.5rem,2.6vw,2rem)] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-ink [&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-ink [&_img]:h-auto [&_img]:max-w-full [&_li]:relative [&_li]:pl-7 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:font-bold [&_li]:before:text-brand [&_li]:before:content-['→'] [&_ol]:mb-6 [&_ol]:grid [&_ol]:list-none [&_ol]:gap-3 [&_ol]:pl-0 [&_p]:mb-5.5 [&_p:first-of-type]:first-letter:float-left [&_p:first-of-type]:first-letter:pr-3.5 [&_p:first-of-type]:first-letter:pt-1.5 [&_p:first-of-type]:first-letter:font-display [&_p:first-of-type]:first-letter:text-[64px] [&_p:first-of-type]:first-letter:font-extrabold [&_p:first-of-type]:first-letter:leading-[.8] [&_p:first-of-type]:first-letter:text-brand [&_strong]:text-ink [&_ul]:mb-6 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-3 [&_ul]:pl-0"
              dangerouslySetInnerHTML={{
                __html: articleHtml(post.content?.rendered ?? ""),
              }}
            />
          </Container>
        </section>

        <section className="border-y border-ink/10 bg-soft py-[clamp(68px,8vw,112px)]">
          <Container wide>
            <Kicker>Keep reading</Kicker>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,4.4vw,3.75rem)] font-bold leading-none tracking-[-.035em] text-brand">
              Related insights.
            </h2>
            {related.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <RelatedCard key={item.id} post={item} />
                ))}
              </div>
            ) : (
              <p className="mt-8 border border-ink/10 bg-white p-7 text-ink-dim">
                More insights are being prepared.
              </p>
            )}
          </Container>
        </section>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
