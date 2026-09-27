"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("The WordPress form connection is awaiting its secure server endpoint. You can reach us directly at consult@nativeinsights.com.");
  }

  return <form onSubmit={submit} className="grid gap-5"><label className="grid gap-2 text-sm font-semibold">Name<input name="name" required autoComplete="name" className="min-h-12 border border-ink/20 px-4 outline-none focus:border-brand" /></label><label className="grid gap-2 text-sm font-semibold">Email<input name="email" required type="email" autoComplete="email" className="min-h-12 border border-ink/20 px-4 outline-none focus:border-brand" /></label><label className="grid gap-2 text-sm font-semibold">Subject<select name="subject" className="min-h-12 border border-ink/20 bg-white px-4 outline-none focus:border-brand"><option>Research & Strategy Advisory</option><option>Business Transformation & AI</option><option>Digital Economy & Government</option><option>Startups & SME Support</option><option>Data-driven Insights</option></select></label><label className="grid gap-2 text-sm font-semibold">Message<textarea name="message" required rows={7} className="border border-ink/20 p-4 outline-none focus:border-brand" /></label><button className="w-fit rounded-full bg-brand px-8 py-4 text-sm font-bold text-white">Send enquiry</button><p aria-live="polite" className="text-sm leading-6 text-brand">{message}</p></form>;
}
