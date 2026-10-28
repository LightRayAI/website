# Interactive scientific task examples

> **For agentic workers:** Use superpowers:executing-plans. The user requested direct revisions; existing authorization covers commit, push and deployment.

**Goal:** Show substantive scientific task excerpts in interactive bilingual example cards, while shortening the data page.

**Architecture:** Keep the four offering cards and existing design. Each example has server-rendered English/Chinese panels, its own language toggle, and a native disclosure for concise intermediate evidence, acceptance criteria and delivery contents. Use build-time KaTeX with self-hosted CSS/fonts for readable, accessible scientific notation; no client math dependency.

**Spec:** Latest user instruction and source tasks already read in the prior editorial update.

## Scope and decisions

- Add explicit physical settings, one compact equation block, and a meaningful scientific question to each of the three populated examples. Source the Majorana problem, self-consistent disk and DMRG setting directly from the previously selected local task files.
- Label excerpts as excerpts; do not represent abridged scientific context as a complete runnable task. Do not expose reference answers or claim a completed SOTA gain. The DMRG example remains an RSI optimization design grounded in the existing reproduction task.
- Chinese example cards show `（翻译）` at the upper left. Each card can independently show its English original and switch back. Changing a card must not change the page language, sibling cards, route or global preference.
- Native disclosures expose brief acceptance, key intermediate evidence and delivery details. Preserve the open state when switching the card language. Keep the trajectory example empty, with only its translated placeholder and language control.
- Without JavaScript, show the page's selected language, readable equations and functioning native disclosures; hide inactive language controls. Global language navigation remains available.
- Remove the separate production workflow and delivery sections. Fold expert selection/supervision/independent verification/verifier review into the opening principles and task-specific deliverables into each disclosure.
- Preserve team, research, partnerships, delivery statistics, contact dialog, and deployment-refresh behavior.

## Steps

- [x] 1. Add failing browser coverage for independent language changes, disclosure state, keyboard/mobile behavior and no-JavaScript reading.
- [x] 2. Expand the grounded task copy; render equations, language panels and disclosures; add small client-side language controls and responsive styles; remove redundant bottom sections.
- [x] 3. Run lint/build/content/browser checks, inspect screenshots, request focused review, then commit/push/deploy and verify the live cards.

## Review focus

Mixed-language cards need correct `lang` and accessibility labels; disclosures must retain state across language changes; no duplicate IDs or hidden-language focus targets; equations must not break narrow layouts; a reserved trace card must stay blank.

## Verification record

- New interactive tests first failed on the missing language controls/panels and disclosures, then passed after implementation.
- `npm run check`: lint clean, 22 pages generated, all 7 content contracts passed.
- `npm run test:e2e`: all 25 browser tests passed after the final fix, including mixed-language mobile accessibility and no-JavaScript disclosures.
- Desktop and mobile screenshots inspected; formula fonts loaded with no failed asset requests. Removed workflow/delivery sections are absent.
- Independent review identified a mismatch between the language controls' visible labels, accessible names and `lang`. Fixed with separately language-tagged visible text and page-language screen-reader descriptions; regression assertions verified both initial and switched states.
- Generated ID/ARIA-reference checks passed in both languages.

## Published verification

- Published code: `0558903`. Build and Pages deployment succeeded: https://github.com/LightRayAI/website/actions/runs/40744219708
- All three new browser tests passed against the public site: independent card language/disclosure state, mobile keyboard/accessibility, and static reading without JavaScript.
- Both live data pages have four cards, eight language panels, three scientific equation blocks per language, and native acceptance/delivery disclosures. The standalone workflow and delivery sections are absent.
- Published KaTeX CSS and font files returned HTTP 200. This final record does not alter the deployed artifact.
