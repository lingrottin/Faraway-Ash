# Hacking Faraway-Ash

目前来说，这个博客已经迁移到了 [Zola](https://getzola.org)。在我定制的 Zola 工作流上工作，可能和以往以 Hexo 为中心的工作流有一定的区别。以下是关于如何修改这些内容的详细文档。

## 编写文章和维护站点

Zola 的目录位于 [src/](./src/)。所有文章和有关 Zola 的维护都应该放在这里。

运行以下命令来动态监听站点更改。

```bash
zola -r src/ serve
```

## 开发主题

这里的主题使用 Rolldown 来打包 JavaScript 文件，使用 Tailwind CSS 来产生 CSS。在**仓库根目录**下运行以下命令来安装依赖：

```bash
pnpm i
```

运行以下命令来动态监听 JavaScript 和 Tailwind 类。（需要 tmux。如果你在 Windows 下，请参考 [package.json](package.json)，手动运行构建命令。）

```bash
pnpm dev
```

运行以下命令来打包最终的文件。

```bash
pnpm build
```

### 文件结构

关于该站点的前端样式，有这些目录：

- [`src/`](src/): Zola 目录。
  - [`src/static/`](src/static): 静态资源目录。编译后的 JS 和 CSS 文件放在这里。
  - [`src/templates/`](src/templates): 模板目录。HTML 文件在这里。
- [`frontend/`](frontend/): 前端源码目录。
  - [`frontend/css/main.css`](frontend/css/main.css): 主 CSS 文件。一般来说无需更改，因为我们使用 Tailwind。
  - [`frontend/src/main.ts`](frontend/src/main.ts): 前端 TypeScript 源代码。
