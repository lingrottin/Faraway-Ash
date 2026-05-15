import { createIcons, Link } from "lucide";
import { toast } from "./utils";

const share_this_page = document.getElementById("share_this_page") as
  | HTMLDivElement
  | undefined;

if (share_this_page) {
  share_this_page.addEventListener("click", async () => {
    try {
      const link = share_this_page.getAttribute("data-share-link");
      await navigator.clipboard.writeText(link || window.location.href);
      toast("文本已成功复制到剪贴板", { variant: "success" });
    } catch (err) {
      toast(`无法复制文本: ${err}`, { variant: "destructive" });
    }
  });
}

// --- Heading anchor links ---

function injectHeadingAnchors() {
  const content = document.querySelector(".content");
  if (!content) return;

  for (const heading of content.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
    const id = heading.id;
    if (!id) continue;

    // Prevent duplicate injection
    if (heading.querySelector(".heading-anchor")) continue;

    const anchor = document.createElement("i");
    anchor.className = "heading-anchor";
    anchor.setAttribute("data-lucide", "link");
    anchor.setAttribute("data-target-id", id);
    anchor.setAttribute("role", "button");
    anchor.setAttribute("tabindex", "0");
    anchor.setAttribute(
      "aria-label",
      `复制「${heading.textContent?.trim() ?? id}」的链接`,
    );
    anchor.title = "复制链接";

    heading.appendChild(anchor);
  }

  // Re-render lucide icons for the newly injected elements
  createIcons({
    icons: { Link },
    attrs: { "aria-hidden": "true" },
  });

  // Event delegation: lucide replaces <i> with <svg>, so direct listeners would be lost
  content.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const anchorEl = target.closest("[data-target-id]");
    if (!anchorEl) return;

    const targetId = anchorEl.getAttribute("data-target-id");
    if (!targetId) return;

    const url = `${window.location.origin}${window.location.pathname}#${targetId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast("标题链接已复制到剪贴板", { variant: "success" });
    } catch (err) {
      toast(`无法复制链接: ${err}`, { variant: "destructive" });
    }
  });
}

document.addEventListener("DOMContentLoaded", injectHeadingAnchors);

// --- GLightbox ---

const page_type = document.getElementById("page-type") as
  | HTMLScriptElement
  | undefined;
if (page_type && JSON.parse(page_type?.innerText).page_type === "content") {
  const { default: GLightbox } = await import("glightbox");
  GLightbox({ selector: ".content img" });
}

// --- highlight anchor targets ---

async function highlightAnchorTargets() {
  const target_id = window.location.href.split("#").at(-1);
  const actual_target = document.getElementById(target_id || "");
  if (!actual_target) return;

  const prev_highlight = document.getElementById("fa-anchor-highlight");
  if (prev_highlight) {
    prev_highlight.remove();
  }

  // filtering
  const filter_target = (target: HTMLElement | null) => {
    if (!target) return null;
    const target_tag = target.tagName.toLowerCase();
    const selector = `sub ${target_tag}, sup ${target_tag}, .heading-anchor, sub, sup`;
    if (target.matches(selector)) {
      return filter_target(target.parentElement);
    } else {
      return target;
    }
  };

  const target = filter_target(actual_target);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const highlight = document.createElement("div");
  highlight.id = "fa-anchor-highlight";
  highlight.classList.add(
    "absolute",
    "w-full",
    "dark:bg-cyan-100/20",
    "dark:mix-blend-hard-light",
    "not-dark:bg-cyan-200/80",
    "not-dark:mix-blend-darken",
    "pointer-events-none",
    "opacity-0",
    "z-1",
  );
  highlight.style = `top:${window.scrollY + rect.top}px; height:${rect.height}px;`;
  document.body?.appendChild(highlight);

  const animation = highlight.animate(
    [
      { opacity: 0, easing: "ease-in" },
      { opacity: 1, offset: 0.03 },
      {
        opacity: 1,
        offset: 0.8,
        easing: "ease-in-out",
      },
      { opacity: 0 },
    ],
    {
      duration: 5000,
      direction: "normal",
      fill: "forwards",
    },
  );
  await animation.finished;
  highlight.remove();
}

document.addEventListener("DOMContentLoaded", highlightAnchorTargets);
window.addEventListener("hashchange", highlightAnchorTargets);

class FaTocHeader extends HTMLElement {
  correspondingHeader: HTMLHeadingElement | null = null;
  childrenContainer: FaTocChildren | null = null;
  parentTocHeader: FaTocHeader | null = null;
  anchor: HTMLAnchorElement | null = null;

  init() {
    const dataId = this.dataset.id;
    this.correspondingHeader = dataId
      ? (document.getElementById(dataId) as HTMLHeadingElement | null)
      : null;

    this.anchor = this.querySelector(":scope > a") as HTMLAnchorElement | null;

    this.childrenContainer = this.querySelector(
      ":scope > fa-toc-children",
    ) as FaTocChildren | null;

    this.parentTocHeader = this.parentElement?.closest(
      "fa-toc-header",
    ) as FaTocHeader | null;
  }

  setHighlighted(highlighted: boolean) {
    this.classList.toggle("toc-highlighted", highlighted);
  }

  setExpanded(expanded: boolean) {
    const hasChildren = !!this.childrenContainer;
    this.classList.toggle("toc-expanded", hasChildren && expanded);
    this.classList.toggle("toc-collapsed", hasChildren && !expanded);

    if (this.childrenContainer) {
      this.childrenContainer.classList.toggle("toc-collapsed", !expanded);
    }
  }
}

class FaTocChildren extends HTMLElement {}

customElements.define("fa-toc-header", FaTocHeader);
customElements.define("fa-toc-children", FaTocChildren);

function initSidebarToc() {
  const sidebar = document.getElementById("fa-toc-container");
  if (!sidebar) return;

  const tocHeaders = Array.from(
    sidebar.querySelectorAll("fa-toc-header"),
  ) as FaTocHeader[];

  if (tocHeaders.length === 0) return;

  for (const tocHeader of tocHeaders) {
    tocHeader.init();
  }

  function getActiveHeader(): FaTocHeader | null {
    const triggerY = window.innerHeight / 3;

    let active: FaTocHeader | null = null;
    let bestTop = -Infinity;

    for (const tocHeader of tocHeaders) {
      const heading = tocHeader.correspondingHeader;
      if (!heading) continue;

      const rect = heading.getBoundingClientRect();
      if (rect.top <= triggerY && rect.top > bestTop) {
        bestTop = rect.top;
        active = tocHeader;
      }
    }

    if (active) return active;

    let fallback: FaTocHeader | null = null;
    let minTop = Infinity;

    for (const tocHeader of tocHeaders) {
      const heading = tocHeader.correspondingHeader;
      if (!heading) continue;

      const rect = heading.getBoundingClientRect();
      if (rect.top > triggerY && rect.top < minTop) {
        minTop = rect.top;
        fallback = tocHeader;
      }
    }

    return fallback;
  }

  function collectActiveChain(active: FaTocHeader | null): Set<FaTocHeader> {
    const chain = new Set<FaTocHeader>();

    let cur = active;
    while (cur) {
      chain.add(cur);
      cur = cur.parentTocHeader;
    }

    return chain;
  }

  function updateTocState() {
    const active = getActiveHeader();
    const activeChain = collectActiveChain(active);

    for (const tocHeader of tocHeaders) {
      tocHeader.setHighlighted(tocHeader === active);

      if (tocHeader.childrenContainer) {
        tocHeader.setExpanded(activeChain.has(tocHeader));
      }
    }
  }

  let scheduled = false;

  function scheduleUpdate() {
    if (scheduled) return;

    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateTocState();
    });
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);

  scheduleUpdate();
}

document.addEventListener("DOMContentLoaded", initSidebarToc);
