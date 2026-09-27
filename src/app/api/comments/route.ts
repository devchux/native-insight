import { NextResponse } from "next/server";
import { WORDPRESS_URL } from "@/lib/wordpress/client";

export async function POST(request: Request) {
  const body = await request.json();
  const payload = {
    post: Number(body.post),
    author_name: String(body.name ?? "").trim(),
    author_email: String(body.email ?? "").trim(),
    content: String(body.content ?? "").trim(),
  };

  if (!payload.post || !payload.author_name || !payload.author_email || !payload.content) {
    return NextResponse.json({ message: "Please complete every field." }, { status: 400 });
  }

  const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ message: data.message ?? "WordPress could not accept the comment." }, { status: response.status });
  }
  return NextResponse.json({ message: "Your comment has been submitted for review." }, { status: 201 });
}
