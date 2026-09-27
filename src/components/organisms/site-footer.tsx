import Link from "next/link";
import {
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/atoms/button-link";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { Brand } from "@/components/molecules/brand";

const columns = [
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Our Team", "/our-team"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "What We Do",
    links: [
      ["Research & Strategy", "/what-we-do"],
      ["Business Transformation & AI", "/what-we-do"],
      ["Data-driven Insights", "/what-we-do"],
      ["Startups & SME Support", "/what-we-do"],
    ],
  },
  {
    title: "Engage",
    links: [
      ["Insights", "/insights"],
      ["Reports", "/reports"],
      ["Events", "/ni-events"],
      ["Academy", "/academy"],
      ["Media", "/media"],
    ],
  },
] as const;

export function SiteFooter({ showCta = true, ctaTitle = "Tell us your challenge." }: { showCta?: boolean; ctaTitle?: string }) {
  return (
    <footer className="relative overflow-hidden bg-deep text-white before:absolute before:inset-0 before:bg-[radial-gradient(60%_80%_at_88%_0%,rgba(124,58,237,.45),transparent_60%)]">
      <Container className="relative">
        {showCta ? <div className="border-b border-white/15 py-[clamp(56px,7vw,90px)]">
          <Kicker light>Let&apos;s build</Kicker>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.75rem,6vw,5.25rem)] leading-none tracking-[-.035em]">
            {ctaTitle}
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="light">
              Start a conversation
            </ButtonLink>
            <ButtonLink
              href="/what-we-do"
              variant="ghost"
              className="border-white/30 text-white! hover:border-white hover:text-white"
            >
              Explore our services
            </ButtonLink>
          </div>
        </div> : null}
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Brand light />
            <p className="mt-5 text-sm leading-6 text-purple-100/75">
              Local solution. Pan-African perspective. Global participation.
            </p>
            <p className="mt-3 text-sm leading-6 text-purple-100/75">
              We help African businesses grow, transform, and secure the
              continent&apos;s digital future.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-sm uppercase tracking-[.18em] text-purple-100/70">
                {column.title}
              </h3>
              <ul className="space-y-2.5 text-sm text-purple-100/75">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/15 py-6 text-xs text-purple-100/70">
          <p>
            Native Insight © {new Date().getFullYear()} · Lagos · Abuja ·
            Nairobi · Accra
          </p>
          <div className="flex gap-2">
            <a
              href="#"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center border border-white/25 transition hover:border-white hover:text-white"
            >
              <LinkedinLogo size={17} weight="fill" />
            </a>
            <a
              href="#"
              aria-label="X"
              className="grid h-9 w-9 place-items-center border border-white/25 transition hover:border-white hover:text-white"
            >
              <XLogo size={16} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center border border-white/25 transition hover:border-white hover:text-white"
            >
              <InstagramLogo size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
