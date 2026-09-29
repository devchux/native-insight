import { decodeHtml } from "@/lib/content";
import { getPage } from "@/lib/wordpress/client";

export type AcademyCourse = {
  level: string;
  title: string;
  description: string;
  features: string[];
};

export type AcademyStat = {
  value: string;
  label: string;
};

export type AcademyPageContent = {
  kicker: string;
  title: string;
  introduction: string;
  purposeKicker: string;
  purposeTitle: string;
  purposeIntroduction: string;
  programmesKicker: string;
  programmesTitle: string;
  courses: AcademyCourse[];
  stats: AcademyStat[];
};

const courseTitles = [
  "Understanding the digital economy and startup ecosystem in Africa",
  "Data Protection and compliance regulations",
  "AI and Policy environment in Africa",
];

const fallbackCourses: AcademyCourse[] = [
  {
    level: "Foundational",
    title: courseTitles[0],
    description:
      "Survey design, data collection and analysis grounded in African market realities.",
    features: ["8-week cohort", "Live, expert-led", "Capstone project"],
  },
  {
    level: "Intermediate",
    title: courseTitles[1],
    description:
      "Turning evidence into strategy, frameworks, storytelling and client-ready outputs.",
    features: ["10-week cohort", "Mentorship pairing", "Case-based"],
  },
  {
    level: "Advanced",
    title: courseTitles[2],
    description:
      "Practical AI: use-case discovery, responsible deployment and measuring impact.",
    features: ["12-week cohort", "Hands-on labs", "Industry projects"],
  },
];

const fallback: AcademyPageContent = {
  kicker: "NI Academy",
  title: "Building Africa's next minds.",
  introduction:
    "NI Academy shares critical skills, teaches ethics, and provides mentorship to young minds inclined towards learning, combining expert-led training with real-world application.",
  purposeKicker: "Why the Academy",
  purposeTitle: "Skills, ethics & mentorship.",
  purposeIntroduction:
    "We equip young professionals and organisations with in-demand research, data and digital skills, strengthening the workforce that will carry Africa's transformation.",
  programmesKicker: "Programmes",
  programmesTitle: "What you can learn.",
  courses: fallbackCourses,
  stats: [
    { value: "1,200+", label: "Young professionals trained across the continent" },
    { value: "30+", label: "Expert practitioners and mentors" },
    { value: "92%", label: "Of graduates report career advancement" },
  ],
};

function text(html: string, pattern: RegExp, value: string) {
  const match = html.match(pattern)?.[1];
  return match ? decodeHtml(match.replace(/<br\s*\/?>/gi, " ")) : value;
}

export async function getAcademyPageContent(): Promise<AcademyPageContent> {
  const page = await getPage("academy");
  const html = page?.content?.rendered;
  if (!html) return fallback;

  const sourceCourses = Array.from(
    html.matchAll(
      /<div class="card prog"><div class="lvl">([\s\S]*?)<\/div><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><ul class="feats">([\s\S]*?)<\/ul>/g,
    ),
    ([, level, , description, features], index) => ({
      level: decodeHtml(level),
      title: courseTitles[index] ?? fallbackCourses[index]?.title ?? "Course",
      description: decodeHtml(description),
      features: Array.from(features.matchAll(/<li>([\s\S]*?)<\/li>/g), ([, feature]) => decodeHtml(feature)),
    }),
  );

  const stats = Array.from(
    html.matchAll(/<div class="o"><b>([\s\S]*?)<\/b><span>([\s\S]*?)<\/span><\/div>/g),
    ([, value, label]) => ({ value: decodeHtml(value), label: decodeHtml(label) }),
  );

  return {
    kicker: text(html, /elementor-element-b9d9bd2[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/, fallback.kicker),
    title: text(html, /elementor-element-4de558b[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>/, fallback.title),
    introduction: text(html, /elementor-element-a6a7b43[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/, fallback.introduction),
    purposeKicker: text(html, /elementor-element-6e2cfc6[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/, fallback.purposeKicker),
    purposeTitle: text(html, /elementor-element-e79f2a3[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/, fallback.purposeTitle),
    purposeIntroduction: text(html, /elementor-element-6b90dc8[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/, fallback.purposeIntroduction),
    programmesKicker: text(html, /elementor-element-f5cbbe0[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/div>/, fallback.programmesKicker),
    programmesTitle: text(html, /elementor-element-70106db[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/, fallback.programmesTitle),
    courses: sourceCourses.length === 3 ? sourceCourses : fallback.courses,
    stats: stats.length ? stats : fallback.stats,
  };
}
