import type { Element, ElementContent, Root, Text } from "hast";
import { pinyin } from "pinyin-pro";

const cjkPattern = /^[\u3400-\u9fff]$/u;

/** Lucide `link` icon paths (v0.525.0). */
const linkIconPaths: ElementContent[] = [
  {
    type: "element",
    tagName: "path",
    properties: {
      d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
    },
    children: [],
  },
  {
    type: "element",
    tagName: "path",
    properties: {
      d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    },
    children: [],
  },
];

function slugifyHeading(text: string): string {
  const parts: string[] = [];
  let latin = "";

  const flushLatin = () => {
    if (latin) {
      parts.push(latin.toLowerCase());
      latin = "";
    }
  };

  for (const char of text) {
    if (/^[A-Za-z0-9]$/.test(char)) {
      latin += char;
    } else if (cjkPattern.test(char)) {
      flushLatin();
      const syllable = pinyin(char, {
        toneType: "none",
        type: "array",
      })[0];
      if (syllable) parts.push(syllable.toLowerCase());
    } else {
      flushLatin();
    }
  }
  flushLatin();

  return parts.join("-").replace(/-+/g, "-");
}

/** Direct text nodes only — keeps slug generation stable with existing posts. */
function directTextContent(element: Element): string {
  return element.children
    .filter((child): child is Text => child.type === "text")
    .map((child) => child.value)
    .join("");
}

function allTextContent(node: Element | Root): string {
  const parts: string[] = [];
  for (const child of node.children) {
    if (child.type === "text") parts.push(child.value);
    else if (child.type === "element") parts.push(allTextContent(child));
  }
  return parts.join("");
}

function hasHeadingAnchor(heading: Element): boolean {
  return heading.children.some(
    (child) =>
      child.type === "element" &&
      (child.properties?.className === "heading-anchor" ||
        (Array.isArray(child.properties?.className) &&
          child.properties.className.includes("heading-anchor"))),
  );
}

function buildHeadingAnchor(id: string, labelText: string): Element {
  const title = labelText.trim() || id;
  return {
    type: "element",
    tagName: "button",
    properties: {
      type: "button",
      className: ["heading-anchor"],
      dataTargetId: id,
      title: "复制链接",
      ariaLabel: `复制「${title}」的链接`,
    },
    children: [
      {
        type: "element",
        tagName: "svg",
        properties: {
          xmlns: "http://www.w3.org/2000/svg",
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          className: ["lucide", "lucide-link"],
          "aria-hidden": "true",
          focusable: "false",
        },
        children: linkIconPaths,
      },
    ],
  };
}

/**
 * Fills missing heading IDs with predictable pinyin-based slugs and injects
 * copy-link anchors. Explicit IDs from `remark-custom-header-id` are kept.
 */
export default function rehypeHeadingIds() {
  return (tree: Root) => {
    const used = new Map<string, number>();

    function visit(node: Root | Element) {
      for (const child of node.children) {
        if (child.type !== "element") continue;

        if (/^h[1-6]$/i.test(child.tagName)) {
          child.properties ??= {};

          if (typeof child.properties.id !== "string" || !child.properties.id) {
            const baseId =
              slugifyHeading(directTextContent(child)) || "section";
            const count = used.get(baseId) ?? 0;
            used.set(baseId, count + 1);
            child.properties.id = count === 0 ? baseId : `${baseId}-${count}`;
          } else {
            used.set(
              child.properties.id,
              (used.get(child.properties.id) ?? 0) + 1,
            );
          }

          const id = child.properties.id as string;
          if (!hasHeadingAnchor(child)) {
            child.children.push(buildHeadingAnchor(id, allTextContent(child)));
          }
          // Do not descend into heading children (anchors are leaves).
          continue;
        }

        visit(child);
      }
    }

    visit(tree);
  };
}
