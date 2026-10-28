# LightRay AI

A bilingual research-team website, built as static HTML for GitHub Pages.

**Site:** https://lightrayai.github.io/website/

**English:** `/website/en/` · **中文:** `/website/zh/`

## Local development

Requires Node.js 22 or later (CI uses Node.js 24).

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173/website/`. The development server rebuilds when source content or assets change; refresh the browser to view changes.

```sh
npm run check                 # ESLint, production build, content/link tests
npx playwright install chromium
npm run test:e2e              # Navigation, filtering, mobile, no-JS, accessibility
npm run preview              # Serve the current production build
```

## Content and structure

- `team_projects_zh_en.json`: authoritative bilingual project data, read directly at build time. Keep this and `research_projects_bilingual.md` as supplied source documents.
- `src/content.mjs`: shared bilingual editorial copy, team profiles, source-derived workflow labels, and figure credits.
- `src/data-business.mjs`: the four bilingual scientific-data offerings, concise task examples, production principles, and delivery workflow. The research-trajectory example is intentionally reserved; the DMRG example describes a multi-round optimization design and SOTA comparison objective, not a claimed performance result.
- `src/model.mjs`: source loading, publication eligibility, ordering, URLs, and HTML escaping.
- `src/components.mjs`: navigation, footer, cards, metrics, and shared sections.
- `src/pages.mjs`: the four primary pages and project details.
- `src/styles.css`, `src/client.js`: responsive design and progressive interactions.
- `public/images/`: locally served authentic assets; see `docs/asset-sources.md`.
- `scripts/build.mjs`: produces `dist/` with 22 HTML pages, sitemap, robots file, and `.nojekyll`.

Projects are ordered by research track, then their supplied `order`. A project is published only when its full description is present in both languages. All seven source entries are preserved; the unfinished loop-diagram entry is intentionally not published. Team-led and Core contribution remain separate, visible relationships.

The user's October 2026 instruction supplies the newer mission, navigation order, team-wide impact figures, and data-business brief. These take precedence over older layout suggestions in the source documents. Shi Qiu's profile and portrait reference https://stephenqsstarthomas.github.io/. Team-wide metrics are not individual accomplishments. Project statistics keep their original reporting scope and dates.

All pages are rendered in both languages. The language switch retains the corresponding page, and research filters retain their query parameters. JavaScript enhances navigation and filtering; reading, links, and language switching also work without it. The root defaults to English and respects a previously selected Chinese preference when browser storage is available.

## Deployment

The workflow in `.github/workflows/pages.yml` installs dependencies, runs all checks and browser tests, uploads `dist/`, and deploys successful main-branch builds through GitHub Pages. Pull requests run verification without deployment. No personal token is stored in the repository; the workflow uses GitHub's short-lived `GITHUB_TOKEN`.

The repository is public with the owner's explicit approval, and **Settings → Pages → GitHub Actions** is configured as the publishing source. The Free organization plan requires public repositories for Pages. If the repository becomes private in the future, this workflow will verify and upload the artifact but skip deployment. Main-branch pushes and manual workflow dispatches publish after successful verification.

The deployment base defaults to `/website`. For another path, set `BASE_PATH` for both build and preview and update canonical origin/URL settings in `src/model.mjs`. Content tests target the intended `/website/` production deployment. Run live browser tests using `SITE_URL=https://lightrayai.github.io npm run test:e2e`.

## Checks

Content contracts verify every full localized project description, highlight, metric, attribution, and source URL; research ordering and hidden incomplete entries; all generated local links/assets; and authentic publication figures with direct paper links on the team page. Browser tests cover deep reloads, language persistence, combined filters and empty states, keyboard/mobile navigation, screens from 320 to 1440 pixels, image loading, no-JavaScript reading, 404 recovery, and axe WCAG A/AA checks.

The website has no runtime dependencies, analytics, forms, or backend. Collaboration links use Shi Qiu's published contact email. Asset and research ownership remain with their respective authors.
