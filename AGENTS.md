# AGENTS.md

Agent-facing guide for Faraway-Ash, the source of personal blog **遥尘** ([enita.cn](https://enita.cn)).

Human docs: `README.md`, `HACKING.md`. Prefer this file for exact commands, invariants, and file ownership.

## Project Overview

- Static personal blog migrated from Hexo/Zola to **Astro 5**
- **TypeScript** (strict), **Tailwind CSS v4** via `@tailwindcss/vite`
- Package manager and tasks: **pnpm** with **Node.js 26+** (do not use npm/yarn/Deno for installs or scripts)
- Site defaults: locale `zh`, timezone `Asia/Shanghai`, trailing slashes always
- Production host: `https://enita.cn`, served by **Cloudflare Pages**. `https://cf.enita.cn` is a Cloudflare-level 308 redirect to the primary domain, not a separate deployment

## Architecture

```
src/
  content/posts/     Markdown posts (readable Chinese/English filenames)
  content.config.ts  Astro content collection schema for `posts`
  pages/             File-based routes (home, pagination, taxonomy, feeds, catch-all posts)
  components/        UI: site/, post/, taxonomy/
  layouts/           BaseLayout, PostLayout, MarkdownPage
  lib/               permalink, taxonomy, feeds, dates, site config, rehype helpers
  styles/            main.css + content.css (Tailwind + prose)
public/              Static assets (img/, imgs/, fonts/, robots.txt)
scripts/             Node utilities (permalink sync + tests)
hexo-legacy/         Historical Hexo tree (reference only; never deploy)
dist/                Build output (generated)
```

Key routing facts:

- Post public URL comes from frontmatter `path`, not the Markdown filename
- Catch-all route: `src/pages/[...permalink].astro`
- Home: `/` + pagination at `/page/<n>/` (`src/pages/page/[page].astro`)
- Taxonomies: `/categories/`, `/tags/`, plus per-slug index, pagination, and feeds
- Static pages: `/about/`, `/404/`
- Icons: `@lucide/astro` (server-rendered; prefer this over client icon packs)

## Setup Commands

Requires Node.js 26+ and pnpm 12.x.

```bash
# Install dependencies
pnpm install

# Optional: typecheck / Astro diagnostics
pnpm run check
```

Environment:

- Site origin is fixed to `https://enita.cn` in `astro.config.ts`; feeds, sitemap, and canonicals always use it.
- `TZ=Asia/Shanghai` is used in CI; date logic is written against Shanghai wall time for permalink math. Prefer Shanghai when debugging dates.

## Development Workflow

```bash
pnpm run dev        # astro dev
pnpm run build      # astro build → dist/
pnpm run preview    # astro preview
pnpm run check      # astro check
pnpm run lint       # Biome check --write on src, scripts, astro.config.ts
```

Package scripts live in `package.json`. Use **`pnpm run …`** (not npm or yarn).

Import alias: `@/*` → `src/*` (`tsconfig.json`).

## Content / Posts

Collection: `posts` from `src/content/posts/**/*.md` (`src/content.config.ts`).

Frontmatter schema:

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | string |
| `date` | yes | `Date` or string; bare `YYYY-MM-DD` → that day 00:00 `+08:00` |
| `path` | strongly preferred | public permalink without leading slash, with trailing slash, e.g. `2024/1004/b874b7761eb3/` |
| `description` | no | defaults `""` |
| `tags` | no | string[] |
| `categories` | no | string[] |
| `authors` | no | string[] |
| `index_img` | no | cover/index image path |

### Permalink rules (do not break)

1. If `path` exists, **always** use it. Never recompute or rewrite existing paths unless the user explicitly asks.
2. If `path` is missing, generate Hexo-compatible:
   `/YYYY/MMDD/<sha1(filenameSlug + shanghaiUnixSeconds)[0:12]>/`
   Implementation: `src/lib/permalink.ts` + Shanghai helpers in `src/lib/dates.ts`.
3. Sync missing paths into frontmatter:
   ```bash
   pnpm run permalink:sync
   ```
4. CI runs `permalink:sync` before build. Local production builds should too when adding posts without `path`.
5. Two old Zola auto-slugs are hard-redirected in `astro.config.ts` (`redirects`). Keep them unless URLs are intentionally retired.
6. Duplicate `path` values must fail loudly (sync script throws).

### Taxonomy rules

- Slugs from display names via `taxonomySlug()` in `src/lib/taxonomy.ts` (Latin runs kept; CJK → tone-less pinyin; stable join with `-`).
- Do not hand-edit slug algorithms without a migration plan; public category/tag URLs depend on them.
- Pagination size: `siteConfig.pageSize` (currently `5`) in `src/lib/site.ts`.

### Feeds and sitemap (path-stable)

Keep these public paths working:

- `/rss.xml`, `/atom.xml`
- `/sitemap.xml`
- `/categories/<slug>/rss.xml`, `/categories/<slug>/atom.xml`
- `/tags/<slug>/rss.xml`, `/tags/<slug>/atom.xml`

Feed builders: `src/lib/feeds.ts` and the corresponding `src/pages/**/*.ts` endpoints.

### Intentionally deferred

- Site search is **not** implemented. Do not add a search feature unless requested.

## Testing Instructions

There is no full unit-test framework. Permalink invariants are the critical automated check:

```bash
pnpm run test:permalink   # scripts/test-permalink.ts fixtures from Hexo era
pnpm run check            # Astro/TS diagnostics
pnpm run lint             # Biome (writes fixes)
pnpm run build            # full static generation smoke test
```

When changing permalink/date/hash logic:

1. Update or extend fixtures in `scripts/test-permalink.ts`
2. Run `pnpm run test:permalink`
3. Confirm existing posts keep the same `path` / public URL

When changing routes, feeds, or taxonomy slugs, run `pnpm run build` and spot-check `dist/` paths.

## Code Style

- Formatter/linter: **Biome 2** (`biome.json`)
  - indent 2 spaces
  - double quotes in JS/TS
  - recommended lint preset
  - Astro domain rules enabled; unused var/import off inside `.astro`
- Tailwind v4 CSS with `tailwindDirectives` parsing enabled
- Class merging helper: `cn()` in `src/lib/utils.ts` (`clsx` + `tailwind-merge`)
- Prefer server/Astro components; keep client JS minimal and colocated when needed
- Markdown pipeline (do not casually reorder without checking output):
  - remark: `remark-github-alerts`, `remark-custom-header-id`, `remark-definition-list`
  - rehype: `src/lib/rehype-heading-ids.ts` (heading ids + link affordances)
  - Shiki themes: Catppuccin latte (light) / mocha (dark), `defaultColor: false`

Lint command already uses `--write`. Review the diff after linting.

## Build and Deployment

Local production-shaped build:

```bash
pnpm run permalink:sync
pnpm run build
# output: dist/
```

CI: `.github/workflows/main.yml` on push to `main`

1. `pnpm install --frozen-lockfile`
2. `pnpm run permalink:sync`
3. `pnpm run build` (site origin fixed to `https://enita.cn`)
4. Force-push `dist/` to the `cf_web` branch of the Cloudflare Pages repo; Cloudflare Pages serves `enita.cn`. There is no server copy and no separate `cf.enita.cn` build.

Agents should **not** deploy, rotate secrets, or push to `cf_web` unless explicitly asked. Do not commit secrets.

## Pull Request / Change Guidelines

Before finishing a change:

```bash
pnpm run lint
pnpm run test:permalink
pnpm run check   # if types/routes/content schema touched
pnpm run build   # if routes, content, markdown pipeline, or public URLs touched
```

Commit hygiene:

- Keep URL stability as a hard requirement for existing posts
- Do not mass-rewrite frontmatter `path` values
- Do not delete or “clean up” `hexo-legacy/` content as part of unrelated work
- Prefer small, focused diffs in `src/lib/*` when touching shared permalink/taxonomy/date code

## Security / Safety Notes

- Deploy secrets live only in GitHub Actions (`GH_TOKEN`, `GIT_EMAIL`). Never read them into source or logs.
- Scripts run directly with Node's native TypeScript support and only write to `src/content/posts/`; keep them that way.
- User-authored Markdown is trusted site content, not arbitrary multi-tenant input; still avoid introducing `eval` or unsandboxed HTML injection helpers.

## Common Gotchas

- **Package manager**: always pnpm; `pnpm-lock.yaml` is committed. Node 26 runs `scripts/*.ts` directly via type stripping, so relative imports inside imported TS modules need explicit `.ts` extensions.
- **Trailing slashes**: `trailingSlash: "always"` and `build.format: "directory"`. Links should end with `/`.
- **Filename ≠ URL**: post file names are editorial; URLs are `path`.
- **Date-only frontmatter**: interpreted as Shanghai midnight (`+08:00`), not UTC midnight.
- **Exclude trees**: `hexo-legacy/`, `dist/`, `node_modules/`, `.astro/` are outside normal lint/typecheck scope. Biome also ignores `legacy` / `zola-legacy` if present.
- **Search**: intentionally absent.
- **Site config** (title, menu, banner, page size): `src/lib/site.ts`.

## Useful File Map

| Concern | Start here |
| --- | --- |
| Astro + Markdown config | `astro.config.ts` |
| pnpm scripts | `package.json` |
| Post schema | `src/content.config.ts` |
| Permalink / hash | `src/lib/permalink.ts`, `scripts/permalink-sync.ts` |
| Taxonomy / pagination | `src/lib/taxonomy.ts` |
| Feeds XML | `src/lib/feeds.ts` |
| Dates / reading time | `src/lib/dates.ts` |
| Global site strings | `src/lib/site.ts` |
| Post page shell | `src/layouts/PostLayout.astro` |
| TOC / lightbox / enhancements | `src/components/post/*` |
| CI deploy | `.github/workflows/main.yml` |
