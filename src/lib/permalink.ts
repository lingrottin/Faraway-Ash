import type { CollectionEntry } from "astro:content";
import { dateToShanghaiUnix, shanghaiParts } from "./dates";

export async function hexoHash(
  slug: string,
  unixSeconds: number,
): Promise<string> {
  const data = new TextEncoder().encode(slug + String(unixSeconds));
  const buf = await crypto.subtle.digest("SHA-1", data);
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12);
}

/** Hexo permalink: :year/:month:day/:hash/ */
export async function computeHexoPermalink(
  slug: string,
  date: Date,
): Promise<string> {
  const parts = shanghaiParts(date);
  const unix = dateToShanghaiUnix(date);
  const hash = await hexoHash(slug, unix);
  return `${parts.year}/${parts.month}${parts.day}/${hash}/`;
}

export function normalizePath(path: string): string {
  return `${path.replace(/^\/+/, "").replace(/\/+$/, "")}/`;
}

export function postSlugFromId(id: string): string {
  // Content collection id is filename without extension for glob loader
  return id.replace(/\.md$/, "");
}

export async function postPermalink(
  post: CollectionEntry<"posts">,
): Promise<string> {
  if (post.data.path) {
    return `/${normalizePath(post.data.path)}`;
  }
  const slug = postSlugFromId(post.id);
  const generated = await computeHexoPermalink(slug, post.data.date);
  return `/${generated}`;
}

export function absoluteUrl(site: string | URL, path: string): string {
  const base = typeof site === "string" ? site : site.toString();
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}
