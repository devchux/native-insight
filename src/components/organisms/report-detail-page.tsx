import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { ReportCard, reportCategory } from "@/components/molecules/report-card";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { decodeHtml, featuredImage } from "@/lib/content";
import type { WpPost } from "@/types/wordpress";

function DownloadLink({
  href,
  full = false,
}: {
  href: string;
  full?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap px-6 py-3.5 text-base font-bold transition active:translate-y-px ${full ? "w-full bg-white text-brand! hover:bg-surface" : "border border-brand/30 text-brand! hover:border-brand"}`}
    >
      Download PDF <ArrowDown size={16} weight="bold" />
    </a>
  );
}

export function ReportDetailPage({
  report,
  related,
  downloadHref,
}: {
  report: WpPost;
  related: WpPost[];
  downloadHref?: string;
}) {
  const image = featuredImage(report);
  const title = decodeHtml(report.title.rendered);

  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pt-35 md:pt-40">
          <Container wide>
            <div className="mt-7 grid items-center gap-9 lg:grid-cols-[1.1fr_.9fr] lg:gap-[clamp(40px,5vw,72px)]">
              <div>
                <p className="inline-flex rounded-full border border-brand/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.12em] text-brand">
                  {reportCategory(report)}
                </p>
                <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.5rem,5vw,4.25rem)] font-bold leading-none tracking-[-.035em] text-brand">
                  {title}
                </h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="#summary"
                    className="inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap bg-brand px-6 py-3.5 text-base font-bold text-white! transition hover:bg-brand-deep active:translate-y-px"
                  >
                    Read summary <ArrowRight size={16} weight="bold" />
                  </Link>
                  {downloadHref ? <DownloadLink href={downloadHref} /> : null}
                </div>
              </div>
              {image ? (
                <div className="relative aspect-[1.58] overflow-hidden bg-soft">
                  <Image
                    src={image.source_url}
                    alt={image.alt_text || title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          </Container>
        </section>

        <section
          id="summary"
          className="scroll-mt-24 py-[clamp(68px,8vw,112px)]"
        >
          <Container wide>
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_300px] lg:gap-[clamp(40px,5vw,72px)]">
              <article
                className="max-w-[68ch] text-[17.5px] leading-[1.7] text-ink-dim [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-3 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-ink [&_img]:h-auto [&_img]:max-w-full [&_p]:mb-5 [&_p:first-of-type]:first-letter:float-left [&_p:first-of-type]:first-letter:pr-3.5 [&_p:first-of-type]:first-letter:pt-1.5 [&_p:first-of-type]:first-letter:font-display [&_p:first-of-type]:first-letter:text-[64px] [&_p:first-of-type]:first-letter:font-extrabold [&_p:first-of-type]:first-letter:leading-[.8] [&_p:first-of-type]:first-letter:text-brand"
                dangerouslySetInnerHTML={{
                  __html: report.content?.rendered ?? "",
                }}
              />
              {downloadHref ? (
                <aside className="bg-deep p-7 text-white lg:sticky lg:top-25">
                  <h2 className="font-display text-lg font-bold text-purple-100">
                    Get the full report
                  </h2>
                  <p className="mt-2 text-base leading-6 text-purple-100/75">
                    Data, market profiles and recommendations.
                  </p>
                  <div className="mt-5">
                    <DownloadLink href={downloadHref} full />
                  </div>
                </aside>
              ) : null}
            </div>
          </Container>
        </section>

        <section className="border-y border-ink/10 bg-soft py-[clamp(68px,8vw,112px)]">
          <Container wide>
            <Kicker>Keep reading</Kicker>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,4.4vw,3.75rem)] font-bold leading-none tracking-[-.035em] text-brand">
              Related reports.
            </h2>
            {related.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ReportCard key={item.id} report={item} />
                ))}
              </div>
            ) : (
              <p className="mt-8 border border-ink/10 bg-white p-7 text-ink-dim">
                More reports are being prepared.
              </p>
            )}
          </Container>
        </section>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
