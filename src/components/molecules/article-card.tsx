import Image from "next/image";
import Link from "next/link";
import { decodeHtml, featuredImage, postTerms } from "@/lib/content";
import type { WpPost } from "@/types/wordpress";

export function ArticleCard({ post, featured = false }: { post: WpPost; featured?: boolean }) {
  const image = featuredImage(post);
  const terms = postTerms(post).slice(0, 2);

  return (
    <article className={`group grid overflow-hidden bg-surface ${featured ? "lg:grid-cols-[1.15fr_.85fr]" : "grid-rows-[auto_1fr]"}`}>
      <Link href={`/${post.slug}`} className={`relative block overflow-hidden bg-soft ${featured ? "min-h-[340px] lg:min-h-[540px]" : "aspect-[4/3]"}`}>
        {image ? (
          <Image
            src={image.source_url}
            alt={image.alt_text || decodeHtml(post.title.rendered)}
            fill
            sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.025]"
          />
        ) : null}
      </Link>
      <div className={`flex flex-col ${featured ? "justify-center p-8 md:p-12" : "p-6"}`}>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-brand">
          {terms.map((term) => term.name).join(" / ") || "Insights"}
        </p>
        <h2 className={`${featured ? "text-[clamp(2rem,4vw,4rem)]" : "text-2xl"} font-display leading-[1.08] tracking-[-.025em]`}>
          <Link href={`/${post.slug}`}>{decodeHtml(post.title.rendered)}</Link>
        </h2>
        {post.excerpt?.rendered ? <p className="mt-5 line-clamp-3 text-[15px] leading-7 text-ink-dim">{decodeHtml(post.excerpt.rendered)}</p> : null}
        <Link href={`/${post.slug}`} className="mt-7 inline-flex font-bold text-brand">Read article →</Link>
      </div>
    </article>
  );
}
