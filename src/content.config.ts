import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const sourceSchema = z.object({
  csv: z.string().nullable(),
  html: z.string().nullable(),
});

const assetSchema = z.object({
  original: z.string(),
  resolved: z.string().nullable(),
  publicPath: z.string().nullable(),
  status: z.enum(['resolved', 'missing', 'external', 'empty']),
});

const baseCmsSchema = z.object({
  id: z.string(),
  slug: z.string(),
  collectionId: z.string().nullable(),
  itemId: z.string().nullable(),
  archived: z.boolean(),
  draft: z.boolean(),
  createdOn: z.string().nullable(),
  updatedOn: z.string().nullable(),
  publishedOn: z.string().nullable(),
  route: z.string(),
  source: sourceSchema,
  canonicalGroup: z.string().nullable(),
  validationStatus: z.enum(['valid', 'warning', 'missing-assets', 'missing-html']),
  validationNotes: z.array(z.string()),
});

const mediaFields = {
  mainImage: assetSchema,
  gallery: z.array(assetSchema),
  video: z.string().nullable(),
};

const directorio = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/directorio' }),
  schema: baseCmsSchema.extend({
    name: z.string(),
    address: z.string().nullable(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    link: z.string().nullable(),
    ...mediaFields,
  }),
});

const historias = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/historias' }),
  schema: baseCmsSchema.extend({
    title: z.string(),
    excerpt: z.string().nullable(),
    bodyHtml: z.string().nullable(),
    category: z.string().nullable(),
    instagram: z.string().nullable(),
    ...mediaFields,
  }),
});

const noticias = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/noticias' }),
  schema: baseCmsSchema.extend({
    title: z.string(),
    description: z.string().nullable(),
    bodyHtml: z.string().nullable(),
    category: z.string().nullable(),
    authors: z.string().nullable(),
    instagram: z.string().nullable(),
    link: z.string().nullable(),
    ...mediaFields,
  }),
});

const eventos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/eventos' }),
  schema: baseCmsSchema.extend({
    title: z.string(),
    startsAt: z.string().nullable(),
    endsAt: z.string().nullable(),
    location: z.string().nullable(),
    descriptionHtml: z.string().nullable(),
    rsvpLink: z.string().nullable(),
    ...mediaFields,
  }),
});

const patrimonio = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/patrimonio' }),
  schema: baseCmsSchema.extend({
    title: z.string(),
    bodyHtml: z.string().nullable(),
    category: z.string().nullable(),
    instagram: z.string().nullable(),
    ...mediaFields,
  }),
});

const categorias = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/categorias' }),
  schema: baseCmsSchema.extend({
    name: z.string(),
    color: z.string().nullable(),
    bannerImage: assetSchema,
  }),
});

export const collections = {
  directorio,
  historias,
  noticias,
  eventos,
  patrimonio,
  categorias,
};
