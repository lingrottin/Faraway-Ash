import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const dateSchema = z.union([
  z.date(),
  z.string().transform((value, ctx) => {
    const trimmed = value.trim();
    // Date-only values are Asia/Shanghai midnight, matching the blog's timezone.
    const normalized = /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
      ? `${trimmed}T00:00:00+08:00`
      : trimmed;
    const date = new Date(normalized);
    if (Number.isNaN(date.valueOf())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid date: ${value}`,
      });
      return z.NEVER;
    }
    return date;
  }),
]);

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: dateSchema,
    description: z.string().optional().default(""),
    path: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    authors: z.array(z.string()).optional(),
    index_img: z.string().optional(),
  }),
});

export const collections = { posts };
