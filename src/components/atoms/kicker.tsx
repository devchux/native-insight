import type { ReactNode } from "react";

export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`kicker ${light ? "text-[#c9b8ff]" : "text-brand"}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
