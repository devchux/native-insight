import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";

export function PageShell({
  title,
  kicker,
  introduction,
  image,
  children,
}: {
  title: string;
  kicker: string;
  introduction?: string;
  image?: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-36 md:pt-44">
          <Container>
            <Kicker>{kicker}</Kicker>
            <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,7vw,6.8rem)] leading-[.95] tracking-[-.045em]">
              {title}
            </h1>
            {introduction ? (
              <p className="mt-8 max-w-3xl text-[clamp(1.05rem,1.7vw,1.35rem)] leading-8 text-ink-dim">
                {introduction}
              </p>
            ) : null}
          </Container>
          {image ? (
            <div className="relative mt-16 min-h-90 overflow-hidden md:min-h-155">
              <Image
                src={image}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </section>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function CopySection({
  title,
  children,
  tone = "light",
}: {
  title: string;
  children: ReactNode;
  tone?: "light" | "soft" | "brand";
}) {
  const colors =
    tone === "brand"
      ? "bg-brand text-white"
      : tone === "soft"
        ? "bg-soft text-ink"
        : "bg-white text-ink";
  return (
    <section className={`${colors} py-[clamp(70px,9vw,120px)]`}>
      <Container>
        <h2 className="max-w-4xl font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.03] tracking-[-.035em]">
          {title}
        </h2>
        <div
          className={`mt-8 max-w-3xl space-y-5 text-[clamp(1rem,1.5vw,1.2rem)] leading-8 ${tone === "brand" ? "text-purple-100" : "text-ink-dim"}`}
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
