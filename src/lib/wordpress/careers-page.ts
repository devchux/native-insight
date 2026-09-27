import { decodeHtml } from "@/lib/content";
import { getPage } from "@/lib/wordpress/client";

export type CareerBenefit = { title: string; description: string };
export type CareerTrack = {
  number: string;
  title: string;
  description: string;
  terms: string;
  href: string;
};
export type CareerNote = { title: string; description: string };
export type CareerField = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "file" | "select" | "textarea";
  required: boolean;
  options?: string[];
};

export type CareersPageContent = {
  kicker: string;
  title: string;
  introduction: string;
  image: string;
  benefitsKicker: string;
  benefitsTitle: string;
  benefits: CareerBenefit[];
  tracksKicker: string;
  tracksTitle: string;
  tracksIntroduction: string;
  tracks: CareerTrack[];
  applyKicker: string;
  applyTitle: string;
  applyIntroduction: string;
  notes: CareerNote[];
  fields: CareerField[];
  submitLabel: string;
  wordpressPostId: string;
  wordpressFormId: string;
};

const defaultFields: CareerField[] = [
  { id: "fname", label: "First name", type: "text", required: true },
  { id: "lname", label: "Last name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true },
  { id: "phone", label: "Phone", type: "tel", required: false },
  {
    id: "track",
    label: "Applying as",
    type: "select",
    required: true,
    options: ["Intern", "Analyst", "Consultant"],
  },
  { id: "links", label: "Portfolio / LinkedIn", type: "url", required: false },
  { id: "cv", label: "CV / Resume", type: "file", required: true },
  { id: "why", label: "Why Native Insight?", type: "textarea", required: true },
];

const fallback: CareersPageContent = {
  kicker: "Join the team",
  title: "Join our team",
  introduction:
    "We're building the future of African digital economy insights and need sharp minds to help us get there.",
  image:
    "https://nativeinsightng.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-14.50.18-2048x1152.jpeg",
  benefitsKicker: "Why Native Insight",
  benefitsTitle: "More than a job.",
  benefits: [],
  tracksKicker: "Where you fit",
  tracksTitle: "Roles we hire for.",
  tracksIntroduction: "",
  tracks: [],
  applyKicker: "Apply now",
  applyTitle: "One form,\nevery track.",
  applyIntroduction: "",
  notes: [],
  fields: defaultFields,
  submitLabel: "Submit application",
  wordpressPostId: "14259",
  wordpressFormId: "abc11b0",
};

function text(html: string, pattern: RegExp, value: string) {
  const match = html.match(pattern)?.[1];
  return match ? decodeHtml(match.replace(/<br\s*\/?>/gi, "\n")) : value;
}

function fieldLabel(html: string, id: string, fallbackLabel: string) {
  return text(
    html,
    new RegExp(`<label for="form-field-${id}"[^>]*>([\\s\\S]*?)<\\/label>`),
    fallbackLabel,
  );
}

export async function getCareersPageContent(): Promise<CareersPageContent> {
  const page = await getPage("careers");
  const html = page?.content?.rendered;
  if (!html) return fallback;

  const benefits = Array.from(
    html.matchAll(/<div class="perk">[\s\S]*?<h4>([\s\S]*?)<\/h4><p>([\s\S]*?)<\/p><\/div>/g),
    ([, title, description]) => ({
      title: decodeHtml(title),
      description: decodeHtml(description),
    }),
  );

  const tracks = Array.from(
    html.matchAll(
      /<div class="cat"><div class="n">([\s\S]*?)<\/div><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><span class="term">([\s\S]*?)<\/span><a[^>]*href="([^"]+)"/g,
    ),
    ([, number, title, description, terms, href]) => ({
      number: decodeHtml(number),
      title: decodeHtml(title),
      description: decodeHtml(description),
      terms: decodeHtml(terms),
      href,
    }),
  );

  const notes = Array.from(
    html.matchAll(/<div class="ac"><h4>([\s\S]*?)<\/h4><p>([\s\S]*?)<\/p><\/div>/g),
    ([, title, description]) => ({
      title: decodeHtml(title),
      description: decodeHtml(description),
    }),
  );

  const options = Array.from(
    html.matchAll(/<option value="[^"]*">([\s\S]*?)<\/option>/g),
    ([, option]) => decodeHtml(option),
  );
  const fields = defaultFields.map((field) => ({
    ...field,
    label: fieldLabel(html, field.id, field.label),
    options: field.type === "select" && options.length ? options : field.options,
  }));

  return {
    kicker: text(html, /elementor-element-6681381[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/, fallback.kicker),
    title: text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/, fallback.title),
    introduction: text(html, /elementor-element-419a5b0[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/, fallback.introduction),
    image: html.match(/elementor-element-7bb9247[\s\S]*?<img[^>]*src="([^"]+)"/)?.[1] ?? fallback.image,
    benefitsKicker: text(html, /elementor-element-254e162[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/, fallback.benefitsKicker),
    benefitsTitle: text(html, /elementor-element-238b530[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/, fallback.benefitsTitle),
    benefits: benefits.length ? benefits : fallback.benefits,
    tracksKicker: text(html, /elementor-element-255d456[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/, fallback.tracksKicker),
    tracksTitle: text(html, /elementor-element-f305362[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/, fallback.tracksTitle),
    tracksIntroduction: text(html, /elementor-element-1c006bd[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/, fallback.tracksIntroduction),
    tracks: tracks.length ? tracks : fallback.tracks,
    applyKicker: text(html, /elementor-element-5d27ebf[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/, fallback.applyKicker),
    applyTitle: text(html, /elementor-element-6938dee[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/, fallback.applyTitle),
    applyIntroduction: text(html, /elementor-element-99b949e[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/, fallback.applyIntroduction),
    notes: notes.length ? notes : fallback.notes,
    fields,
    submitLabel: text(html, /<span class="elementor-button-text">([\s\S]*?)<\/span>/, fallback.submitLabel),
    wordpressPostId: html.match(/name="post_id" value="([^"]+)"/)?.[1] ?? fallback.wordpressPostId,
    wordpressFormId: html.match(/name="form_id" value="([^"]+)"/)?.[1] ?? fallback.wordpressFormId,
  };
}
