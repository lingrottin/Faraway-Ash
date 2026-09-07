import type { CollectionEntry } from "astro:content";
import { absoluteUrl, postPermalink } from "./permalink";
import { siteConfig } from "./site";

export type FeedPost = {
  title: string;
  link: string;
  guid: string;
  pubDate: Date;
  description: string;
  author: string;
  content?: string;
};

export async function toFeedPosts(
  posts: CollectionEntry<"posts">[],
  site: string,
): Promise<FeedPost[]> {
  return Promise.all(
    posts.map(async (post) => {
      const path = await postPermalink(post);
      const link = absoluteUrl(site, path);
      return {
        title: post.data.title,
        link,
        guid: link,
        pubDate: post.data.date,
        description: post.data.description || post.data.title,
        author: post.data.authors?.join(", ") || siteConfig.author,
        content: post.body,
      };
    }),
  );
}

function xmlEscape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function rfc822(date: Date): string {
  return date.toUTCString();
}

function atomDate(date: Date): string {
  return date.toISOString();
}

export function renderRss(opts: {
  title: string;
  site: string;
  selfPath: string;
  posts: FeedPost[];
  language?: string;
}): string {
  const { title, site, selfPath, posts, language = siteConfig.locale } = opts;
  const self = absoluteUrl(site, selfPath);
  const latest = posts[0]?.pubDate ?? new Date();
  const items = posts
    .map(
      (p) => `  <item>
    <title>${xmlEscape(p.title)}</title>
    <link>${xmlEscape(p.link)}</link>
    <guid>${xmlEscape(p.guid)}</guid>
    <pubDate>${rfc822(p.pubDate)}</pubDate>
    <author>${xmlEscape(p.author)}</author>
    <description>${xmlEscape(p.description)}</description>
  </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(title)}</title>
    <link>${xmlEscape(site)}</link>
    <description>${xmlEscape(siteConfig.description)}</description>
    <language>${xmlEscape(language)}</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
    <atom:link href="${xmlEscape(self)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

export function renderAtom(opts: {
  title: string;
  site: string;
  selfPath: string;
  posts: FeedPost[];
  language?: string;
}): string {
  const { title, site, selfPath, posts, language = siteConfig.locale } = opts;
  const self = absoluteUrl(site, selfPath);
  const latest = posts[0]?.pubDate ?? new Date();
  const entries = posts
    .map(
      (p) => `  <entry>
    <title>${xmlEscape(p.title)}</title>
    <link href="${xmlEscape(p.link)}" rel="alternate" type="text/html"/>
    <id>${xmlEscape(p.guid)}</id>
    <published>${atomDate(p.pubDate)}</published>
    <updated>${atomDate(p.pubDate)}</updated>
    <author><name>${xmlEscape(p.author)}</name></author>
    <summary>${xmlEscape(p.description)}</summary>
  </entry>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${xmlEscape(language)}">
  <title>${xmlEscape(title)}</title>
  <link rel="self" type="application/atom+xml" href="${xmlEscape(self)}"/>
  <link rel="alternate" type="text/html" href="${xmlEscape(site)}"/>
  <id>${xmlEscape(self)}</id>
  <updated>${atomDate(latest)}</updated>
  <generator uri="https://astro.build/">Astro</generator>
${entries}
</feed>
`;
}
