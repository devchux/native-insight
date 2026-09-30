import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { decodeHtml, featuredImage } from "@/lib/content";
import type { InsightsPageContent } from "@/lib/wordpress/insights-page";
import type { WpCollection, WpPost, WpTerm } from "@/types/wordpress";

type InsightsPageProps = {
  content: InsightsPageContent;
  posts: WpCollection<WpPost>;
  categories: WpTerm[];
  activeCategory?: string;
};

const preferredCategories = ["all-post", "announcements", "publications"];

function CategoryLabel({ post }: { post: WpPost }) {
  const terms = (post._embedded?.["wp:term"]?.[0] ?? []).filter(
    (term) => term.slug !== "uncategorized",
  );
  if (!terms.length) return null;

  return (
    <p className="inline-flex border border-brand/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.13em] text-brand">
      {terms.map((term) => term.name).join(", ")}
    </p>
  );
}

function FeaturedStory({ post }: { post: WpPost }) {
  const image = featuredImage(post);
  return (
    <article className="grid overflow-hidden bg-soft lg:grid-cols-[1.1fr_.9fr]">
      <Link href={`/${post.slug}`} className="group relative min-h-72 lg:min-h-135">
        {image ? (
          <Image
            src={image.source_url}
            alt={image.alt_text || decodeHtml(post.title.rendered)}
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.025]"
          />
        ) : null}
      </Link>
      <div className="flex flex-col justify-center p-[clamp(28px,5vw,70px)]">
        <CategoryLabel post={post} />
        <h2 className="mt-5 font-display text-[clamp(2rem,3.2vw,3.35rem)] font-bold leading-[1.04] tracking-[-.04em] text-brand">
          <Link href={`/${post.slug}`} className="transition hover:text-accent">
            {decodeHtml(post.title.rendered)}
          </Link>
        </h2>
        {post.excerpt?.rendered ? (
          <p className="mt-5 line-clamp-7 text-[15px] leading-7 text-ink-dim">
            {decodeHtml(post.excerpt.rendered)}
          </p>
        ) : null}
        <Link
          href={`/${post.slug}`}
          className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-brand transition hover:gap-3"
        >
          Read insight <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </article>
  );
}

function InsightCard({ post }: { post: WpPost }) {
  const image = featuredImage(post);
  return (
    <article className="flex min-w-0 flex-col bg-surface">
      <Link href={`/${post.slug}`} className="group relative aspect-[1.45] overflow-hidden bg-soft">
        {image ? (
          <Image
            src={image.source_url}
            alt={image.alt_text || decodeHtml(post.title.rendered)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <CategoryLabel post={post} />
        <h3 className="mt-4 font-display text-[clamp(1.25rem,1.7vw,1.55rem)] font-bold leading-[1.17] tracking-tight text-brand">
          <Link href={`/${post.slug}`} className="transition hover:text-accent">
            {decodeHtml(post.title.rendered)}
          </Link>
        </h3>
        <Link
          href={`/${post.slug}`}
          className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-brand transition hover:gap-3"
        >
          Read article <ArrowRight size={15} weight="bold" />
        </Link>
      </div>
    </article>
  );
}

export function InsightsPage({ content, posts, categories, activeCategory }: InsightsPageProps) {
  const filters = preferredCategories
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category): category is WpTerm => Boolean(category));

  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pb-[clamp(54px,7vw,94px)] pt-35 md:pt-50">
          <Container wide>
            <Kicker>{content.kicker}</Kicker>
            <h1 className="mt-5 max-w-xl font-display text-[clamp(3.2rem,5vw,4.35rem)] font-bold leading-[.98] tracking-[-.045em] text-brand">
              {content.title}
            </h1>
            <p className="mt-5 max-w-xl text-[clamp(1.05rem,1.55vw,1.3rem)] leading-[1.75] text-ink-dim">
              {content.introduction}
            </p>
          </Container>
        </section>

        <Container wide as="section">
          {posts.items[0] ? (
            <FeaturedStory post={posts.items[0]} />
          ) : (
            <p className="border border-ink/10 bg-soft p-8 text-ink-dim">Insights are being updated.</p>
          )}
        </Container>

        <section className="py-[clamp(62px,8vw,110px)]">
          <Container wide>
            <nav aria-label="Filter insights" className="flex flex-wrap gap-2.5">
              <Link
                href="/insights"
                className={`border px-5 py-3 text-sm font-semibold transition ${!activeCategory ? "border-brand bg-brand text-white!" : "border-ink/18 hover:border-brand hover:text-brand"}`}
              >
                All
              </Link>
              {filters.map((category) => {
                const active = activeCategory === category.slug;
                return (
                  <Link
                    key={category.id}
                    href={`/insights?category=${category.slug}`}
                    className={`border px-5 py-3 text-sm font-semibold transition ${active ? "border-brand bg-brand text-white!" : "border-ink/18 hover:border-brand hover:text-brand"}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </nav>

            {posts.items.length ? (
              <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.items.map((post) => <InsightCard key={post.id} post={post} />)}
              </div>
            ) : (
              <p className="mt-9 border border-ink/10 bg-soft p-8 text-ink-dim">No insights were found in this category.</p>
            )}
          </Container>
        </section>

        <section className="bg-deep py-[clamp(74px,9vw,126px)] text-white!">
          <Container wide>
            <div className="grid items-end gap-9 lg:grid-cols-[1fr_auto]">
              <div>
                <Kicker light>{content.reportKicker}</Kicker>
                <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-.04em]">
                  {content.reportTitle}
                </h2>
                <p className="mt-5 max-w-3xl text-[clamp(1rem,1.4vw,1.2rem)] leading-8 text-purple-100/80">
                  {content.reportIntroduction}
                </p>
              </div>
              <Link
                href="/reports"
                className="inline-flex min-h-12 w-fit items-center gap-3 bg-white px-6 py-3.5 text-sm font-bold text-brand! transition hover:bg-surface"
              >
                {content.reportLabel} <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
