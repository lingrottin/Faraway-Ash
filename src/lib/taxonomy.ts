import { type CollectionEntry, getCollection } from "astro:content";
import { pinyin } from "pinyin-pro";
import { postPermalink } from "./permalink";
import { siteConfig } from "./site";

/**
 * Generate a stable URL slug from Latin text and Chinese characters.
 */
export function taxonomySlug(name: string): string {
  // Keep Latin/number runs together; convert CJK characters to pinyin.
  const tokens: string[] = [];
  const re = /[A-Za-z0-9]+|[\u3400-\u9FFF]|[^\s]/gu;
  for (const m of name.matchAll(re)) {
    const token = m[0];
    if (/^[A-Za-z0-9]+$/.test(token)) {
      tokens.push(token.toLowerCase());
    } else if (/^[\u3400-\u9FFF]$/u.test(token)) {
      const py = pinyin(token, { toneType: "none", type: "array" })[0] ?? token;
      tokens.push(String(py).toLowerCase());
    } else if (/^[\s._]+$/.test(token)) {
      // skip
    } else {
      // punctuation like '.' in node.js already handled by split? keep alnum only
      const cleaned = token.toLowerCase().replace(/[^a-z0-9]+/g, "");
      if (cleaned) tokens.push(cleaned);
    }
  }
  return tokens.join("-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export type Post = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts");
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostsWithPermalink() {
  const posts = await getPublishedPosts();
  return Promise.all(
    posts.map(async (post) => ({
      post,
      permalink: await postPermalink(post),
    })),
  );
}

export async function getTaxonomyMap(kind: "tags" | "categories") {
  const posts = await getPublishedPosts();
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const name of post.data[kind]) {
      const list = map.get(name) ?? [];
      list.push(post);
      map.set(name, list);
    }
  }
  return map;
}

export async function getTaxonomyList(kind: "tags" | "categories") {
  const map = await getTaxonomyMap(kind);
  return [...map.entries()]
    .map(([name, posts]) => ({
      name,
      slug: taxonomySlug(name),
      count: posts.length,
      posts,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "zh"));
}

export function taxonomyUrl(kind: "tags" | "categories", name: string): string {
  return `/${kind}/${taxonomySlug(name)}/`;
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize = siteConfig.pageSize,
) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    pageSize,
  };
}
