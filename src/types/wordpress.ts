export type WpRendered = { rendered: string };

export type WpMedia = {
  id: number;
  alt_text: string;
  source_url: string;
  mime_type?: string;
  media_details?: { width?: number; height?: number };
};

export type WpTerm = {
  id: number;
  name: string;
  slug: string;
};

export type WpAuthor = {
  id: number;
  name: string;
  description?: string;
  avatar_urls?: Record<string, string>;
};

export type WpPost = {
  id: number;
  type?: string;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: WpRendered;
  content?: WpRendered;
  excerpt?: WpRendered;
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_image?: Array<{ url: string; width?: number; height?: number }>;
  };
  _embedded?: {
    author?: WpAuthor[];
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: WpTerm[][];
  };
};

export type WpPage = WpPost & {
  template?: string;
};

export type WpCollection<T> = {
  items: T[];
  total: number;
  totalPages: number;
};
