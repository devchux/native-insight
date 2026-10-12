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
  const [mobileSection, setMobileSection] = useState<string | null>(
    "/insights",
  );
  const [scrolled, setScrolled] = useState(() => !overlay);

  useEffect(() => {
    if (!overlay) return;

    const updateScrolled = () => setScrolled(window.scrollY > 0);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, [overlay]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

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
                <div className="invisible absolute left-0 top-full z-10 min-w-50 translate-y-2 pt-2 text-ink opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="border border-ink/10 bg-white p-2 shadow-[0_20px_44px_rgba(25,19,46,.16)]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3.5 py-2.5 text-base font-semibold text-ink-dim transition hover:bg-soft hover:text-brand"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
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
          className="hidden items-center gap-2 bg-brand px-5 py-3 text-base font-bold text-white! transition hover:bg-brand-deep lg:inline-flex"
        >
          Tell us your challenge <ArrowRight size={16} weight="bold" />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="ml-auto grid h-12 w-12 place-items-center border border-current/25 transition-[background-color,transform] duration-150 active:scale-96 lg:hidden"
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
          className="absolute inset-x-0 top-full h-[calc(100dvh-75px)] overflow-y-auto overscroll-contain border-t border-ink/10 bg-white px-[30px] pb-[max(32px,env(safe-area-inset-bottom))] pt-8 text-ink lg:hidden"
        >
          {links.map((link) => {
            const expanded = mobileSection === link.href;
            const active =
              pathname === link.href ||
              link.children?.some((child) => child.href === pathname);

            return (
              <div key={link.href} className="border-b border-ink/10">
                <div className="flex min-h-17 items-center">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 flex-1 items-center text-[1.35rem] font-semibold leading-tight tracking-[-.02em] ${active ? "text-brand" : "text-ink"}`}
                  >
                    {link.label}
                  </Link>
                  {link.children ? (
                    <button
                      type="button"
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${link.label}`}
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileSection(expanded ? null : link.href)
                      }
                      className="grid h-12 w-12 shrink-0 place-items-center transition-transform duration-150 active:scale-96"
                    >
                      <CaretDown
                        aria-hidden="true"
                        size={26}
                        weight="bold"
                        className={`transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : null}
                </div>
                {expanded ? (
                  <div className="pb-2">
                    {link.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-15 items-center ps-6 text-lg text-ink-dim"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className="border-b border-ink/10">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`flex min-h-17 items-center text-[1.35rem] font-semibold leading-tight tracking-[-.02em] ${pathname === "/contact" ? "text-brand" : "text-ink"}`}
            >
              Contact
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
