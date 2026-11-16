import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    // Generated cover art — see design/cover-art/philosophy.md
    cover: z
      .object({
        seed: z.number(),
        mode: z.enum(['linear', 'radial']),
        channels: z.number(),
        events: z.number(),
        coupling: z.number(),
        quantize: z.number(),
        cells: z.number(),
        accents: z.number(),
      })
      .partial()
      .optional(),
  }),
});

export const collections = { blog };
