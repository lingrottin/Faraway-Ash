import type { Element, Root, Text } from "hast";
import { pinyin } from "pinyin-pro";

const cjkPattern = /^[\u3400-\u9fff]$/u;

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

function textContent(element: Element): string {
  return element.children
    .filter((child): child is Text => child.type === "text")
    .map((child) => child.value)
    .join("");
}

/**
 * Fills missing heading IDs with predictable pinyin-based slugs.
 * Explicit IDs from `remark-custom-header-id` are left untouched.
 */
export default function rehypeHeadingIds() {
  return (tree: Root) => {
    const used = new Map<string, number>();

    function visit(node: Root | Element) {
      for (const child of node.children) {
        if (child.type === "element") {
          if (/^h[1-6]$/i.test(child.tagName)) {
            child.properties ??= {};
            if (
              typeof child.properties.id === "string" &&
              child.properties.id
            ) {
              used.set(
                child.properties.id,
                (used.get(child.properties.id) ?? 0) + 1,
              );
              visit(child);
              continue;
            }

            const baseId = slugifyHeading(textContent(child)) || "section";
            const count = used.get(baseId) ?? 0;
            used.set(baseId, count + 1);
            child.properties.id = count === 0 ? baseId : `${baseId}-${count}`;
          }
          visit(child);
        }
      }
    }

    visit(tree);
  };
}
