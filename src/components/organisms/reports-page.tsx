import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CaretUp,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { ReportCard, reportHref } from "@/components/molecules/report-card";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { decodeHtml, featuredImage } from "@/lib/content";
import type { ReportsPageContent } from "@/lib/wordpress/reports-page";
import type { WpPost } from "@/types/wordpress";

export function ReportsPage({
  content,
  reports,
}: {
  content: ReportsPageContent;
  reports: WpPost[];
}) {
  const flagship = reports[0];
  const flagshipImage = flagship ? featuredImage(flagship) : null;

  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pb-[clamp(56px,7vw,92px)] pt-35 md:pt-50">
          <Container wide>
            <Kicker>{content.kicker}</Kicker>
            <h1 className="mt-5 font-display text-[clamp(3.2rem,5vw,4.35rem)] font-bold leading-[.98] tracking-[-.045em] text-brand">
              {content.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-ink-dim">
              {content.introduction}
            </p>
          </Container>
        </section>

        <Container wide as="section">
          {flagship ? (
            <article className="grid overflow-hidden border lg:grid-cols-[1.1fr_.9fr]">
              <Link
                href={reportHref(flagship)}
                className="group relative min-h-72 lg:min-h-125"
              >
                {flagshipImage ? (
                  <Image
                    src={flagshipImage.source_url}
                    alt={flagshipImage.alt_text || decodeHtml(flagship.title.rendered)}
                    fill
                    priority
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                ) : null}
              </Link>
              <div className="flex flex-col justify-center p-[clamp(30px,5vw,68px)]">
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-brand">
                  <CaretUp size={11} weight="fill" /> {content.flagshipLabel}
                </p>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-.04em] text-brand">
                  {decodeHtml(flagship.title.rendered)}
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={reportHref(flagship)}
                    className="inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap bg-brand px-6 py-3.5 text-base font-bold text-white! transition hover:bg-surface active:translate-y-px"
                  >
                    {content.readLabel} <ArrowRight size={16} weight="bold" />
                  </Link>
                  {content.downloadHref ? (
                    <a
                      href={content.downloadHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap border border-brand px-6 py-3.5 text-base font-bold text-brand! transition hover:border-white hover:bg-white/10 active:translate-y-px"
                    >
                      {content.downloadLabel} <ArrowDown size={16} weight="bold" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ) : (
            <p className="border border-ink/10 bg-soft p-8 text-ink-dim">
              Reports are being updated.
            </p>
          )}
        </Container>

        <section className="py-[clamp(66px,8vw,116px)]">
          <Container wide>
            {reports.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <p className="border border-ink/10 bg-soft p-8 text-ink-dim">
                No reports are available yet.
              </p>
            )}
          </Container>
        </section>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
