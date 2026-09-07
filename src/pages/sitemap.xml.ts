import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { absoluteUrl, postPermalink } from "../lib/permalink";
import { siteConfig } from "../lib/site";
import { getTaxonomyList } from "../lib/taxonomy";

function xmlEscape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.toString() ?? "https://enita.cn").replace(/\/$/, "");
  const urls: { loc: string; lastmod?: string }[] = [];

  urls.push({ loc: `${siteUrl}/` });
  urls.push({ loc: `${siteUrl}/about/` });
  urls.push({ loc: `${siteUrl}/categories/` });
  urls.push({ loc: `${siteUrl}/tags/` });

  const posts = await getCollection("posts");
  for (const post of posts) {
    const path = await postPermalink(post);
    urls.push({
      loc: absoluteUrl(`${siteUrl}/`, path),
      lastmod: post.data.date.toISOString().slice(0, 10),
    });
  }

  // pagination pages for home
  const totalPages = Math.max(1, Math.ceil(posts.length / siteConfig.pageSize));
  for (let p = 1; p <= totalPages; p++) {
    urls.push({ loc: `${siteUrl}/page/${p}/` });
  }

  for (const kind of ["categories", "tags"] as const) {
    const list = await getTaxonomyList(kind);
    for (const item of list) {
      const base = `${siteUrl}/${kind}/${item.slug}/`;
      urls.push({ loc: base });
      const pages = Math.max(1, Math.ceil(item.count / siteConfig.pageSize));
      for (let p = 1; p <= pages; p++) {
        urls.push({ loc: `${base}page/${p}/` });
      }
    }
  }

  // unique preserve order
  const seen = new Set<string>();
  const ordered = urls.filter((u) => {
    if (seen.has(u.loc)) return false;
    seen.add(u.loc);
    return true;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ordered
  .map((u) => {
    const last = u.lastmod ? `\n        <lastmod>${u.lastmod}</lastmod>` : "";
    return `    <url>\n        <loc>${xmlEscape(u.loc)}</loc>${last}\n    </url>`;
  })
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
