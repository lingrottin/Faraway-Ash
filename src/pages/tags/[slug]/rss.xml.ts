import type { APIRoute } from "astro";
import { renderRss, toFeedPosts } from "../../../lib/feeds";
import { siteConfig } from "../../../lib/site";
import { getTaxonomyList } from "../../../lib/taxonomy";

export async function getStaticPaths() {
  const list = await getTaxonomyList("tags");
  return list.map((item) => ({
    params: { slug: item.slug },
    props: { name: item.name, posts: item.posts },
  }));
}

export const GET: APIRoute = async ({ site, props, params }) => {
  const siteUrl = site?.toString() ?? "https://enita.cn";
  const feedPosts = await toFeedPosts(props.posts, siteUrl);
  const body = renderRss({
    title: `${siteConfig.title} - ${props.name}`,
    site: siteUrl,
    selfPath: `/tags/${params.slug}/rss.xml`,
    posts: feedPosts,
  });
  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
