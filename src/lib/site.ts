export const siteConfig = {
  title: "Faraway Ash",
  author: "Enita Nureya",
  description: "Enita Nureya 的私人博客",
  locale: "zh",
  timezone: "Asia/Shanghai",
  menu: [
    { url: "/", name: "主页" },
    { url: "/categories/", name: "分类" },
    { url: "/about/", name: "关于" },
  ],
  bannerImg: "/imgs/banner.webp",
  creativeCommons: ["Attribution-ShareAlike"],
  pageSize: 5,
} as const;
