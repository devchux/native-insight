import type { Metadata } from "next";
import { CopySection, PageShell } from "@/components/organisms/page-shell";
import { pageContent } from "@/lib/site-pages";

export const metadata: Metadata = { title: "Careers" };
export default function CareersPage() {
  return <PageShell {...pageContent.careers} image="https://nativeinsightng.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-14.50.18-1024x576.jpeg"><CopySection title="Build your career with context."><p>We value curiosity, rigour, generosity and the ability to turn complex questions into useful answers.</p><p>Current opportunities are published through our WordPress content workflow and will appear here as they become available.</p></CopySection></PageShell>;
}
