export function decodeHtml(value: string) {
  return value
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&#8212;|&mdash;/g, "-")
    .replace(/&#8216;|&#8217;|&rsquo;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export function featuredImage(post: { _embedded?: { "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string; media_details?: { width?: number; height?: number } }> } }) {
  return post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

export function postTerms(post: { _embedded?: { "wp:term"?: Array<Array<{ name: string; slug: string }>> } }) {
  return post._embedded?.["wp:term"]?.flat() ?? [];
}
