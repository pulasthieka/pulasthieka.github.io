# pulasthi.dev

Personal site of Pulasthi Ekanayake, built with [Astro](https://astro.build).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Pushing to `master` builds the site and publishes it to the `gh-pages` branch
(see `.github/workflows/deploy.yml`), which GitHub Pages serves at
www.pulasthi.dev.

## Where things live

| What | Where |
| --- | --- |
| Site copy, nav, highlights, timeline, creative work, talks | `src/data/site.ts` |
| Blog posts (Markdown) | `src/content/blog/` |
| Interactive pieces (self-contained HTML) | `public/interactive/<slug>/index.html` |
| Colours, type, layout | `src/styles/global.css` |
| Pages | `src/pages/` |

### Add a blog post

Create `src/content/blog/my-post.md`:

```md
---
title: "My post"
date: 2026-11-16
description: "One line shown on cards and under the title."
tags: [AI, biomedical]
category: research
draft: false
---
```

It is published at `/blog/<year>/my-post/`. Posts with `draft: true` only show
up in `npm run dev`.

### Add an interactive piece

1. Save the page (for example an exported Claude artifact) as
   `public/interactive/<slug>/index.html`. It should be self-contained.


2. Add `interactive: <slug>` to the frontmatter of a blog post. The page is
   embedded at the top of that article, with a full-screen link.

The previous Jekyll site is kept on the `jekyll-archive` branch.
