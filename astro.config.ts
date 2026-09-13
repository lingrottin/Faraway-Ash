import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkCustomHeaderId from "remark-custom-header-id";
import {
  defListHastHandlers,
  remarkDefinitionList,
} from "remark-definition-list";
import remarkGithubAlerts from "remark-github-alerts";
import rehypeHeadingIds from "./src/lib/rehype-heading-ids";

const site = process.env.SITE_URL ?? "https://enita.cn";

export default defineConfig({
  site,
  trailingSlash: "always",

  build: {
    format: "directory",
  },

  // Old Zola auto-slugs for the two posts that lacked explicit path.
  redirects: {
    "/wu-u-pan-an-zhuang-linux-fa-xing-ban-fang-fa-zong-jie/":
      "/2026/0522/866a6e310571/",
    "/fedora-silverblue-shi-yong-xiao-ji/": "/2026/0512/c031b0d235aa/",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [
      remarkGithubAlerts,
      remarkCustomHeaderId,
      remarkDefinitionList,
    ],
    remarkRehype: {
      handlers: {
        ...defListHastHandlers,
      },
    },
    rehypePlugins: [rehypeHeadingIds],
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      defaultColor: false,
    },
  },

  integrations: [mdx(), solidJs()],
});
