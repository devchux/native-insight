import { decodeHtml } from "@/lib/content";
import { getPage } from "@/lib/wordpress/client";

export type MediaFeature = {
  href: string;
  image: string;
  outlet: string;
  title: string;
};

export type MediaGalleryImage = {
  image: string;
  wide: boolean;
  tall: boolean;
};

export type MediaResource = {
  title: string;
  description: string;
  label: string;
  href?: string;
};

export type MediaPageContent = {
  kicker: string;
  title: string;
  introduction: string;
  coverageKicker: string;
  galleryKicker: string;
  galleryTitle: string;
  features: MediaFeature[];
  gallery: MediaGalleryImage[];
  resources: MediaResource[];
};

const fallback: MediaPageContent = {
  kicker: "Newsroom",
  title: "In the spotlight",
  introduction:
    "We break down market activities, events, and the numbers to keep you informed on the latest market trends, investment, and opportunities across markets.",
  coverageKicker: "Press & coverage",
  galleryKicker: "From the field",
  galleryTitle: "Gallery.",
  features: [],
  gallery: [],
  resources: [
    {
      title: "Media kit",
      description: "Logos, brand guidelines and approved imagery.",
      label: "Download",
    },
    {
      title: "Fact sheet",
      description: "Who we are, what we do, and the numbers behind it.",
      label: "Download",
    },
    {
      title: "Press enquiries",
      description: "Speak to our communications team.",
      label: "Contact",
      href: "/contact",
    },
  ],
};

function matchText(html: string, pattern: RegExp, value: string) {
  const match = html.match(pattern)?.[1];
  return match ? decodeHtml(match) : value;
}

export async function getMediaPageContent(): Promise<MediaPageContent> {
  const page = await getPage("media");
  const html = page?.content?.rendered;

  if (!html) return fallback;

  const features = Array.from(
    html.matchAll(
      /<a class="nmg-tile" href="([^"]+)"[^>]*style="background-image:url\(([^)]+)\)"[\s\S]*?<span class="nmg-outlet">([\s\S]*?)<\/span>[\s\S]*?<span class="nmg-title">([\s\S]*?)<\/span><\/a>/g,
    ),
    ([, href, image, outlet, title]) => ({
      href,
      image,
      outlet: decodeHtml(outlet),
      title: decodeHtml(title),
    }),
  );

  const gallery = Array.from(
    html.matchAll(/<div class="ph([^"]*)" style="background:url\(([^)]+)\)/g),
    ([, classes, image]) => ({
      image,
      wide: classes.split(/\s+/).includes("wide"),
      tall: classes.split(/\s+/).includes("tall2"),
    }),
  );

  const resources = Array.from(
    html.matchAll(
      /<div class="k"><h4>([\s\S]*?)<\/h4><p>([\s\S]*?)<\/p><a class="link-arrow"(?: href="([^"]+)")?>([\s\S]*?)<span class="arr">/g,
    ),
    ([, title, description, href, label]) => ({
      title: decodeHtml(title),
      description: decodeHtml(description),
      label: decodeHtml(label),
      href,
    }),
  );

  return {
    kicker: matchText(
      html,
      /elementor-element-fdaf4a5[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/,
      fallback.kicker,
    ),
    title: matchText(html, /<h1[^>]*>([\s\S]*?)<\/h1>/, fallback.title),
    introduction: matchText(
      html,
      /elementor-element-5b25a69[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/,
      fallback.introduction,
    ),
    coverageKicker: matchText(
      html,
      /elementor-element-383a0b7[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/,
      fallback.coverageKicker,
    ),
    galleryKicker: matchText(
      html,
      /elementor-element-bbfea10[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/,
      fallback.galleryKicker,
    ),
    galleryTitle: matchText(
      html,
      /elementor-element-2647425[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/,
      fallback.galleryTitle,
    ),
    features: features.length ? features : fallback.features,
    gallery: gallery.length ? gallery : fallback.gallery,
    resources: resources.length ? resources : fallback.resources,
  };
}
