import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportDetailPage } from "@/components/organisms/report-detail-page";
import { decodeHtml, featuredImage } from "@/lib/content";
import { getContentByType, getReport } from "@/lib/wordpress/client";
import { getReportDownloadHref } from "@/lib/wordpress/report-detail";
import type { WpPost } from "@/types/wordpress";

export async function generateStaticParams() {
  const reports = await getContentByType<WpPost>("report");
  return reports.items.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) return {};
  const image = featuredImage(report)?.source_url;
  return {
    title: decodeHtml(report.title.rendered),
    description:
      report.yoast_head_json?.description ??
      decodeHtml(report.excerpt?.rendered ?? ""),
    openGraph: image ? { images: [image] } : undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [report, reports] = await Promise.all([
    getReport(slug),
    getContentByType<WpPost>("report"),
  ]);
  if (!report) notFound();
  const downloadHref = await getReportDownloadHref(report);
  return (
    <ReportDetailPage
      report={report}
      related={reports.items.slice(0, 3)}
      downloadHref={downloadHref}
    />
  );
}
