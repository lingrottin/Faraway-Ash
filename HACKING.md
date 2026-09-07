# Hacking Faraway-Ash

本站已迁移到 Astro。包管理与脚本统一使用 Deno。

## 常用命令

```bash
deno install --allow-scripts
deno task dev
deno task build
deno task preview
deno task permalink:sync
deno task test:permalink
deno task lint
```

## 目录

- `src/content/posts/`：文章 Markdown（文件名可读）
- `src/pages/`：路由
- `src/components/`：UI 与交互组件
- `src/lib/permalink.ts`：Hexo 兼容 permalink
- `src/lib/taxonomy.ts`：分类/标签聚合与拼音 slug
- `public/`：静态资源
- `legacy/`：迁移前的 Zola/Hexo 对照（可在稳定后删除）

## Permalink

- 已有 `path` 的文章永远使用 `path`，不重算。
- 无 `path` 的文章按 Hexo 规则生成：`/YYYY/MMDD/<sha1(slug+unix)[0:12]>/`
- `deno task permalink:sync` 会把生成结果写回 frontmatter。

## Feeds / Sitemap

与旧站路径一致：

- `/rss.xml`
- `/atom.xml`
- `/sitemap.xml`
- `/categories/<slug>/rss.xml` / `atom.xml`
- `/tags/<slug>/rss.xml` / `atom.xml`

## 搜索

当前版本暂不提供站内搜索。
