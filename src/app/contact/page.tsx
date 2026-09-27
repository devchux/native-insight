import type { Metadata } from "next";
import { Container } from "@/components/atoms/container";
import { ContactForm } from "@/components/molecules/contact-form";
import { PageShell } from "@/components/organisms/page-shell";
import { pageContent } from "@/lib/site-pages";

export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  return <PageShell {...pageContent.contact}><Container as="section" className="grid gap-12 py-[clamp(70px,9vw,120px)] lg:grid-cols-[.75fr_1.25fr]"><div><h2 className="font-display text-3xl">Start a conversation</h2><p className="mt-5 text-ink-dim">Lagos · Abuja · Nairobi · Accra</p><a className="mt-3 block font-bold text-brand" href="tel:+2349048006929">+234 904 800 6929</a><a className="mt-2 block font-bold text-brand" href="mailto:consult@nativeinsights.com">consult@nativeinsights.com</a></div><ContactForm /></Container></PageShell>;
}
