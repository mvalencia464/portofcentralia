import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

// Meetings, news and parks live in JSON so a future email-to-publish
// workflow can append entries without touching templates.
const meetings = defineCollection({
  loader: file('src/content/meetings.json'),
  schema: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    type: z.string(),
    time: z.string().optional(),
    location: z.string().optional(),
    video: z.string().url().optional(),
    documents: z.array(
      z.object({
        kind: z.enum(['Agenda', 'Minutes']),
        label: z.string(),
        href: z.string().url(),
      }),
    ),
  }),
});

const news = defineCollection({
  loader: file('src/content/news.json'),
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    category: z.string(),
    href: z.string().url(),
  }),
});

const parks = defineCollection({
  loader: file('src/content/parks.json'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    facts: z.array(z.string()),
    image: z.string(),
  }),
});

export const collections = { meetings, news, parks };
