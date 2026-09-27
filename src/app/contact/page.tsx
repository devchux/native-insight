import type { Metadata } from "next";
import { ContactPage } from "@/components/organisms/contact-page";
import { getContactPageContent } from "@/lib/wordpress/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Native Insight about your research, strategy or transformation challenge.",
};

export default async function Page() {
  const content = await getContactPageContent();
  return <ContactPage content={content} />;
}
