import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/atoms/container";
import { PageShell } from "@/components/organisms/page-shell";
import { getContentByType } from "@/lib/wordpress/client";
import { decodeHtml, featuredImage } from "@/lib/content";
import type { WpPost } from "@/types/wordpress";

export const metadata: Metadata = { title: "Our Team" };
export default async function TeamPage() {
  const team = await getContentByType<WpPost>("team");
  return <PageShell kicker="Our people" title="A team built across Africa." introduction="Researchers, strategists and operators combining sector depth with practical local knowledge."><Container as="section" className="grid gap-x-6 gap-y-12 py-[clamp(70px,9vw,120px)] sm:grid-cols-2 lg:grid-cols-3">{team.items.map((person) => { const image = featuredImage(person); return <article key={person.id}>{image ? <div className="relative aspect-[4/5] overflow-hidden bg-soft"><Image src={image.source_url} alt={image.alt_text || decodeHtml(person.title.rendered)} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div> : <div className="aspect-[4/5] bg-soft" />}<h2 className="mt-5 font-display text-2xl">{decodeHtml(person.title.rendered)}</h2></article>; })}</Container></PageShell>;
}
