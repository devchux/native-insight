import type { ContactPageContent } from "@/lib/wordpress/contact-page";

const controlClass =
  "mt-2 w-full border border-ink/20 bg-white px-4 py-3.5 text-base text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

export function ContactForm({ content }: { content: ContactPageContent }) {
  return (
    <form
      action="https://cms.nativeinsightng.com/contact/"
      method="post"
      className="grid gap-3.5"
    >
      <input type="hidden" name="post_id" value={content.wordpressPostId} />
      <input type="hidden" name="form_id" value={content.wordpressFormId} />
      <input type="hidden" name="referer_title" value="Contact - Native Insight" />
      <input type="hidden" name="queried_id" value={content.wordpressPostId} />
      {content.fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={`form-field-${field.id}`}
            className="block text-[11px] font-semibold uppercase tracking-[.16em] text-muted"
          >
            {field.label} {field.required ? <span className="text-brand">*</span> : null}
          </label>
          {field.type === "select" ? (
            <select
              id={`form-field-${field.id}`}
              name={`form_fields[${field.id}]`}
              required={field.required}
              defaultValue={field.options?.[0]}
              className={controlClass}
            >
              {field.options?.map((option) => <option key={option}>{option}</option>)}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              id={`form-field-${field.id}`}
              name={`form_fields[${field.id}]`}
              required={field.required}
              rows={5}
              className={controlClass}
            />
          ) : (
            <input
              id={`form-field-${field.id}`}
              name={`form_fields[${field.id}]`}
              required={field.required}
              type={field.type}
              autoComplete={field.id === "name" ? "name" : field.id === "email" ? "email" : undefined}
              className={controlClass}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="mt-1 min-h-14 w-full bg-brand px-7 py-4 text-base font-bold text-white transition hover:bg-brand-deep active:translate-y-px"
      >
        {content.submitLabel}
      </button>
    </form>
  );
}
