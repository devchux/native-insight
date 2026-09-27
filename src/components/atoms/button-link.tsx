import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
};

const variants = {
  primary: "border-transparent bg-brand !text-white hover:bg-brand-deep",
  ghost: "border-ink/20 !text-ink hover:border-brand hover:text-brand",
  light:
    "border-transparent bg-white !text-brand hover:bg-accent hover:!text-white",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap border px-6 py-3.5 text-[15px] font-bold transition active:translate-y-px ${variants[variant]} ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
