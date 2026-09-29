"use client";

import { useState } from "react";

type Service = {
  readonly title: string;
  readonly copy: string;
  readonly tags: readonly string[];
};

export function ServicesAccordion({ items }: { items: readonly Service[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `service-panel-${index}`;
        return (
          <article className="group border-b border-ink/10" key={item.title}>
            <button
              type="button"
              className={`flex w-full cursor-pointer items-center gap-3.5 border-0 bg-transparent py-5 text-left text-ink transition-[background,padding] duration-250 ease-[cubic-bezier(.22,.61,.36,1)] min-[601px]:gap-5.5 min-[601px]:py-6.5 ${open ? "bg-soft! px-3.5 min-[601px]:px-5.5" : "px-1 hover:bg-soft hover:px-3.5 min-[601px]:px-1.5 min-[601px]:hover:px-5.5"}`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            >
              <span className="shrink-0 font-display text-[13px] tracking-[.06em] text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-[clamp(1.25rem,2vw,1.85rem)] font-semibold leading-[1.1] tracking-[-.01em]">
                {item.title}
              </span>
              <span
                className="relative h-5.5 w-5.5 shrink-0"
                aria-hidden="true"
              >
                <span className="absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-ink" />
                <span
                  className={`absolute top-1/2 left-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-ink transition duration-250 ease-[cubic-bezier(.22,.61,.36,1)] ${open ? "rotate-90 opacity-0" : ""}`}
                />
              </span>
            </button>
            <div
              id={panelId}
              className={`grid overflow-hidden transition-[grid-template-rows] duration-350 ease-[cubic-bezier(.22,.61,.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              aria-hidden={!open}
            >
              <div
                className={`min-h-0 overflow-hidden transition-[padding] duration-250 ease-[cubic-bezier(.22,.61,.36,1)] ${open ? "px-3.5 pt-0.5 pb-5.5 min-[601px]:px-5.5 min-[601px]:pb-7" : "px-1 min-[601px]:px-1.5"}`}
              >
                <p className="mb-3.5 max-w-[66ch] text-sm leading-[1.55] text-ink-dim min-[601px]:text-sm">
                  {item.copy}
                </p>
                {item.tags.length ? (
                  <div className="mt-6.5 flex flex-wrap gap-2.25">
                    {item.tags.map((tag) => (
                      <span
                        className="border border-ink/20 px-2.75 py-1.5 font-display text-[11px] tracking-[.12em] text-ink-dim uppercase"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
