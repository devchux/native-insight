import { decodeHtml } from "@/lib/content";
import { getPage } from "@/lib/wordpress/client";

export type InsightsPageContent = {
  kicker: string;
  title: string;
  introduction: string;
  reportKicker: string;
  reportTitle: string;
  reportIntroduction: string;
  reportLabel: string;
};

const fallback: InsightsPageContent = {
  kicker: "Our thinking",
  title: "Africa's digital economy",
  introduction:
    "We break down market activities, events, and the numbers to keep you informed on the latest market trends, investment, and opportunities across markets.",
  reportKicker: "Report archive",
  reportTitle: "Go deeper with our full library of reports.",
  reportIntroduction:
    "Flagship outlooks, sector studies and policy briefs, the evidence base behind our work.",
  reportLabel: "Browse reports",
};

function text(html: string, pattern: RegExp, value: string) {
  const match = html.match(pattern)?.[1];
  return match ? decodeHtml(match) : value;
}

export async function getInsightsPageContent(): Promise<InsightsPageContent> {
  const page = await getPage("insights");
  const html = page?.content?.rendered;
  if (!html) return fallback;

  return {
    kicker: text(
      html,
      /elementor-element-221dbf5[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/,
      fallback.kicker,
    ),
    title: text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/, fallback.title),
    introduction: text(
      html,
      /elementor-element-5684fc7[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/,
      fallback.introduction,
    ),
    reportKicker: text(
      html,
      /<div class="kicker amber"[^>]*>([\s\S]*?)<\/div>/,
      fallback.reportKicker,
    ),
    reportTitle: text(
      html,
      /elementor-element-d28bbb3[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/,
      fallback.reportTitle,
    ),
    reportIntroduction: text(
      html,
      /elementor-element-d28bbb3[\s\S]*?<h2[^>]*>[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/,
      fallback.reportIntroduction,
    ),
    reportLabel: text(
      html,
      /elementor-element-d28bbb3[\s\S]*?Browse reports[\s\S]*?<span[^>]*>([\s\S]*?)<span class="arr">/,
      fallback.reportLabel,
    ),
  };
}
