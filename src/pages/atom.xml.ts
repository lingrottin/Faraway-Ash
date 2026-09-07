import type { APIRoute } from "astro";
import { renderAtom, toFeedPosts } from "../lib/feeds";
import { siteConfig } from "../lib/site";
import { getPublishedPosts } from "../lib/taxonomy";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() ?? "https://enita.cn";
  const posts = await getPublishedPosts();
  const feedPosts = await toFeedPosts(posts, siteUrl);
  const body = renderAtom({
    title: siteConfig.title,
    site: siteUrl,
    selfPath: "/atom.xml",
    posts: feedPosts,
  });
  return new Response(body, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
};
