/**
 * Write Hexo-style path into posts missing frontmatter.path.
 * Usage: deno task permalink:sync
 */
import { walk } from "jsr:@std/fs@1/walk";
import { computeHexoPermalink, normalizePath } from "../src/lib/permalink.ts";

const postsDir = new URL("../src/content/posts/", import.meta.url);

function parseFrontmatter(text: string): {
  fm: string;
  body: string;
  end: number;
} {
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) {
    throw new Error("missing frontmatter");
  }
  const end = text.indexOf("\n---", 4);
  if (end < 0) throw new Error("unterminated frontmatter");
  const fm = text.slice(4, end);
  const body = text.slice(end + 4).replace(/^\r?\n/, "");
  return { fm, body, end };
}

function getField(fm: string, key: string): string | null {
  const re = new RegExp(`^${key}:\\s*(.*)$`, "m");
  const m = fm.match(re);
  if (!m) return null;
  let v = m[1].trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  return v;
}

function upsertPath(fm: string, path: string): string {
  if (/^path:/m.test(fm)) {
    return fm.replace(/^path:.*$/m, `path: "${path}"`);
  }
  // insert after date if present else after title
  if (/^date:/m.test(fm)) {
    return fm.replace(/^(date:.*)$/m, `$1\npath: "${path}"`);
  }
  if (/^title:/m.test(fm)) {
    return fm.replace(/^(title:.*)$/m, `$1\npath: "${path}"`);
  }
  return `path: "${path}"\n${fm}`;
}

const used = new Map<string, string>();
let written = 0;
let skipped = 0;

for await (const entry of walk(postsDir, { exts: ["md"], maxDepth: 1 })) {
  if (!entry.isFile) continue;
  const text = await Deno.readTextFile(entry.path);
  const { fm, body } = parseFrontmatter(text);
  const existing = getField(fm, "path");
  const dateRaw = getField(fm, "date");
  if (!dateRaw) {
    console.error(`SKIP no date: ${entry.name}`);
    continue;
  }
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(dateRaw)
    ? `${dateRaw}T00:00:00+08:00`
    : dateRaw;
  const date = new Date(normalized);
  if (Number.isNaN(date.valueOf())) {
    console.error(`SKIP bad date: ${entry.name} (${dateRaw})`);
    continue;
  }

  let path: string;
  if (existing) {
    path = normalizePath(existing);
    skipped++;
  } else {
    const slug = entry.name.replace(/\.md$/, "");
    path = await computeHexoPermalink(slug, date);
    const nextFm = upsertPath(fm, path);
    await Deno.writeTextFile(entry.path, `---\n${nextFm}\n---\n${body}`);
    written++;
    console.log(`WRITE ${entry.name} -> /${path}`);
  }

  if (used.has(path)) {
    throw new Error(
      `Duplicate path ${path}: ${used.get(path)} and ${entry.name}`,
    );
  }
  used.set(path, entry.name);
}

console.log(`Done. written=${written} kept=${skipped}`);
