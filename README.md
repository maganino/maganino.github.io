# Nino — Personal Portfolio Website

A portfolio website for **Mina Mounir (Nino)** — PhD, Innovation Adventurer, Product Strategist, Science Communicator. Built with Astro, Tailwind CSS, GSAP, and Lenis.

---

## Project Structure

```
/
├── public/                         # Static assets (served as-is)
│   ├── favicon.svg
│   ├── images/
│   │   ├── photo.jpg               # Profile photo
│   │   └── drawings/               # Hand-drawn artwork
│   │       ├── *.png               # Original drawings
│   │       ├── transparent/        # Dark-mode versions (transparent bg)
│   │       └── inverted/           # Light-mode versions (inverted colors)
│
├── src/
│   ├── Components/
│   │   └── Navigation.astro        # Fixed navbar with scroll sync + dropdown
│   │
│   ├── content/                    # Astro Content Collections (Markdown)
│   │   ├── config.ts               # Schema definitions for all collections
│   │   ├── blog/                   # Blog posts (.md files)
│   │   ├── projects/               # Project entries (.md files)
│   │   └── publications/           # Publication entries (.md files)
│   │
│   ├── layouts/
│   │   └── Layout.astro            # Main HTML layout (head, nav, scripts)
│   │
│   ├── pages/
│   │   ├── index.astro             # Homepage (all sections)
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog listing page
│   │   │   └── [slug].astro        # Individual blog post page
│   │   ├── projects/
│   │   │   ├── index.astro         # Projects listing page
│   │   │   └── [slug].astro        # Individual project page
│   │   └── publications/
│   │       └── index.astro         # Publications listing with filtering
│   │
│   └── styles/
│       └── global.css              # All custom CSS (theme, nav, dividers, etc.)
│
├── scripts/
│   └── process-images.mjs          # Script to generate inverted/transparent drawings
│
├── astro.config.mjs                # Astro configuration
├── tailwind.config.mjs             # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies and scripts
```

---

## File Roles & What You Can Edit

### Content (Markdown files)

| File / Folder | What it controls | What to edit |
|---|---|---|
| `src/content/blog/*.md` | Blog posts | Add new `.md` files with frontmatter: `title`, `description`, `pubDate`, `tags`, `heroImage` |
| `src/content/publications/*.md` | Publications list | Add new `.md` files with: `title`, `authors`, `venue`, `year`, `type`, `doi`, `tags`, `featured` |
| `src/content/projects/*.md` | Project entries | Add new `.md` files with: `title`, `description`, `category`, `tags`, `startDate`, `client`, `featured` |
| `src/content/config.ts` | **Schema** for all collections | Edit to add/remove fields from blog, publications, or projects |

### Pages (Layout & Structure)

| File | What it controls | What to edit |
|---|---|---|
| `src/pages/index.astro` | **Homepage** — all sections (Hero, i-DIA, About, Work, Blog, Contact) | Section content, order, drawings, experience highlights, biosketch |
| `src/pages/blog/index.astro` | Blog listing page | Layout, filtering, card design |
| `src/pages/blog/[slug].astro` | Individual blog post template | Post layout, reading time, related posts |
| `src/pages/projects/index.astro` | Projects listing page | Layout, category filters |
| `src/pages/projects/[slug].astro` | Individual project template | Project detail layout |
| `src/pages/publications/index.astro` | Publications listing with type filters | Layout, filter UI, card design |

### Styling & Theme

| File | What it controls | What to edit |
|---|---|---|
| `src/styles/global.css` | **All custom CSS** — colors, fonts, nav, toggle, dividers, animations | Theme colors (`--bg`, `--text`, `--accent-primary`, etc.), font choices, animation timing |
| `tailwind.config.mjs` | Tailwind CSS configuration | Custom breakpoints, extend theme |

### Components

| File | What it controls | What to edit |
|---|---|---|
| `src/Components/Navigation.astro` | **Navbar** — logo, nav links, social icons, theme toggle, mobile menu, scroll sync | Nav items, dropdown menus, social links, smooth scroll behavior |
| `src/layouts/Layout.astro` | **HTML wrapper** — head meta, Lenis smooth scroll, GSAP setup, theme toggle | Page title, meta description, scroll settings, theme persistence |

### Drawings

| Folder | Purpose |
|---|---|
| `public/images/drawings/` | Original hand-drawn artwork (PNG) |
| `public/images/drawings/transparent/` | **Dark mode** versions — used with `.only-dark` class |
| `public/images/drawings/inverted/` | **Light mode** versions — used with `.only-light` class |
| `scripts/process-images.mjs` | Run this script to regenerate transparent/inverted versions from originals |

---

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

---

## Adding Content

### New Blog Post
Create `src/content/blog/my-new-post.md`:
```md
---
title: "My New Post"
description: "A short description"
pubDate: 2025-01-15
tags: ["innovation", "dialogue"]
heroImage: "/images/blog/my-post.jpg"  # optional
draft: false
---

Your markdown content here...
```

### New Publication
Create `src/content/publications/my-paper-2025.md`:
```md
---
title: "Paper Title"
authors: ["M. Mounir", "Co-Author"]
venue: "Journal or Conference Name"
year: 2025
type: "journal"  # journal | conference | book-chapter | thesis | other
doi: "10.xxxx/xxxxx"  # optional
tags: ["audio-processing", "machine-learning"]
featured: true  # shows on homepage R&D card
---
```

### New Project
Create `src/content/projects/my-project.md`:
```md
---
title: "Project Name"
description: "What it does"
category: "product"  # product | research | facilitation | volunteering
tags: ["design-thinking", "AI"]
startDate: 2024-01-01
client: "Company Name"  # optional
featured: true
order: 1
---

Detailed project description...
```

---

## Theme System

The site supports **dark mode** (default) and **light mode** (warm sepia). Colors are defined as CSS variables in `src/styles/global.css`:

- Dark: `--bg: #0a0f1a`, `--surface: #111827`, `--text: #f8fafc`
- Light: `--bg: #f5f0e6`, `--surface: #ebe4d6`, `--text: #3d3529`

Drawings have two versions (`.only-dark` / `.only-light`) that swap automatically with the theme toggle.
