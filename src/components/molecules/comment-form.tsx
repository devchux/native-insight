"use client";

import { useState, type FormEvent } from "react";

export function CommentForm({ postId }: { postId: number }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post: postId, name: formData.get("name"), email: formData.get("email"), content: formData.get("content") }),
    });
    const result = await response.json();
    setMessage(result.message);
    setStatus(response.ok ? "success" : "error");
    if (response.ok) form.reset();
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-5" aria-describedby="comment-status">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Name<input required name="name" autoComplete="name" className="min-h-12 border border-ink/20 bg-white px-4 outline-none focus:border-brand" /></label>
        <label className="grid gap-2 text-sm font-semibold">Email<input required type="email" name="email" autoComplete="email" className="min-h-12 border border-ink/20 bg-white px-4 outline-none focus:border-brand" /></label>
      </div>
      <label className="grid gap-2 text-sm font-semibold">Comment<textarea required name="content" rows={6} className="border border-ink/20 bg-white p-4 outline-none focus:border-brand" /></label>
      <p className="text-sm text-muted">Your email address will not be published. Comments may be held for moderation.</p>
      <button disabled={status === "sending"} className="w-fit rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-deep disabled:opacity-60">{status === "sending" ? "Submitting..." : "Post comment"}</button>
      <p id="comment-status" aria-live="polite" className={`text-sm ${status === "error" ? "text-red-700" : "text-brand"}`}>{message}</p>
    </form>
  );
}
