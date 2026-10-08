import { decodeHtml } from "@/lib/content";
import { getPage } from "@/lib/wordpress/client";

export type ReportsPageContent = {
  kicker: string;
  title: string;
  introduction: string;
  flagshipLabel: string;
  readLabel: string;
  downloadLabel: string;
  downloadHref?: string;
};

const fallback: ReportsPageContent = {
  kicker: "Report archive",
  title: "Our Reports",
  introduction:
    "Our reports synthesizes the morass of market information to demystify sectors for investors and stakeholders.",
  flagshipLabel: "Latest report",
  readLabel: "Read the report",
  downloadLabel: "Download PDF",
};

function text(html: string, pattern: RegExp, value: string) {
  const match = html.match(pattern)?.[1];
  return match ? decodeHtml(match) : value;
}

export async function getReportsPageContent(): Promise<ReportsPageContent> {
  const page = await getPage("reports");
  const html = page?.content?.rendered;
  if (!html) return fallback;

  return {
    kicker: text(
      html,
      /elementor-element-1c9f760[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/,
      fallback.kicker,
    ),
    title: text(
      html,
      /elementor-element-163c4f6[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>/,
      fallback.title,
    ),
    introduction: text(
      html,
      /elementor-element-7814866[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/,
      fallback.introduction,
    ),
    flagshipLabel: fallback.flagshipLabel,
    readLabel: text(
      html,
      /elementor-element-99e2c2e[\s\S]*?elementor-button-text[^>]*>([\s\S]*?)<\/span>/,
      fallback.readLabel,
    ),
    downloadLabel: text(
      html,
      /elementor-element-d06d7f8[\s\S]*?elementor-button-text[^>]*>([\s\S]*?)<\/span>/,
      fallback.downloadLabel,
    ),
    downloadHref:
      html.match(
        /elementor-element-d06d7f8[\s\S]*?<a[^>]+href="([^"]+)"/,
      )?.[1] ?? fallback.downloadHref,
  };
}
