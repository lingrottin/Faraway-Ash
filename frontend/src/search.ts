import { createIcons, Newspaper, ArrowRight } from "lucide";
import "core-js/actual/regexp/escape";

type SearchItem = {
  url: string;
  title: string;
  body: string;
};

let searchIndex: SearchItem[] = [];
let initDone = false;
let initPromise: Promise<void> | null = null;

const overlay = document.getElementById(
  "search-overlay",
) as HTMLDivElement | null;
const input = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const btn = document.getElementById("search-btn") as HTMLButtonElement | null;
const resultsContainer = document.getElementById(
  "search-results",
) as HTMLDivElement | null;
const resultsOuterContainer = document.getElementById(
  "search-results-outer",
) as HTMLDivElement | null;
const noResultsContainer = document.getElementById(
  "search-no-results",
) as HTMLDivElement | null;

function openSearch() {
  if (!overlay) return;
  overlay.setAttribute("data-shown", "");
  input?.focus();
}

function closeSearch() {
  if (!overlay) return;
  overlay.removeAttribute("data-shown");
  if (input) input.value = "";
  hideResults();
}

function hideResults() {
  if (resultsOuterContainer)
    resultsOuterContainer.removeAttribute("data-shown");
  if (noResultsContainer) noResultsContainer.removeAttribute("data-shown");
}

function search(query: string): SearchItem[] {
  if (searchIndex.length === 0) return [];

  // 分词
  const seg = new Intl.Segmenter("zh", { granularity: "word" });
  const words_iter = seg.segment(query)[Symbol.iterator]();
  const words_arr = Array.from(words_iter)
    .filter((i) => !!i.isWordLike)
    .map((i) => i.segment);

  // 搜索
  const result = [];
  for (const item of searchIndex) {
    const item_clone = structuredClone(item);
    const regex = new RegExp(
      // @ts-expect-error: we already imported polyfill for this
      words_arr.map((i) => RegExp.escape(i)).join("|"),
      "gi",
    );
    let matches = false;
    let title = "";
    let t_offset = 0;
    const t_replacer = (match: string, offset: number, str: string): string => {
      title += str.substring(t_offset, offset);
      title += `<span class="search-match">`;
      title += match;
      t_offset = offset + match.length;
      title += `</span>`;
      matches = true;
      return match;
    };
    item_clone.title.replaceAll(regex, t_replacer);
    if (t_offset !== item.title.length - 1)
      title += item.title.substring(t_offset, item.title.length);
    item_clone.title = title;

    let body = "";
    let b_offset = 0;
    const b_replacer = (match: string, offset: number, str: string): string => {
      if (b_offset === 0) {
        if (offset - 10 > 0) body += "...";
        body += str.substring(Math.max(offset - 10, 0), offset);
      } else {
        body += str.substring(b_offset, offset);
      }
      body += `<span class="search-match">`;
      body += match;
      b_offset = offset + match.length;
      body += `</span>`;
      matches = true;
      return match;
    };
    item_clone.body.replaceAll(regex, b_replacer);
    if (b_offset !== item.body.length - 1)
      body += item.body.substring(b_offset, item.body.length);
    item_clone.body = body;
    if (matches) {
      result.push(item_clone);
    }
  }

  return result;
}

async function initializeSearchIndex() {
  if (initDone) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const resp = await fetch("/search_index.zh.json");
      if (!resp.ok)
        throw new Error(`Failed to fetch search index: ${resp.status}`);
      searchIndex = (await resp.json()) as typeof searchIndex;
      initDone = true;
    } catch (err) {
      console.error("Failed to initialize search index:", err);
    }
  })();
  return initPromise;
}

async function performSearch(query: string) {
  hideResults();
  if (!query.trim()) return;

  await initializeSearchIndex();
  if (searchIndex.length === 0) return;

  try {
    const results = search(query);

    if (!results.length) {
      if (noResultsContainer) noResultsContainer.setAttribute("data-shown", "");
      return;
    }

    resultsOuterContainer?.setAttribute("data-shown", "");
    renderResults(results);
  } catch (err) {
    console.error("Search error:", err);
  }
}

function renderResults(results: SearchItem[]) {
  if (!resultsContainer) return;
  resultsContainer.innerHTML = "";
  results.forEach((r, i) => {
    const isFirst = i === 0;
    const isLast = i === results.length - 1;

    const a = document.createElement("a");
    a.href = r.url;
    a.className = `search-result-item flex flex-row items-center p-4 hover:bg-muted/60 cursor-pointer transition-colors duration-200 ${isFirst ? "rounded-t-lg" : ""} ${isLast ? "rounded-b-lg" : ""}`;

    a.innerHTML = `
            <i data-lucide="newspaper" class="self-start mt-0.5 size-5 mr-2 shrink-0"></i>
            <div class="flex flex-col min-w-0">
                <div class="text-xl font-semibold truncate">${r.title}</div>
                  ${`<div class="text-base text-foreground font-light line-clamp-2">${r.body}</div>`}
            </div>
            <div class="flex-1"></div>
            <i data-lucide="arrow-right" class="ml-4 shrink-0"></i>
        `;

    resultsContainer.appendChild(a);

    if (!isLast) {
      const divider = document.createElement("div");
      divider.className = "border-b border-border";
      resultsContainer.appendChild(divider);
    }
  });

  createIcons({
    icons: { Newspaper, ArrowRight },
  });
}

function escapeHTML(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Debounce
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

if (input) {
  input.addEventListener("input", () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(input.value);
    }, 200);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });
}

if (btn) {
  btn.addEventListener("click", () => {
    if (overlay?.hasAttribute("data-shown")) {
      closeSearch();
    } else {
      openSearch();
    }
  });
}

// Close overlay when clicking outside the search card
document.addEventListener("click", (e) => {
  if (!overlay?.hasAttribute("data-shown")) return;
  const target = e.target as HTMLElement;
  if (target === overlay) {
    closeSearch();
  }
});

// Close on Escape globally when overlay is open
document.addEventListener("keydown", (e) => {
  if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    if (overlay?.hasAttribute("data-shown")) {
      closeSearch();
    } else {
      openSearch();
    }
    return;
  }

  if (e.key === "Escape" && overlay?.hasAttribute("data-shown")) {
    if (document.activeElement === input) return;
    closeSearch();
  }
});

// Preload search index early
if (document.readyState === "complete") {
  initializeSearchIndex();
} else {
  window.addEventListener("load", initializeSearchIndex);
}
