export type TocNode = {
  depth: number;
  text: string;
  id: string;
  children: TocNode[];
};

export type AstroHeading = {
  depth: number;
  slug: string;
  text: string;
};

export function buildTocFromHeadings(headings: AstroHeading[]): TocNode[] {
  const flat = headings
    .filter(
      (h) =>
        h.depth >= 1 &&
        h.depth <= 3 &&
        h.slug !== "footnote-label" &&
        h.text.toLowerCase() !== "footnotes",
    )
    .map((h) => ({
      depth: h.depth,
      id: h.slug,
      text: h.text,
      children: [] as TocNode[],
    }));

  const root: TocNode[] = [];
  const stack: TocNode[] = [];
  for (const node of flat) {
    while (stack.length && stack[stack.length - 1].depth >= node.depth)
      stack.pop();
    if (stack.length === 0) root.push(node);
    else stack[stack.length - 1].children.push(node);
    stack.push(node);
  }
  return root;
}
