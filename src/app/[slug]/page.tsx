import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/atoms/container";
import { CommentForm } from "@/components/molecules/comment-form";
import { ArticleDetailPage } from "@/components/organisms/article-detail-page";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { decodeHtml, featuredImage, postTerms } from "@/lib/content";
import {
  getContentByType,
  getContentItem,
  getPosts,
} from "@/lib/wordpress/client";
import { getComments } from "@/lib/wordpress/comments";

export async function generateStaticParams() {
  const posts = await getPosts({ perPage: 100 });
  const media = await getContentByType<import("@/types/wordpress").WpPost>(
    "media-piece",
  );
  return [...posts.items, ...media.items].map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getContentItem(slug);
  if (!post) return {};
  const image = featuredImage(post)?.source_url;
  return {
    title: decodeHtml(post.title.rendered),
    description:
      post.yoast_head_json?.description ??
      decodeHtml(post.excerpt?.rendered ?? ""),
    openGraph: image ? { images: [image] } : undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getContentItem(slug);
  if (!post) notFound();
  if (post.type === "post") {
    const related = await getPosts({ perPage: 3 });
    return <ArticleDetailPage post={post} related={related.items} />;
  }
  if (post.type === "report") redirect(`/reports/${post.slug}`);
  const comments = await getComments(post.id);
  const image = featuredImage(post);
  const author = post._embedded?.author?.[0];
  const categories = postTerms(post).slice(0, 2);
  return (
    <>
      <SiteHeader />
      <main className="pt-36 md:pt-44">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-brand">
            {categories.map((term) => term.name).join(" / ") || "Insights"}
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.6rem,6vw,5.8rem)] leading-[1.01] tracking-[-.045em]">
            {decodeHtml(post.title.rendered)}
          </h1>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-base text-muted">
            <p>{author?.name ?? "Native Insight"}</p>
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en-NG", { dateStyle: "long" }).format(
                new Date(post.date),
              )}
            </time>
          </div>
          {image ? (
            <div className="relative mt-12 aspect-video overflow-hidden bg-soft">
              <Image
                src={image.source_url}
                alt={image.alt_text || decodeHtml(post.title.rendered)}
                fill
                priority
                sizes="(min-width: 1280px) 1152px, 90vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="mx-auto grid max-w-5xl py-[clamp(60px,8vw,100px)] lg:grid-cols-[180px_1fr] lg:gap-12">
            <aside className="mb-8 text-base font-semibold text-brand lg:mb-0">
              Share this insight
            </aside>
            <div>
              <article
                className="article-content min-w-0"
                dangerouslySetInnerHTML={{
                  __html: post.content?.rendered ?? "",
                }}
              />
              <section className="mt-20 border-t border-ink/15 pt-12">
                <h2 className="font-display text-3xl">Comments</h2>
                {comments.length ? (
                  <div className="mt-8 space-y-6">
                    {comments.map((comment) => (
                      <article key={comment.id} className="bg-soft p-6">
                        <p className="font-bold">{comment.author_name}</p>
                        <div
                          className="mt-3 text-base leading-7 text-ink-dim"
                          dangerouslySetInnerHTML={{
                            __html: comment.content.rendered,
                          }}
                        />
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-ink-dim">
                    No comments yet. Join the conversation.
                  </p>
                )}
                <h3 className="mt-12 font-display text-2xl">Leave a comment</h3>
                <CommentForm postId={post.id} />
              </section>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
