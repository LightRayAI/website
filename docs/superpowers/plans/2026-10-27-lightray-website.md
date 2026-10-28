# LightRay bilingual research website implementation plan

> **For agentic workers:** Use superpowers:executing-plans for inline execution. The user explicitly requested implementation in the current codebase, commit, push, and GitHub Pages deployment.

**Goal:** Publish a complete, clear bilingual research team website at https://lightrayai.github.io/website/.

**Architecture:** Generate static HTML for both languages and every project from the supplied JSON, with shared CSS and progressive JavaScript for filtering and navigation. No runtime dependencies, backend, or client-side routing requirement.

**Tech Stack:** Node.js build scripts, semantic HTML, CSS, vanilla JavaScript; ESLint, Node tests, Playwright, axe.

**Spec:** The user's detailed instruction and the unchanged root Markdown/JSON files. User's newer mission and navigation order supersede older layout suggestions in the sources.

## Global constraints

- Home → Data Business → Scientific Research → Team.
- AI for Science → Physics of AI → AI Evaluation, always in that order.
- Preserve seven JSON entries, publish only the six with complete bilingual content; hide loop_diagrams.
- ColliderAgent: 10 reproduced papers. AutoResearchClaw: original 25-topic performance result distinct from later 55-topic release.
- Preserve Team-led / Core contribution and all full descriptions, highlights, metrics, publication and source links.
- Team-wide 50,000+ stars and 30+ journal papers are collective figures; date the star snapshot October 2026.
- No invented members, titles, affiliations, clients, prices, partnerships or delivery figures.
- Git credentials remain outside the repository and output. GitHub Pages source must be public on the organization's Free plan; obtain explicit visibility approval once the website is concrete and reviewable.

## Design decisions

Use white and pale neutral backgrounds, dark navy typography, restrained blue accents, generous spacing and fine borders. A typography-led home introduces the mission, collective impact, core capabilities and two primary destinations. Independent data, research and team pages hold substantive content. Project cards lead to complete static detail pages with source-grounded diagrams and attributed paper figures where available. Use the actual Shi Qiu portrait and verified academic profile; other documented contributors receive concise factual profiles without invented biographies.

A client-only SPA would need routing workarounds and hide content without JavaScript. A full server framework is unnecessary for static editorial content. A small static renderer is the selected implementation decision.

## Review focus

- Language switching preserves page/project context and works without JavaScript.
- Compound filters include empty results, reset, query restoration and correct counts.
- Deep routes and assets work under /website/, including direct reloads and 404 recovery.
- Narrow screens, keyboard navigation, contrast and reduced motion remain usable.
- Full bilingual source content survives rendering and no unfinished project leaks into output.

## Tasks

- [x] 1. Content and build foundation: write content/output contract tests; implement src/model.mjs, shared localization, build and preview scripts; preserve source documents.
- [x] 2. Complete pages: implement home, data delivery pipeline, grouped/filterable research, six detail pages, team, shared navigation/footer, responsive CSS and progressive interactions. Fetch and attribute real assets.
- [x] 3. Verify: run lint/build/content contracts and browser flows at desktop/mobile sizes; inspect screenshots and accessibility checks; fix observed issues.
- [ ] 4. Deliver: document maintenance, configure GitHub Pages CI, commit and push; resolve repository visibility with the user, deploy and verify the live site and deep links.

## Verification record

- `npm run check`: ESLint clean; 22 static pages built; 4 content/link contracts passed.
- `npm run test:e2e`: 16 browser tests passed, including 9 axe scans, two-language responsive checks at 320/390/1440px, filters, navigation, static reading, and 404 recovery.
- Screenshots inspected for desktop home/team and mobile home.
- Source documents preserved; credentials never copied into tracked files or output.
- Independent read-only review completed without required fixes; additional breakpoint/no-JavaScript probes passed.
- User explicitly approved converting the repository from private to public and deploying. Repository visibility updated and GitHub Pages configured for Actions.
- Follow-up implemented: all six projects have original scientific figures; Shi Qiu's four representative publications have attributed thumbnails and direct Paper / GitHub / Project links. Full-image links preserve the original assets.
- Updated verification: 5 content contracts and 16 browser tests passed; desktop/mobile image previews captured under ignored `.preview/`.
