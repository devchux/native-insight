import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { ContactForm } from "@/components/molecules/contact-form";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import type { ContactPageContent } from "@/lib/wordpress/contact-page";

export function ContactPage({ content }: { content: ContactPageContent }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pb-[clamp(60px,8vw,106px)] pt-35 md:pt-50">
          <Container wide>
            <Kicker>{content.kicker}</Kicker>
          </Container>
        </section>

        <section className="pb-[clamp(76px,9vw,124px)]">
          <Container wide>
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <h1 className="font-display text-[clamp(3rem,5vw,4.25rem)] font-bold leading-none tracking-[-.04em]">
                  {content.formTitle}
                </h1>
                <div className="mt-7">
                  <ContactForm content={content} />
                </div>
              </div>
              <aside className="lg:pt-22">
                <div className="grid gap-8 border-t border-ink/12 pt-7 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-muted">{content.phoneLabel}</p>
                    <a href={content.phoneHref} className="mt-3 block text-[clamp(1rem,1.4vw,1.15rem)] text-ink-dim transition hover:text-brand">{content.phone}</a>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-muted">{content.emailLabel}</p>
                    <a href={content.emailHref} className="mt-3 block break-words text-[clamp(1rem,1.4vw,1.15rem)] text-ink-dim transition hover:text-brand">{content.email}</a>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
