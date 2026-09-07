# Agent Instructions for Faraway-Ash

## Project Overview

Personal blog "遥尘" (enita.cn) built with **Astro**, TypeScript, Tailwind CSS v4, managed by **Deno**.

## Architecture

- `src/content/posts/` — Markdown posts (readable filenames; public URL from `path`)
- `src/pages/` — Astro routes, including catch-all post permalinks
- `src/components/` — UI + colocated client scripts
- `src/layouts/` — Base/Post/Markdown layouts
- `src/lib/` — permalink, taxonomy, feeds, dates
- `public/` — static assets
- `legacy/` — pre-migration Zola reference (do not deploy)

## Key Commands

```bash
deno install --allow-scripts
deno task dev
deno task build
deno task permalink:sync
deno task test:permalink
deno task lint
```

## Conventions

- Package manager: **Deno only** (not pnpm/npm/yarn)
- Trailing slashes always
- Old post URLs must remain stable via frontmatter `path`
- Taxonomy slugs are generated with stable pinyin rules in `src/lib/taxonomy.ts`
- Keep feeds at `/rss.xml`, `/atom.xml`, and taxonomy feed paths
- Search is intentionally deferred
