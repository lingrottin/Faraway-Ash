#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fg = require('fast-glob');
const yaml = require('js-yaml');
const moment = require('moment-timezone');

const { parse: fmParse } = require('hexo-front-matter');
const { Permalink, slugize, createSha1Hash } = require('hexo-util');

function isObject(x) {
  return x && typeof x === 'object' && !Array.isArray(x);
}

function deepMerge(target, source) {
  if (!isObject(target) || !isObject(source)) return source;
  const out = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (isObject(v) && isObject(out[k])) out[k] = deepMerge(out[k], v);
    else out[k] = v;
  }
  return out;
}

function readYamlIfExists(file) {
  if (!fs.existsSync(file)) return null;
  return yaml.load(fs.readFileSync(file, 'utf8')) || {};
}

function loadHexoConfig(siteRoot) {
  const base = readYamlIfExists(path.join(siteRoot, '_config.yml')) || {};
  const overridePaths = fg
    .sync('_config.*.yml', { cwd: siteRoot, dot: true, onlyFiles: true })
    .map(p => path.join(siteRoot, p))
    .sort();

  let merged = base;
  for (const p of overridePaths) {
    const c = readYamlIfExists(p);
    if (c) merged = deepMerge(merged, c);
  }

  merged = deepMerge(
    {
      source_dir: 'source',
      permalink: ':year/:month/:day/:title/',
      permalink_defaults: {},
      post_asset_folder: false
    },
    merged
  );

  // normalize
  merged.permalink = String(merged.permalink || '');
  return merged;
}

function inferSlugFromFile(fileAbs) {
  const base = path.basename(fileAbs, path.extname(fileAbs));
  return slugize(base, { transform: 1 });
}

function computePostPermalinkRelative(config, post) {
  // Front-matter permalink override (Hexo: __permalink)
  let __permalink = post.__permalink;
  if (__permalink) {
    __permalink = String(__permalink);
    if (config.post_asset_folder && !__permalink.endsWith('/') && !__permalink.endsWith('.html')) {
      __permalink += '/';
    }
    // Hexo filter: ensure starts with '/'
    if (!__permalink.startsWith('/')) __permalink = '/' + __permalink;
    // We return relative (no leading slash)
    return __permalink.replace(/^\/+/, '');
  }

const mDate = post.date
  ? (config.timezone
      ? moment.tz(String(post.date), String(config.timezone))
      : moment(String(post.date)))
  : moment.invalid();
  // Hexo: hash = sha1(slug + date.unix()).slice(0,12)
  const hash = post.slug && mDate.isValid()
    ? createSha1Hash()
        .update(String(post.slug) + String(mDate.unix()))
        .digest('hex')
        .slice(0, 12)
    : null;

  const meta = {
    // Hexo uses slug as "title" segment value (not post.title)
    title: post.slug,
    year: mDate.isValid() ? mDate.format('YYYY') : '',
    month: mDate.isValid() ? mDate.format('MM') : '',
    day: mDate.isValid() ? mDate.format('DD') : '',
    i_month: mDate.isValid() ? mDate.format('M') : '',
    i_day: mDate.isValid() ? mDate.format('D') : '',
    timestamp: mDate.isValid() ? mDate.format('X') : '',
    hash
  };

  const defaults = config.permalink_defaults || {};
  for (const [k, v] of Object.entries(defaults)) {
    if (meta[k] === undefined) meta[k] = v;
  }

  // Keep same segments map as Hexo uses for parsing; stringify doesn't hurt.
  const perm = new Permalink(config.permalink, {
    segments: {
      year: /(\d{4})/,
      month: /(\d{2})/,
      day: /(\d{2})/,
      i_month: /(\d{1,2})/,
      i_day: /(\d{1,2})/,
      hash: /([0-9a-f]{12})/
    }
  });

  let rel = perm.stringify(meta);

  // Hexo behavior when post_asset_folder: ensure endswith '/' or '.html'
  if (config.post_asset_folder && !rel.endsWith('/') && !rel.endsWith('.html')) rel += '/';

  // Relative, no leading slash
  rel = rel.replace(/^\/+/, '');
  return rel;
}

async function main() {
  const siteRoot = process.cwd();
  const config = loadHexoConfig(siteRoot);

  const postsDirAbs = path.join(siteRoot, config.source_dir, '_posts');
  if (!fs.existsSync(postsDirAbs)) {
    console.error(`Cannot find posts dir: ${postsDirAbs}`);
    process.exit(1);
  }

  const files = await fg(['**/*.md', '**/*.markdown', '**/*.mdown'], {
    cwd: postsDirAbs,
    onlyFiles: true,
    absolute: true
  });

  for (const fileAbs of files.sort()) {
    const raw = fs.readFileSync(fileAbs, 'utf8');
    const fm = fmParse(raw) || {};

    const post = {
      source: path.relative(siteRoot, fileAbs).replace(/\\/g, '/'),
      slug: fm.slug ? String(fm.slug) : inferSlugFromFile(fileAbs),
      date: fm.date || null,
      __permalink: fm.permalink || fm.__permalink
    };

    const rel = computePostPermalinkRelative(config, post);

    // 输出：<markdown源文件相对路径>\t<相对permalink>
    process.stdout.write(`${post.source}\t${rel}\n`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
