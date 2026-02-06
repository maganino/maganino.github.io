/**
 * CONTENT COLLECTIONS CONFIG
 * 
 * This file defines the schema for:
 * - Blog posts
 * - Projects
 * - Publications
 * 
 * Add new .md files to the respective folders and they'll be automatically picked up.
 */

import { defineCollection, z } from 'astro:content'

// ============================================
// BLOG COLLECTION
// Location: src/content/blog/*.md
// ============================================
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

// ============================================
// PROJECTS COLLECTION
// Location: src/content/projects/*.md
// ============================================
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    category: z.enum(['product', 'research', 'facilitation', 'volunteering']),
    tags: z.array(z.string()).default([]),
    startDate: z.date(),
    endDate: z.date().optional(),
    client: z.string().optional(),
    link: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
})

// ============================================
// PUBLICATIONS COLLECTION
// Location: src/content/publications/*.md
// ============================================
const publicationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(), // Journal, Conference, Book
    year: z.number(),
    type: z.enum(['journal', 'conference', 'book-chapter', 'thesis', 'other']),
    doi: z.string().optional(),
    pdf: z.string().optional(),
    abstract: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
})

export const collections = {
  'blog': blogCollection,
  'projects': projectsCollection,
  'publications': publicationsCollection,
}