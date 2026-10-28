# Scientific data and team editorial update

> **For agentic workers:** Use superpowers:executing-plans. The user requested direct changes and has already authorized commit, push, and deployment in this session.

**Goal:** Reframe the bilingual data page around four research-specific offerings, brief source-grounded examples, and expert supervision throughout production; add the supplied team-level competition achievements.

**Architecture:** Keep the existing static renderer, routes, navigation, visual system, contact dialog, delivery evidence, and project JSON. Move the revised bilingual data copy into `src/data-business.mjs`, consumed by the shared localization object. Render concise examples directly inside the four offering cards.

**Tech stack:** Existing Node static build, HTML/CSS, Node content tests, Playwright/axe.

**Spec:** User's October 28 instruction; read-only local examples; reference website for content organization only.

## Decisions and constraints

- Four offerings, in order: Frontier Scientific Reasoning; Agentic Science RL Environments; Scientist–AI Research Trajectories; RSI Research Challenges.
- Lead with frontier scientific expertise, capability mapping, genuinely dependent long-horizon tasks, expert involvement from topic choice to verifier review, self-contained scientific context, and reproducible feedback.
- Each example has a brief problem statement and concise output/verification explanation. Do not publish complete private tasks, reference answers, grading constants, internal execution traces, or source filesystem paths in the website.
- CritPt example: eight-Majorana quartic Hamiltonian, fixed coupling norm, maximal gap and sparsest saturating construction. Source: `Auto-category1/critpt/sft-majorana-gap/final/problem.json` and its expert/checkpoint records.
- Agentic example: self-consistent disk mean-field/collective-fluctuation feedback. Source: `Auto-category1/agentic/oct-anotherbatch/hard/astro_live_meanfield_feedback_2026/instruction.md` and task README. Present the scientific problem and observable-specific scoring; no model score or unqualified difficulty ranking.
- Trajectory example stays visibly empty and marked “Example forthcoming / 示例待补充”; no invented transcript or sample-download control.
- RSI example: a multi-round optimization design grounded in the existing `PhysX-Eval/tasks/white-1993-dmrg/` task, comparing energy/gap/observable correctness and computational cost. The source supports a working finite-DMRG solver, figure reproduction, independent exact-diagonalization checks and development optimizations. It does not establish a completed RSI rollout or SOTA improvement; describe SOTA comparison as an optimization objective, not an achieved result. Keep that distinction in the public example label.
- Team-level IPhO gold medal and fourth place in the national high-school physics competition come from the user's statement; do not attribute either to an individual or invent dates. Retain only Shi Qiu, Bo Wang and Chief Scientist HuaXing Zhu profiles.
- Preserve existing client/delivery evidence, contact behavior and institutional information from the latest remote version.

## Reference and design

Read https://ancest-data.duckdns.org/ and the four linked data pages via a direct public HTTP request after the browser tool could not load them. Borrow only the content hierarchy: data unit, concise task, delivery and evaluation. Do not copy prose, examples, customer claims, model rankings, styling, or assets.

Keep pale surfaces, navy/blue typography, two-column offering cards, and compact inset examples. Add a short expert/capability section near the top and update the existing five-stage production pipeline. All new content is bilingual and statically readable.

## Tasks

- [x] 1. Add output contracts for four bilingual offerings, three grounded examples and one empty trajectory placeholder; implement editorial copy and team-wide achievement wording.
- [x] 2. Integrate examples and top-of-page strengths into existing components/styles; inspect desktop/mobile previews, run lint/build/content/browser checks, and review source consistency.
- [x] 3. Commit, push, await Pages deployment, and verify the live bilingual data and team pages.

## Review focus

- All four families remain distinct; reasoning is not collapsed into execution or RSI.
- No implied SOTA result, named medal recipient, invented interaction transcript, or source-repository export.
- Existing contact dialog, mobile navigation, logos, delivery figures and research routes remain functional.
- English and Chinese give the same promises and distinguish examples from demonstrated results.
- Four cards stay readable on narrow screens; the intentional empty example is understandable.

## Validation

- `npm run check`: lint clean, 22 pages built, all 7 content contracts passed.
- `npm run test:e2e`: all 22 browser tests passed, including bilingual mobile/desktop layouts, accessibility, contact dialogs, and deployment-refresh behavior.
- Desktop full-page and example-card previews inspected; mobile previews saved under ignored `.preview/`.
- Independent read-only review found no required changes.

## Published result

- Implementation commit: `62286f4`.
- GitHub Actions build and deployment passed: https://github.com/LightRayAI/website/actions/runs/40740628763
- Public English and Chinese data pages verified: exactly four offerings, three scientific examples, one reserved trajectory example, capability-map copy, and DMRG SOTA wording.
- Public English and Chinese team pages verified: collective IPhO and national fourth-place wording; three existing profiles retained without assigning the awards to individuals.
- Final documentation-only commit does not change the deployed site.
