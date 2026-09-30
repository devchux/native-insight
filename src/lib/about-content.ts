import { decodeHtml } from "@/lib/content";
import type { WpPage } from "@/types/wordpress";

export type AboutItem = { title: string; copy: string };
export type AboutMilestone = AboutItem & { year: string };

export type AboutContent = {
  eyebrow: string;
  title: string;
  statement: string;
  introduction: string[];
  gallery: string[];
  commitments: AboutItem[];
  mission: AboutItem;
  vision: AboutItem;
  values: AboutItem[];
  differentiators: AboutItem[];
  milestones: AboutMilestone[];
};

const gallery = [
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-10-at-11.03.33-2.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-14.27.31.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-14.50.15-1.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-14.50.15.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-14.50.16.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-14.50.17.jpeg",
  "https://cms.nativeinsightng.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-14.50.18.jpeg",
];

export const fallbackAboutContent: AboutContent = {
  eyebrow: "Who we are",
  title: "Digital development consulting for Africa’s future",
  statement: "We help African businesses grow, transform, and secure the continent’s digital future.",
  introduction: [
    "Native Insight (NI) is a digital development consulting firm that leverages data analytics, machine learning, AI and evidence to explain and solve business, social, and development issues. NI exploits the agility and innovativeness of highly skilled young professionals in academia, consulting, and business (across the continent) to provide deep, practical insights to clients’ challenges.",
    "Our clients include businesses, investors, institutions, governments, and other research and consulting companies. We are open to partnerships and collaboration with CSOs and NGOs, and other private sector institutions. We are apolitical.",
  ],
  gallery,
  commitments: [
    { title: "Grow", copy: "Reposition businesses for growth with research that turns market complexity into competitive advantage." },
    { title: "Transform", copy: "Modernise operating models and apply AI to turn Africa’s digital potential into measurable performance." },
    { title: "Secure", copy: "Help governments and partners shape policy and evaluate impact, safeguarding the continent’s digital future." },
  ],
  mission: {
    title: "Supporting Africa’s digital transformation",
    copy: "Our mission is to support Africa on its evolutionary journey on digital transformation. This is the work that matters to us. We aim to become one of the trusted advisors enabling businesses, especially startups and SMEs, on their transformation journey.",
  },
  vision: {
    title: "Becoming trusted, transformative business enablers.",
    copy: "We envision a digital Africa enabled by startups and SMEs scaled to take advantage of the many opportunities on the continent. We want to be partners to such businesses and institutions.",
  },
  values: [
    { title: "Objectivity", copy: "We take an objective view in our work and in dealing with our clients and partners. This enables us to see through a plain lens, incorporate transparency and maintain honesty and humility." },
    { title: "Rigour", copy: "We follow through on our commitments to our clients and partners to maintain excellence in service delivery. No deviation, no short-cuts. Our commitment is to the success of our clients." },
    { title: "Integrity", copy: "We uphold the highest professional standards as we are completely open and honest with our operations and our relationships. Integrity is the currency we never want to be short on." },
    { title: "Community", copy: "Community is at the centre of our work in approach and impact. We carry all stakeholders along and ensure our solutions benefit not just the client, but the community in which they operate." },
  ],
  differentiators: [
    { title: "Young & diverse talent", copy: "We are a team of young and experienced professionals in diverse fields ranging from finance, economics, data analytics, innovation management, strategy advisory, energy management, environment, sciences, and academia." },
    { title: "Methodological", copy: "On each project, we apply robust quantitative and qualitative methods and deploy the diverse expertise of our highly trained and experienced partners and consultants to ensure that our insights are founded on sound reasoning and robust methodologies." },
    { title: "Africa by Africans", copy: "Working with us, you would be asking young African professionals to give you insights into the future of Africa. Who best to tell you? We are on ground and we understand the seemingly chaotic markets." },
    { title: "International experience", copy: "We leverage the multicultural experiences of our partners and consultants, gathered through years of professional experiences in multilateral institutions across continents to deliver nuanced and balanced perspectives." },
    { title: "Volunteer force", copy: "We rely on a network of members who volunteer to share knowledge and bring their expertise to support our projects and programs, working with multinational institutions across the world." },
    { title: "Ethical", copy: "In client engagement and relationships, we remain guided by all reasonable business ethics. We are committed to each project and client expectation; we keep our word and give guarantees where needed." },
  ],
  milestones: [
    { year: "2020", title: "Founded in Lagos", copy: "We envision a digital Africa enabled by startups and SMEs scaled to take advantage of the many opportunities on the continent. We want to be partners to such businesses and institutions." },
    { year: "2022", title: "Pan-African network", copy: "From Lagos, we began to build inroads into other market like Ghana, Kenya, Ethiopia, Tanzania and Morocco through our network consultants" },
    { year: "2023", title: "Academy & convenings", copy: "We began to pivot to a digital economy consultancy to anchor Africa’s digital transformation." },
    { year: "2026", title: "Transformation & AI", copy: "Rebranding became necessary as a tech service provider." },
  ],
};

function textContent(value: string) {
  return decodeHtml(value.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
}

function findLiveText(html: string, fallback: string) {
  const normalized = textContent(html);
  const needle = textContent(fallback);
  return normalized.includes(needle) ? needle : fallback;
}

export function aboutContentFromWordPress(page: WpPage | null): AboutContent {
  const html = page?.content?.rendered;
  if (!html) return fallbackAboutContent;

  const imageMatches = Array.from(html.matchAll(/https?:[^"'\s)]+\.(?:jpe?g|png|webp)/gi), (match) => decodeHtml(match[0]));
  const wpGallery = [...new Set(imageMatches)].filter((url) => url.includes("/wp-content/uploads/") && url.includes("WhatsApp-Image"));
  const resolveItem = (item: AboutItem): AboutItem => ({
    title: findLiveText(html, item.title),
    copy: findLiveText(html, item.copy),
  });

  return {
    eyebrow: findLiveText(html, fallbackAboutContent.eyebrow),
    title: findLiveText(html, fallbackAboutContent.title),
    statement: findLiveText(html, fallbackAboutContent.statement),
    introduction: fallbackAboutContent.introduction.map((copy) => findLiveText(html, copy)),
    gallery: wpGallery.length >= 5 ? wpGallery.slice(0, 7) : fallbackAboutContent.gallery,
    commitments: fallbackAboutContent.commitments.map(resolveItem),
    mission: resolveItem(fallbackAboutContent.mission),
    vision: resolveItem(fallbackAboutContent.vision),
    values: fallbackAboutContent.values.map(resolveItem),
    differentiators: fallbackAboutContent.differentiators.map(resolveItem),
    milestones: fallbackAboutContent.milestones.map((item) => ({ ...resolveItem(item), year: findLiveText(html, item.year) })),
  };
}
