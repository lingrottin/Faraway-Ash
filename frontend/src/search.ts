import { createIcons, Newspaper, ArrowRight } from "lucide";
import { Document } from "flexsearch";

interface SearchResult {
    url: string;
    title: string;
    body: string;
    [key: string]: string;
}

// FlexSearch document index
let searchIndex: Document<SearchResult> | null = null;
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

async function initializeFlexSearch() {
    if (initDone) return;
    if (initPromise) return initPromise;

    initPromise = (async () => {
        try {
            const resp = await fetch("/search_index.zh.json");
            if (!resp.ok)
                throw new Error(`Failed to fetch search index: ${resp.status}`);
            const pages: SearchResult[] = await resp.json();

            searchIndex = new Document<SearchResult>({
                document: {
                    id: "url",
                    index: ["title", "body"],
                    store: ["title", "body", "url"],
                },
                encoder: "CJK",
                tokenize: "full",
                resolution: 9,
            });

            for (const page of pages) {
                searchIndex.add(page);
            }

            initDone = true;
        } catch (err) {
            console.error("Failed to initialize FlexSearch:", err);
        }
    })();
    return initPromise;
}

async function performSearch(query: string) {
    hideResults();
    if (!query.trim()) return;

    await initializeFlexSearch();
    if (!searchIndex) return;

    try {
        const rawResults = searchIndex.search(query, {
            limit: 10,
            enrich: true,
        });

        // FlexSearch Document search returns an array of per-field results.
        // Deduplicate by document id while preserving result order.
        const seen = new Map<string, SearchResult>();
        for (const fieldResult of rawResults) {
            for (const item of fieldResult.result) {
                //@ts-ignore
                if (!seen.has(item.id) && item.doc) {
                    //@ts-ignore
                    seen.set(item.id, item.doc as SearchResult);
                }
                if (seen.size >= 10) break;
            }
            if (seen.size >= 10) break;
        }

        const results = Array.from(seen.values());

        if (!results.length) {
            if (noResultsContainer)
                noResultsContainer.setAttribute("data-shown", "");
            return;
        }

        resultsOuterContainer?.setAttribute("data-shown", "");
        renderResults(results);
    } catch (err) {
        console.error("Search error:", err);
    }
}

function renderResults(results: SearchResult[]) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = "";
    results.forEach((r, i) => {
        const snip = r.description || r.body?.slice(0, 100) || "";
        const isFirst = i === 0;
        const isLast = i === results.length - 1;

        const a = document.createElement("a");
        a.href = r.url;
        a.className = `flex flex-row items-center p-4 hover:bg-muted/60 cursor-pointer transition-colors duration-200 ${isFirst ? "rounded-t-lg" : ""} ${isLast ? "rounded-b-lg" : ""}`;

        a.innerHTML = `
            <i data-lucide="newspaper" class="self-start -mt-0.5 size-8 mr-4"></i>
            <div class="flex flex-col min-w-0">
                <div class="text-xl font-semibold truncate">${escapeHtml(r.title)}</div>
                  ${snip ? `<div class="text-base text-foreground line-clamp-2">${escapeHtml(snip)}</div>` : ""}
            </div>
            <div class="flex-1"></div>
            <i data-lucide="arrow-right" class="size-10 flex-shrink-0"></i>
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

function escapeHtml(text: string): string {
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
    initializeFlexSearch();
} else {
    window.addEventListener("load", initializeFlexSearch);
}
