# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences take priority when there is a trade-off (confirmed 2026-11-16):

- **Technical readers.** Engineers, students and ML practitioners who arrive for a specific blog article or interactive explainer, often from a search result or a shared link, and may never see the home page. Their job is to learn or look something up.
- **Hiring and industry.** Recruiters and companies assessing Pulasthi for machine-learning, research or engineering roles. Their job is to judge competence quickly from the work itself.

Academics (supervisors, collaborators) and design clients also visit, but were not chosen as the audiences that win a trade-off.

## Product Purpose

pulasthi.dev is the personal site of Pulasthi Ekanayake, a biomedical engineer who also designs. It publishes his writing and interactive explainers, and presents his research and design work.

Success is that people **read and return**: the articles and interactive pieces are the product. A visit succeeds when someone learns from a piece, shares it, or comes back for the next one. Presenting a profile and prompting contact are secondary to that.

## Positioning

One person's work across two disciplines that are usually shown separately: biomedical and machine-learning research on one side, UX and visual design on the other. The explainers are the place where the two meet, since they are research material built with a designer's care.

## Operating Context

- Readers often land directly on an article, so every article has to stand on its own without the home page for context.
- Interactive pieces are self-contained HTML pages (for example exported Claude artifacts) embedded at the top of an article, with a link to open them full screen.
- Articles range from research proposals and literature reviews with numbered references, to short practical notes with code blocks.
- The site is read on phones as well as desktops, in light and dark system themes.
- Content is authored as Markdown in the repository; there is no CMS.

## Capabilities and Constraints

Confirmed functionality:

- Blog at `/blog/`, with articles at `/blog/<year>/<slug>/`. These addresses match the previous Jekyll site and must keep working.
- **Interactive pieces are blog articles, never a separate section** (binding, confirmed 2026-11-16). A post with `interactive: <slug>` in its frontmatter embeds `public/interactive/<slug>/index.html`. The former `/lab/` addresses redirect to the blog.
- A cover image is generated for every post at build time; drafts (`draft: true`) are excluded from the published site.
- Researcher, Creative, About and Talks pages; RSS feed and sitemap.
- Creative projects link out to Behance; one project (Virtual Career Fair) has an on-site case study.

Technical constraints (current state, not declared binding):

- Static site built with Astro, deployed by a GitHub Action from `master` to the `gh-pages` branch, served by GitHub Pages at www.pulasthi.dev. No backend.
- Site copy, navigation, timeline, creative projects and talks live in `src/data/site.ts`.

Terminology: "Researcher" and "Creative" are the names of the two paths; "interactive" describes an article with an embedded piece.

Explicitly undecided or unverified:

- Whether the site must always present both the research and the design side. The current home page does, but this was not confirmed as a commitment.
- Whether generated artwork is a rule or just the current choice.
- Career dates and the PhD status wording on the Researcher and About pages were assembled from the design file and the previous site and have not been confirmed by Pulasthi.

## Brand Commitments

- Name: Pulasthi Ekanayake. Domain: pulasthi.dev. Contact address shown on the site: hello@pulasthi.dev.
- No further voice, identity or visual commitments have been made binding.

## Evidence on Hand

Real, usable material:

- Five published articles in `src/content/blog/` (osteoarthritis progression with multimodal deep learning, semantic decoding, explainable AI for cell-cell interactions, setting up a web server on EC2, Linux commands).
- One interactive piece, the ML Notation Atlas, at `public/interactive/ml-notation-atlas/`, published as an article.
- Research record: undergraduate thesis on a multimodal biosignal acquisition system for endothelial function (University of Moratuwa, supervised by Dr. Anjula De Silva); the Endo-MASS paper with a Best Paper Award at IEEE ICIIS 2023; industrial research at CSIRO Data61; ASMS 2024 presentations.
- Eight project cover images from Pulasthi's Behance profile in `src/assets/work/`, each linked to its Behance project.
- Four slide decks embedded on the Talks page from the `pulasthieka/presentations` repository.
- A portrait photo at `design/portrait/source.webp` (source only; the site serves a generated rendering of it).

Absences that future work must not fabricate:

- No CV file.
- No screenshots of the Virtual Career Fair platform; its case-study text and figures came from the design file and are unverified.
- No testimonials, client names, reader numbers or press.
- The Endo-MASS article in `src/content/blog/what-endo-mass-measures.md` is an unverified draft from the design file and must stay a draft until Pulasthi has checked it.
- The one-line descriptions of the Redesigns, Biomedical Innovations, Ceygiri Labs and Chemistry Magazine projects were written from their titles alone.

## Product Principles

1. **The article is the front door.** Most readers arrive on a single piece. It must load fast, read well and make sense with no other page.
2. **Reading comes first.** When a profile or portfolio need competes with the reading experience, the reading experience wins.
3. **Interactives are writing.** An interactive piece is published, dated, described and found the same way as any other article.
4. **Show the work, don't describe it.** Hiring visitors judge from real articles, real projects and real results; nothing is claimed that the site cannot show.
5. **Old links keep working.** Published addresses are permanent; anything that moves gets a redirect.
