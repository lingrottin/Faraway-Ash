# Faraway-Ash

我的个人博客「[遥尘](https://enita.cn)」的源文件。

## Builder

使用 [Astro](https://astro.build) 构建，包管理使用 [Deno](https://deno.com)。

## Develop

```bash
deno install --allow-scripts
deno task dev
```

生产构建：

```bash
deno task permalink:sync   # 为缺 path 的文章写入 Hexo 风格 URL
deno task build
```

## Theme

模板与组件在 `src/components`、`src/layouts`、`src/pages`。

## License

配置文件遵循 CC0 1.0，博客作品遵循 CC BY-SA 4.0。
