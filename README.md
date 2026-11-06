# Faraway-Ash

我的个人博客「[遥尘](https://enita.cn)」的源文件。

## 静态站点构建器

使用 [Astro](https://astro.build) 构建，包管理使用 [pnpm](https://pnpm.io)，运行环境为 Node.js 26+。

## 开发

```bash
pnpm install
pnpm run dev
```

生产构建：

```bash
pnpm run permalink:sync   # 为缺 path 的文章写入 Hexo 风格 URL
pnpm run build
```

站点完整部署在 Cloudflare Pages 上，主域名为 `enita.cn`；`cf.enita.cn` 为 Cloudflare 层面的 308 重定向。

## 主题

模板与组件在 `src/components`、`src/layouts`、`src/pages`。
