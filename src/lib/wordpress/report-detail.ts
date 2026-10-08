import { WORDPRESS_URL } from "@/lib/wordpress/client";
import type { WpMedia, WpPost } from "@/types/wordpress";

const REVALIDATE_SECONDS = Number(process.env.WORDPRESS_REVALIDATE_SECONDS ?? 300);

function fetchOptions(report: WpPost) {
  return {
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: ["wordpress", `wordpress:report:${report.id}`],
    },
  };
}

function downloadHrefFromHtml(html: string) {
  for (const anchor of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = anchor[1].match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (!href) continue;

    const label = anchor[2].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
    if (/download|\.pdf(?:$|[?#])/i.test(`${label} ${href}`)) {
      return href.replace(/&amp;/g, "&");
    }
  }
}

async function attachedPdfHref(report: WpPost) {
  const url = new URL("/wp-json/wp/v2/media", WORDPRESS_URL);
  url.searchParams.set("parent", String(report.id));
  url.searchParams.set("per_page", "100");

  const response = await fetch(url, fetchOptions(report));
  if (!response.ok) return undefined;

  const attachments = (await response.json()) as WpMedia[];
  return attachments.find(
    (attachment) =>
      attachment.mime_type === "application/pdf" ||
      /\.pdf(?:$|[?#])/i.test(attachment.source_url),
  )?.source_url;
}

export async function getReportDownloadHref(report: WpPost) {
  try {
    const pdfHref = await attachedPdfHref(report);
    if (pdfHref) return pdfHref;

    const response = await fetch(
      report.link || `${WORDPRESS_URL}/reports/${report.slug}/`,
      fetchOptions(report),
    );
    if (!response.ok) return undefined;
    return downloadHrefFromHtml(await response.text());
  } catch (error) {
    console.warn(
      `Unable to resolve the download for report ${report.id}:`,
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}
