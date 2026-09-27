import { WORDPRESS_URL } from "@/lib/wordpress/client";
import type { WpPost } from "@/types/wordpress";

const REVALIDATE_SECONDS = Number(process.env.WORDPRESS_REVALIDATE_SECONDS ?? 300);

export async function getReportDownloadHref(report: WpPost) {
  try {
    const response = await fetch(report.link || `${WORDPRESS_URL}/reports/${report.slug}/`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["wordpress", `wordpress:report:${report.id}`] },
    });
    if (!response.ok) return undefined;
    const html = await response.text();
    const downloadAnchor = Array.from(
      html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g),
    ).find(([, , body]) => body.includes("Download PDF"));
    return downloadAnchor?.[1];
  } catch {
    return undefined;
  }
}
