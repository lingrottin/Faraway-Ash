import { toast } from "./utils";
import { createIcons, Link } from "lucide";

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
