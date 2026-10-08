import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/atoms/container";
import { Kicker } from "@/components/atoms/kicker";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import type {
  CareerField,
  CareersPageContent,
} from "@/lib/wordpress/careers-page";

const fieldClass =
  "mt-2 w-full border border-ink/20 bg-white px-4 py-3.5 text-base text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

function ApplicationField({ field }: { field: CareerField }) {
  const label = (
    <label
      htmlFor={`form-field-${field.id}`}
      className="block text-[11px] font-semibold uppercase tracking-[.16em] text-muted"
    >
      {field.label}{" "}
      {field.required ? <span className="text-brand">*</span> : null}
    </label>
  );
  const shared = {
    id: `form-field-${field.id}`,
    name: `form_fields[${field.id}]`,
    required: field.required,
    className: fieldClass,
  };

  return (
    <div
      className={
        field.id === "fname" ||
        field.id === "lname" ||
        field.id === "email" ||
        field.id === "phone"
          ? "md:col-span-1"
          : "md:col-span-2"
      }
    >
      {label}
      {field.type === "select" ? (
        <select {...shared} defaultValue={field.options?.[0]}>
          {field.options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea {...shared} rows={5} />
      ) : (
        <input
          {...shared}
          type={field.type}
          accept={field.type === "file" ? ".pdf,.doc,.docx" : undefined}
        />
      )}
    </div>
  );
}

export function CareersPage({ content }: { content: CareersPageContent }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-white text-ink">
        <section className="pb-[clamp(52px,6vw,84px)] pt-35 md:pt-50">
          <Container wide>
            <Kicker>{content.kicker}</Kicker>
            <h1 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[.98] tracking-[-.045em] text-brand">
              {content.title}
            </h1>
            <p className="mt-5 max-w-6xl text-base leading-[1.75] text-ink-dim">
              {content.introduction}
            </p>
          </Container>
        </section>

        <Container wide as="section">
          <div className="relative aspect-video min-h-72 overflow-hidden bg-soft">
            <Image
              src={content.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Container>

        <section className="py-[clamp(76px,9vw,124px)]">
          <Container>
            <Kicker>{content.benefitsKicker}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(3rem,5vw,4.25rem)] font-bold leading-none tracking-[-.04em]">
              {content.benefitsTitle}
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {content.benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="border border-ink/10 bg-soft p-7 lg:min-h-47"
                >
                  <span className="grid h-11 w-11 place-items-center bg-surface text-brand">
                    <Target size={20} weight="duotone" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-[-.02em]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-base leading-6 text-muted">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-ink/10 bg-soft py-[clamp(76px,9vw,124px)]">
          <Container>
            <Kicker>{content.tracksKicker}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(3rem,5vw,4.25rem)] font-bold leading-none tracking-[-.04em]">
              {content.tracksTitle}
            </h2>
            <p className="mt-5 max-w-5xl text-[clamp(1rem,1.45vw,1.2rem)] leading-8 text-ink-dim">
              {content.tracksIntroduction}
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {content.tracks.map((track) => (
                <article
                  key={track.number}
                  className="flex min-h-76 flex-col border border-ink/12 bg-transparent p-8"
                >
                  <span className="text-xs font-bold text-brand">
                    {track.number}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-[-.03em]">
                    {track.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-ink-dim">
                    {track.description}
                  </p>
                  <p className="mt-7 text-[11px] font-semibold uppercase tracking-[.13em] text-muted">
                    {track.terms}
                  </p>
                  <a
                    href={track.href}
                    className="mt-6 inline-flex w-fit items-center gap-3 border border-ink/20 px-6 py-4 text-base font-bold transition hover:border-brand hover:text-brand active:translate-y-px"
                  >
                    Apply <ArrowRight size={16} weight="bold" />
                  </a>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="apply" className="py-[clamp(76px,9vw,124px)]">
          <Container wide>
            <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-18">
              <div>
                <Kicker>{content.applyKicker}</Kicker>
                <h2 className="mt-5 whitespace-pre-line font-display text-[clamp(3rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-.04em]">
                  {content.applyTitle}
                </h2>
                <p className="mt-6 max-w-xl text-[clamp(1rem,1.4vw,1.18rem)] leading-8 text-ink-dim">
                  {content.applyIntroduction}
                </p>
                <div className="mt-8 space-y-6">
                  {content.notes.map((note) => (
                    <article
                      key={note.title}
                      className="border-b border-ink/12 pb-6"
                    >
                      <h3 className="font-display text-lg font-bold">
                        {note.title}
                      </h3>
                      <p className="mt-2 text-base leading-6 text-muted">
                        {note.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
              <form
                action="https://cms.nativeinsightng.com/careers/"
                method="post"
                encType="multipart/form-data"
                className="grid content-start gap-x-3 gap-y-4 md:grid-cols-2"
              >
                <input
                  type="hidden"
                  name="post_id"
                  value={content.wordpressPostId}
                />
                <input
                  type="hidden"
                  name="form_id"
                  value={content.wordpressFormId}
                />
                <input
                  type="hidden"
                  name="referer_title"
                  value="Careers - Native Insight"
                />
                <input
                  type="hidden"
                  name="queried_id"
                  value={content.wordpressPostId}
                />
                {content.fields.map((field) => (
                  <ApplicationField key={field.id} field={field} />
                ))}
                <button
                  type="submit"
                  className="mt-1 min-h-14 bg-brand px-7 py-4 text-base font-bold text-white transition hover:bg-brand-deep active:translate-y-px md:col-span-2"
                >
                  {content.submitLabel}
                </button>
              </form>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
