# Research achievement cards and homepage editorial update

> **For agentic workers:** Use superpowers:executing-plans. The user requests direct implementation; prior authorization covers commit, push and deployment.

**Goal:** Replace project-card quantity tiles with concise achievements and core contributions, and align the bilingual homepage with the approved Scientific Data Infrastructure positioning and research architecture.

**Content authority:** Root project Markdown and JSON, plus the user's explicit AutoResearchClaw update to 15K GitHub stars. Use the October 2026 snapshot date. Preserve quantitative experiment records on detail pages, contributor relationships, research ordering and complete descriptions except the authorized star update. Keep the unfinished loop project hidden.

**Cards:** Render `projects[].highlights` directly as a short unheaded list. Order the most important achievement first. PHYBench: NeurIPS acceptance, Stanford AI Index inclusion, Hugging Face trending rank and alphaXiv readership. Other projects: only supplied publication, execution, architecture and evaluation contributions. No invented acceptance or external recognition. Remove the numeric overview columns and AutoResearchClaw's now-unneeded numerical-scope note. Update the source's card-display instructions and distinguish detail-only research data.

**Homepage:** Preserve the exact bilingual brand mission and navigation/research-track order. Describe scientific intelligence through hypotheses, computation, verification and revision; explain the roles of agents, theory and evaluation; connect the approved data-infrastructure entry and the research team to this program. Collective team impact figures remain collective.

**Editorial references:** Read Isomorphic Labs, Sakana AI and Ai2 homepages for the relationship between a mission, an actual research program and selected achievements. Borrow no claims, results, branding or prose. The new copy is grounded in the user's own research sources.

- [x] Rewrite the source highlights and render them on shared project cards.
- [x] Rewrite the relevant homepage copy in both languages; verify content, responsive rendering and interactions.
- [x] Review, commit, push, deploy and verify the public homepage and research page.

## Verification

- Lint/build and all 7 content contracts passed; the full 25-test browser suite passed. Five responsive/research-accessibility tests passed after final wording and heading layout refinements.
- Generated homepage and research cards match every source highlight and contain no metric strips, numerical-scope footnotes or visible Highlights label.
- Source integrity comparison confirmed full descriptions and experimental metrics unchanged except the user-authorized AutoResearchClaw star update; attribution, links, ordering and scientific figures remain unchanged.
- Desktop/mobile cards and bilingual homepage previews inspected. Independent review found no required fixes.

## Published verification

- Implementation `58826c2` passed GitHub Actions build and deployment: https://github.com/LightRayAI/website/actions/runs/40779774962
- Both live language homepages and research pages returned HTTP 200, render 3–4 source-backed bullets per card without metric strips, and show the authorized AutoResearchClaw 15K snapshot.
- PHYBench includes all four requested recognitions, and the overview teaser no longer leads with the 500-problem count.
- Homepage narrative and brand mission verified; live compound filtering and language-query transfer passed.
- This final documentation record does not change the deployed artifact.
