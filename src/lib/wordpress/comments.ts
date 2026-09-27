import { WORDPRESS_URL } from "@/lib/wordpress/client";

export type WpComment = {
  id: number;
  post: number;
  parent: number;
  date: string;
  author_name: string;
  content: { rendered: string };
};

export async function getComments(postId: number) {
  const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/comments?post=${postId}&per_page=100&order=asc`, {
    next: { revalidate: 60, tags: ["wordpress:comments", `wordpress:comments:${postId}`] },
  });
  if (!response.ok) return [];
  return response.json() as Promise<WpComment[]>;
}
