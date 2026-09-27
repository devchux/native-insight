"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { Brand } from "@/components/molecules/brand";

const links = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Team", href: "/our-team" },
    ],
  },
  { label: "What We Do", href: "/what-we-do" },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "Reports", href: "/reports" },
      { label: "Articles", href: "/insights" },
    ],
  },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => !overlay);

  useEffect(() => {
    if (!overlay) return;

    const updateScrolled = () => setScrolled(window.scrollY > 0);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, [overlay]);

  const transparent = overlay && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition ${transparent ? "border-transparent bg-transparent text-white" : "border-ink/10 bg-white/90 text-ink backdrop-blur-xl"}`}
    >
      <div className="mx-auto flex max-w-370 items-center gap-6 px-[clamp(20px,5vw,64px)] py-4.5 transition">
        <Brand />
        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center lg:flex"
        >
          {links.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14.5px] font-semibold transition hover:bg-brand/5 ${pathname === link.href ? "text-accent" : ""}`}
                >
                  {link.label}
                  <CaretDown
                    size={12}
                    weight="bold"
                    className="opacity-60 transition group-hover:rotate-180"
                  />
                </Link>
                <div className="invisible absolute left-0 top-[calc(100%+6px)] min-w-50 translate-y-2 border border-ink/10 bg-white p-2 text-ink opacity-0 shadow-[0_20px_44px_rgba(25,19,46,.16)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3.5 py-2.5 text-sm font-semibold text-ink-dim transition hover:bg-soft hover:text-brand"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-[14.5px] font-semibold transition hover:bg-brand/5 ${pathname === link.href ? "text-accent" : ""}`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <Link
          href="/contact"
          className="hidden items-center gap-2 bg-brand px-5 py-3 text-sm font-bold text-white! transition hover:bg-brand-deep lg:inline-flex"
        >
          Tell us your challenge <ArrowRight size={16} weight="bold" />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="ml-auto grid h-11 w-11 place-items-center border border-current/30 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span
              className={`h-0.5 w-full bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>
      {open ? (
        <nav
          aria-label="Mobile navigation"
          className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-ink/10 bg-white px-5 py-4 text-ink lg:hidden"
        >
          {links.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-ink/10 py-3.5 text-xl font-semibold"
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink/10 py-2.5 pl-5 text-base text-ink-dim"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold text-white"
          >
            Tell us your challenge <ArrowRight size={17} weight="bold" />
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
