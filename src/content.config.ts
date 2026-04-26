import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/works' }),
  schema: z.object({
    title: z.object({
      de: z.string(),
      en: z.string(),
    }),
    description: z.object({
      de: z.string(),
      en: z.string(),
    }),
    category: z.enum(['brunnen', 'denkmal', 'kunstwerk']),
    model: z.object({
      glb: z.string().optional(),
      usdz: z.string().optional(),
    }),
    photos: z.array(z.string()).default([]),
    poster: z.string().optional(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
      address: z.string().optional(),
      myMapsEmbedUrl: z.string().optional(),
    }),
    city: z.string().optional(),
    country: z.string().optional(),
    artist: z.string().optional(),
    modelCreator: z.string().optional(),
    year: z.string().optional(),
    material: z.object({
      de: z.string(),
      en: z.string(),
    }).optional(),
    downloadAllowed: z.boolean().default(false),
  }),
});

export const collections = { works };
