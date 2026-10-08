import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { decodeHtml, featuredImage } from "@/lib/content";
import type { WpPost } from "@/types/wordpress";

export function reportHref(report: WpPost) {
  return `/reports/${report.slug}`;
}

export function reportCategory(report: WpPost) {
  return report._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Report";
}

export function ReportCard({ report }: { report: WpPost }) {
  const image = featuredImage(report);
  const title = decodeHtml(report.title.rendered);

  return (
    <article className="group flex min-w-0 flex-col bg-white">
      <Link href={reportHref(report)} className="relative aspect-[1.5] overflow-hidden bg-soft">
        {image ? <Image src={image.source_url} alt={image.alt_text || title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" /> : null}
        <span className="absolute bottom-0 left-0 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.13em] text-brand">
          {reportCategory(report)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col border-x border-b border-ink/10 p-6 md:p-7">
        <h2 className="font-display text-[clamp(1.35rem,2vw,1.75rem)] font-bold leading-[1.12] tracking-[-.03em] text-brand">
          <Link href={reportHref(report)} className="transition hover:text-accent">{title}</Link>
        </h2>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[.15em] text-muted">PDF · Report</p>
        <Link href={reportHref(report)} className="mt-6 inline-flex w-fit items-center gap-2 text-base font-bold text-brand transition hover:gap-3">
          Read report <ArrowRight size={15} weight="bold" />
        </Link>
      </div>
    </article>
  );
}
