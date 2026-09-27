import { decodeHtml } from "@/lib/content";
import { getPage } from "@/lib/wordpress/client";

export type ContactField = {
  id: string;
  label: string;
  type: "text" | "email" | "select" | "textarea";
  required: boolean;
  options?: string[];
};

export type ContactPageContent = {
  kicker: string;
  formTitle: string;
  fields: ContactField[];
  submitLabel: string;
  phoneLabel: string;
  phone: string;
  phoneHref: string;
  emailLabel: string;
  email: string;
  emailHref: string;
  wordpressPostId: string;
  wordpressFormId: string;
};

const baseFields: ContactField[] = [
  { id: "name", label: "Your name", type: "text", required: true },
  { id: "email", label: "Your email", type: "email", required: true },
  {
    id: "subject",
    label: "Subject",
    type: "select",
    required: false,
    options: [
      "Research & Strategy Advisory",
      "Business Transformation & AI",
      "Data-driven Insights",
      "Startups & SME Support",
      "Events & partnerships",
      "Careers",
      "Press enquiry",
    ],
  },
  { id: "message", label: "Your message", type: "textarea", required: true },
];

const fallback: ContactPageContent = {
  kicker: "Tell us your challenge",
  formTitle: "Send us a message",
  fields: baseFields,
  submitLabel: "Send message",
  phoneLabel: "Call",
  phone: "+234 904 800 6929",
  phoneHref: "tel:+2349048006929",
  emailLabel: "Email",
  email: "consult@nativeinsights.com",
  emailHref: "mailto:consult@nativeinsights.com",
  wordpressPostId: "14018",
  wordpressFormId: "40e44dc",
};

function text(html: string, pattern: RegExp, value: string) {
  const match = html.match(pattern)?.[1];
  return match ? decodeHtml(match) : value;
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const page = await getPage("contact");
  const html = page?.content?.rendered;
  if (!html) return fallback;

  const options = Array.from(
    html.matchAll(/<option value="[^"]*">([\s\S]*?)<\/option>/g),
    ([, option]) => decodeHtml(option),
  );
  const fields = baseFields.map((field) => ({
    ...field,
    label: text(
      html,
      new RegExp(`<label for="form-field-${field.id}"[^>]*>([\\s\\S]*?)<\\/label>`),
      field.label,
    ),
    options: field.type === "select" && options.length ? options : field.options,
  }));
  const phoneMatch = html.match(/<b>([^<]+)<\/b><a href="(tel:[^"]+)">([^<]+)<\/a>/);
  const emailMatch = html.match(/<b>([^<]+)<\/b><a href="(mailto:[^"]+)">([^<]+)<\/a>/);

  return {
    kicker: text(html, /elementor-element-6a21a0d[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/, fallback.kicker),
    formTitle: text(html, /elementor-element-7492bdd[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/, fallback.formTitle),
    fields,
    submitLabel: text(html, /<span class="elementor-button-text">([\s\S]*?)<\/span>/, fallback.submitLabel),
    phoneLabel: phoneMatch ? decodeHtml(phoneMatch[1]) : fallback.phoneLabel,
    phoneHref: phoneMatch?.[2] ?? fallback.phoneHref,
    phone: phoneMatch ? decodeHtml(phoneMatch[3]) : fallback.phone,
    emailLabel: emailMatch ? decodeHtml(emailMatch[1]) : fallback.emailLabel,
    emailHref: emailMatch?.[2] ?? fallback.emailHref,
    email: emailMatch ? decodeHtml(emailMatch[3]) : fallback.email,
    wordpressPostId: html.match(/name="post_id" value="([^"]+)"/)?.[1] ?? fallback.wordpressPostId,
    wordpressFormId: html.match(/name="form_id" value="([^"]+)"/)?.[1] ?? fallback.wordpressFormId,
  };
}
